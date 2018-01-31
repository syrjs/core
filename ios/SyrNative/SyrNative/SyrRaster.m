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
  [self syncState:astDict];
}

-(void) syncState: (NSDictionary*) component {
  NSString* guid = [[component objectForKey:@"instance"] valueForKey:@"guid"];
  NSObject* componentInstance = [_components objectForKey:guid];
  NSString* className = [NSString stringWithFormat:@"Syr%@", [component valueForKey:@"elementName"]];
  NSObject* class = NSClassFromString(className);
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
  
  NSArray* children = [component objectForKey:@"children"];
  if(children != [NSNull null]) {
    for(id child in children) {
      [self syncState:child];
    }
  }
}

// build the component tree
-(void) build: (NSDictionary*) astDict {
  NSObject* component = [self createComponent:astDict];
  if(component != nil) {
    NSLog(@"building %@", [astDict valueForKey:@"elementName"]);
    [self buildChildren:astDict withViewParent:component];
    [_rootView addSubview:component];
    [_bridge rasterRenderedComponent:[[astDict valueForKey:@"instance"] valueForKey:@"guid"]];
    [_components setObject:component forKey:[[astDict valueForKey:@"instance"] valueForKey:@"guid"]];
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

        if(subchildren != [NSNull null] && [subchildren count] > 0){
          [self buildChildren:child withViewParent:nsComponent];
        }
        
        [_components setObject:nsComponent forKey:[[child valueForKey:@"instance"] valueForKey:@"guid"]];
        [_bridge rasterRenderedComponent:[[child valueForKey:@"instance"] valueForKey:@"guid"]];
        
        // todo: move this out of the raster
        SEL selector = NSSelectorFromString(@"addArrangedSubview:");
        if ([view respondsToSelector:selector]) {
          UIStackView* stackView = (UIStackView*) view;
          [stackView addArrangedSubview:nsComponent];
        } else {
          [view addSubview:nsComponent];
        }
        
      } else {
        
        // render it's children to it's own parent
        if(subchildren != [NSNull null]) {
          if(subchildren.count > 0){
            [self buildChildren:child withViewParent:view];
          }
        }
      }
    }
    }
    
    //
    if(recalculateLayout) {
      [self syncState:component];
    }
    
  }
}

/**
 creates a component based on the JSX element name.
 todo: make this more react-nativeique
 */
-(NSObject*) createComponent: (NSDictionary*) component {
  // infer the class name from the element tag the raster is sending us
  NSString* className = [NSString stringWithFormat:@"Syr%@", [component valueForKey:@"elementName"]];
  
  // get instance of the class
  NSObject* class = NSClassFromString(className);
  
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
        NSString* childGuid = [child objectForKey:@"guid"];
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
-(void) registerComponent: (NSString*) className {
  int unsigned numMethods;
  Method *methods = class_copyMethodList(objc_getMetaClass([className UTF8String]), &numMethods);
  for (int i = 0; i < numMethods; i++) {
    NSString* selector = NSStringFromSelector(method_getName(methods[i]));
    if([selector containsString:@"__syr_export"]) {
      [_nativemodules setObject:selector forKey:[NSString stringWithFormat:@"%@%@", className, selector]];
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
  [text setTextAlignment:UITextAlignmentCenter];
  
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
