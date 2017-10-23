//
//  MouseRaster.m
//  MouseNative
//
//  Created by Anderson,Derek on 7/8/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrRaster.h"
#import "SyrAnimator.h"
#import "SyrText.h"
#import "SyrView.h"
#import "SyrImage.h"
#import "SyrButton.h"
#import "SyrAnimatedView.h"
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
  }
  return self;
}

-(void) parseAST: (NSDictionary*) astString withRootView: (SyrRootView*) rootView {

  NSError *jsonError;
  NSData *objectData = [[astString valueForKey:@"ast"] dataUsingEncoding:NSUTF8StringEncoding];
  NSDictionary *astDict = [NSJSONSerialization JSONObjectWithData:objectData
                                                       options:NSJSONReadingMutableContainers
                                                         error:&jsonError];
  if([astDict objectForKey:@"update"]) {
    [self update: astDict];
  } else {
    _rootView = rootView;
    [self build: astDict];
  }
}

-(void) update: (NSDictionary*) astDict {
  //NSLog(@"update");
}

-(void) build: (NSDictionary*) astDict {
  NSObject* component = [self createComponent:astDict];
  [self buildChildren:astDict withViewParent:component];
	[_rootView addSubview:component];
  [_bridge rasterRenderedComponent:[[astDict valueForKey:@"instance"] valueForKey:@"guid"]];
  [_components setObject:component forKey:[[astDict valueForKey:@"instance"] valueForKey:@"guid"]];
}

-(void) buildChildren:(NSDictionary*) component withViewParent: (UIView*) view  {
  if([component isKindOfClass:[NSDictionary class]]) {
    NSArray* children = [component objectForKey:@"children"];
    for(id child in children) {
      NSArray* subchildren = [child objectForKey:@"children"];
      if(subchildren != [NSNull null]) {
        if(subchildren.count > 0){
          [self buildChildren:subchildren withViewParent:child];
        }
      }
      
      NSObject* component = [self createComponent:child];
       [_components setObject:component forKey:[[child valueForKey:@"instance"] valueForKey:@"guid"]];
      [view addSubview:component];
    }
  }

}

-(NSObject*) createComponent: (NSDictionary*) component {
  // infer the class name from the element tag the raster is sending us
  NSString* className = [NSString stringWithFormat:@"Syr%@", [component valueForKey:@"elementName"]];
  
  // get instance of the class
  NSObject* class = NSClassFromString(className);
  
  // populate return
  NSObject* __unsafe_unretained returnComponent;
  
  // get render method
  SEL selector = NSSelectorFromString(@"render:");
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
  
  
  // return the component that was created
  return returnComponent;
}


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
    [SyrAnimator animate:animatedTarget withAnimation:[componentDict objectForKey:@"animation"] withBridge:_bridge withTargetId:animatedTargetGuid];
  }
}

@end
