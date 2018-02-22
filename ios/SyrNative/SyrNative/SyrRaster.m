//
//  MouseRaster.m
//  MouseNative
//
//  Created by Anderson,Derek on 7/8/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//
#import <objc/runtime.h>
#import "SyrRaster.h"
#import "SyrAnimator.h"
#import "SyrEventHandler.h"

#import <UIKit/UIKit.h>

@interface SyrRaster()

@property UIView* rootView;
@property NSMutableDictionary* components;
@property NSMutableDictionary* animations;
@end

@implementation SyrRaster

+ (id) sharedInstance {
  static SyrRaster *instance = nil;
  @synchronized(self) {
    if (instance == nil) {
      instance = [[self alloc] init];
    }
  }
  return instance;
}

- (id) init
{
  self = [super init];
  if (self!=nil) {
    _components = [[NSMutableDictionary alloc] init];
    _animations = [[NSMutableDictionary alloc] init];
    _nativemodules = [[NSMutableDictionary alloc] init];
    _registeredClasses = [[NSMutableDictionary alloc] init];;
  }
  return self;
}

/**
 Parse as AST tree, being given a root view to render that tree to
 */
-(void) parseAST: (NSDictionary*) astString withRootView: (SyrRootView*) rootView {

  NSError *jsonError;
  NSData *objectData = [[astString valueForKey:@"ast"] dataUsingEncoding:NSUTF8StringEncoding];
  NSDictionary *astDict = [NSJSONSerialization JSONObjectWithData:objectData
                                                       options:NSJSONReadingMutableContainers
                                                         error:&jsonError];
  
  // javascript is letting us know we have an update
  // to ui, so lets update it
  if([astDict objectForKey:@"update"]) {
    [self update: astDict];
  } else {
    // otherwise lets build it
    _rootView = rootView;
    [self build: astDict];
  }
}

-(void) update: (NSDictionary*) astDict {
 	// todo - reimpliment state update with animations in mind
  [self syncState:astDict withViewParent:nil];
}

-(void) syncState: (NSDictionary*) component withViewParent: (UIView*) viewParent {
  NSString* uuid = [[component objectForKey:@"instance"] valueForKey:@"uuid"];
  NSObject* componentInstance = [_components objectForKey:uuid];
  NSString* className = [_registeredClasses valueForKey:[component valueForKey:@"elementName"]];
  NSObject* class = NSClassFromString(className);
  
  BOOL unmount = [component valueForKey:@"unmount"];
  if(unmount == YES) {
    // if the component is flagged for unmounting remove
    if(componentInstance != nil) {
      UIView* instance = (UIView*) componentInstance;
      [_components removeObjectForKey:uuid];
      [instance removeFromSuperview];
      [_bridge rasterRemovedComponent:uuid];
    } else {
    
      NSArray* children = [component objectForKey:@"children"];
      if(children != [NSNull null]) {
        for(id child in children) {
            NSString* childuuid = [[child objectForKey:@"instance"] valueForKey:@"uuid"];
            UIView* childInstance = [_components objectForKey:childuuid];
          	BOOL unmountChildInstance = [component valueForKey:@"unmount"];
            if(unmountChildInstance == YES) {
              [_components removeObjectForKey:childuuid];
              [childInstance removeFromSuperview];
              [_bridge rasterRemovedComponent:uuid];
            }
        }
      }
    }
    NSLog(@"unmount");
  } else {
  		// attempt to update instance
      if(componentInstance != nil && class != nil) {
          // we have an instance and a class, lets update this component
          viewParent = componentInstance;
          SEL selector = NSSelectorFromString(@"render:withInstance:");
          if ([class respondsToSelector:selector]) {
            // invoke render method, pass component
            NSInvocation *inv = [NSInvocation invocationWithMethodSignature:[class methodSignatureForSelector:selector]];
            [inv setSelector:selector];
            [inv setTarget:class];

            [inv setArgument:&(component) atIndex:2]; //arguments 0 and 1 are self and _cmd respectively, automatically set by NSInvocation
            [inv setArgument:&(componentInstance) atIndex:3];
            [inv invoke];
          }
      } else if(componentInstance == nil && class != nil) {
        // we don't have an instance, but a class exists
        // lets create this instance
        UIView* newComponent = [self createComponent:component];
        [_components setObject:newComponent forKey:[[component valueForKey:@"instance"] valueForKey:@"uuid"]];
      
        // todo: move this out of the raster cause it's also duplicated, and ewwwwww clean this class up Derek shame on me.
        SEL selector = NSSelectorFromString(@"addArrangedSubview:");
        if ([viewParent respondsToSelector:selector]) {
          // work around for stackview right now needs to be moved somewhere else
          UIStackView* stackView = (UIStackView*) viewParent;
          UIView* componentView = (UIView*)newComponent;
          UIView* containerview = [[UIView alloc] init];
          containerview.frame = componentView.frame;
          [containerview addSubview:componentView];
          [stackView addArrangedSubview:containerview];
        } else {
          [viewParent addSubview:(UIView*)newComponent];
        }
        [_bridge rasterRenderedComponent:[[component valueForKey:@"instance"] valueForKey:@"uuid"]];
        viewParent = newComponent;
        NSLog(@"create a new component %@", className);
      }
    
      NSArray* children = [component objectForKey:@"children"];
      if(children != [NSNull null]) {
        for(id child in children) {
          [self syncState:child withViewParent:viewParent];
        }
      }
  }
}

// build the component tree
-(void) build: (NSDictionary*) astDict {
  UIView* component = (UIView*)[self createComponent:astDict];
  if(component != nil) {
    NSLog(@"building %@", [astDict valueForKey:@"elementName"]);
    [self buildChildren:astDict withViewParent:component];
    [_rootView addSubview:component];
    [_components setObject:component forKey:[[astDict valueForKey:@"instance"] valueForKey:@"uuid"]];
    [_bridge rasterRenderedComponent:[[astDict valueForKey:@"instance"] valueForKey:@"uuid"]];
  } else {
    NSArray* childComponents = [astDict objectForKey:@"children"];
    NSDictionary* childComponent = [childComponents objectAtIndex:0];
    [self build:childComponent];
    [_bridge rasterRenderedComponent:[astDict valueForKey:@"uuid"]];
  }
  
}

// build children in the tree
-(void) buildChildren:(NSDictionary*) component withViewParent: (UIView*) view  {
  bool recalculateLayout = false;
  if([component isKindOfClass:[NSDictionary class]]) {
    NSArray* children = [component objectForKey:@"children"];
    
    for(id child in children) {
      
      if(child != [NSNull null]) {
      
      NSLog(@"building %@", [child valueForKey:@"elementName"]);
      NSObject* nsComponent = [self createComponent:child];
      NSArray* subchildren = [child objectForKey:@"children"];
        
      id attributes = [child objectForKey:@"attributes"];
      if(attributes != nil) {
      		id style = [attributes objectForKey:@"style"];
          if(style != nil) {
          	NSString* height = [style valueForKey:@"height"];
            if([height isKindOfClass:[NSString class]]) {
              if(height != nil && [height containsString:@"auto"]) {
                recalculateLayout = true;
              }
          	}
        }
    	}
      
      // component is not of type available
      // should do a strict check if it is derived from component
      if(nsComponent != nil) {

        if(subchildren != nil && [subchildren count] > 0){
          [self buildChildren:child withViewParent:(UIView*)nsComponent];
        }
        
        [_components setObject:nsComponent forKey:[[child valueForKey:@"instance"] valueForKey:@"uuid"]];
        [_bridge rasterRenderedComponent:[[child valueForKey:@"instance"] valueForKey:@"uuid"]];
        
        // todo: move this out of the raster
        SEL selector = NSSelectorFromString(@"addArrangedSubview:");
        if ([view respondsToSelector:selector]) {
          // work around for stackview right now needs to be moved somewhere else
          UIStackView* stackView = (UIStackView*) view;
          UIView* componentView = (UIView*)nsComponent;
          UIView* containerview = [[UIView alloc] init];
          containerview.frame = componentView.frame;
          [containerview addSubview:componentView];
          [stackView addArrangedSubview:containerview];
        } else {
          [view addSubview:(UIView*)nsComponent];
        }
        
      } else {
        
        // notify it was 'mounted'
        
        [_bridge rasterRenderedComponent:[[child valueForKey:@"instance"] valueForKey:@"uuid"]];
        // render it's children to it's own parent
        if(subchildren != nil) {
          if(subchildren.count > 0){
            [self buildChildren:child withViewParent:view];
          }
        }
      }
    }
    }
    
    if(recalculateLayout) {
      [self syncState:component withViewParent:nil];
    }
  }
}

/**
 creates a component based on the JSX element name.
 todo: make this more react-nativeique
 */
-(NSObject*) createComponent: (NSDictionary*) component {
  // infer the class name from the element tag the raster is sending us
  NSString* className = [_registeredClasses valueForKey:[component valueForKey:@"elementName"]];
  
  // get instance of the class
  Class class = NSClassFromString(className);
  
  // populate return
  NSObject* __unsafe_unretained returnComponent;
  
  if(class != nil) {
    // get render method
    SEL selector = NSSelectorFromString(@"render:withInstance:");
    if ([class respondsToSelector:selector]) {
      
      // invoke render method, pass component
      NSInvocation *inv = [NSInvocation invocationWithMethodSignature:[class methodSignatureForSelector:selector]];
      [inv setSelector:selector];
      [inv setTarget:class];
      
      [inv setArgument:&(component) atIndex:2]; //arguments 0 and 1 are self and _cmd respectively, automatically set by NSInvocation
      [inv invoke];
      
      // set reference to returnComponent borrow
      [inv getReturnValue:&returnComponent];
    }
    
  }
  
  // return the component that was created
  return returnComponent;
}

/**
 prepares an animation to be run
 */
-(void) setupAnimation: (NSDictionary*) astDict {
  NSError *jsonError;
  NSData *objectData = [[astDict valueForKey:@"ast"] dataUsingEncoding:NSUTF8StringEncoding];
  NSDictionary *componentDict = [NSJSONSerialization JSONObjectWithData:objectData
                                                                options:NSJSONReadingMutableContainers
                                                                  error:&jsonError];
  
  
  NSString* animatedTargetGuid = [componentDict objectForKey:@"guid"];
  NSObject* animatedTarget = [_components objectForKey:animatedTargetGuid];
  
  // if our holder of animated (likely parent component)
  // is not in our list of component instances, do a quick check
  // on children
  if(animatedTarget == nil) {
    NSArray* children = [componentDict objectForKey:@"children"];
    if([children count] > 0){
      for(id child in children) {
        NSString* childGuid = [child objectForKey:@"uuid"];
        animatedTarget = [_components objectForKey:childGuid];
        if(animatedTarget != nil) {
          animatedTargetGuid = childGuid;
          break;
        }
      }
    }
  }
  
  if(animatedTargetGuid != nil) {
    // need a better way to get the animation dict from this event
    // {guid: '', animation: {toValue: 360, fromValue: 1, animationproperty:'rotatex', duration:5000}
    [SyrAnimator animate:animatedTarget withAnimation:[componentDict objectForKey:@"animation"] withBridge:_bridge withTargetId:animatedTargetGuid];
  }
}

/**
 Prepares class methods for bridge support.
 loops through all the methods that contain a prefix, and then prepares
 an array to send to the js app
 NativeClass.NativeMethod()
 */
-(void) registerComponent: (NSString*) className withName:(NSString*) name {
  
  int unsigned numMethods;
  Method *methods = class_copyMethodList(objc_getMetaClass([className UTF8String]), &numMethods);
  
  NSString* preferedName = name;
  if(preferedName.length == 0) {
    preferedName = className;
  }
  
  [_registeredClasses setObject:className  forKey:preferedName];
  for (int i = 0; i < numMethods; i++) {
    NSString* selector = NSStringFromSelector(method_getName(methods[i]));
    if([selector containsString:@"__syr_export"]) {
      [_nativemodules setObject:selector forKey:[NSString stringWithFormat:@"%@%@", preferedName, selector]];
    }
  }
  free(methods);
}

-(void) showInfoMessage: (NSDictionary*) message withRootView:(SyrRootView*) rootView {
  UIView* view = [[UIView alloc] init];
  NSError *jsonError;
  NSData *objectData = [[message valueForKey:@"ast"] dataUsingEncoding:NSUTF8StringEncoding];
  NSDictionary *astDict = [NSJSONSerialization JSONObjectWithData:objectData
                                                          options:NSJSONReadingMutableContainers
                                                            error:&jsonError];
  
  NSString* level = [astDict valueForKey:@"level"];
  NSString* errorMsg = [astDict valueForKey:@"errorMsg"];
  
  UILabel *text = [[UILabel alloc] init];
  text.backgroundColor = [UIColor clearColor];
  
  text.frame = rootView.frame;
  text.text = errorMsg;
  [text setFont:[UIFont systemFontOfSize:20.0]];
  [text setTextAlignment:NSTextAlignmentCenter];
  
  view.frame = rootView.frame;
  
  if([level containsString:@"error"]) {
    view.backgroundColor = [[UIColor redColor] colorWithAlphaComponent:0.9f];
    text.textColor = [UIColor whiteColor];
  } else {
    view.backgroundColor = [[UIColor yellowColor] colorWithAlphaComponent:0.9f];
    text.textColor = [UIColor blackColor];
  }
  [view addSubview:text];
  _rootView = rootView;
  [rootView addSubview:view];
}

@end
