//
//  SyrAnimator.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrAnimator.h"

// import animations
#import "SyrOpacityAnimation.h"
#import "SyrXYAnimation.h"
#import "SyrHeightWidthAnimation.h"
#import "SyrRotationAnimation.h"
#import "SyrAnimationDelegate.h"

@implementation SyrAnimator
+(void) animate: (NSObject*) component withAnimation: (NSDictionary*) animation withBridge: (SyrBridge*) bridge withTargetId: (NSString*) targetId{
      if(animation != nil) {
        NSString* animationType = [SyrAnimator determineAnimationType:animation];
        if([animationType  isEqual: @"animateComponentXY"]) {
          [SyrAnimator animateComponentXY:component withAnimation:animation withBridge:bridge withTargetId:targetId];
        } else if([animationType  isEqual: @"animateInterpolate"]) {
          [SyrAnimator animateInterpolate:component withAnimation:animation withBridge:bridge withTargetId:targetId];
        }
      }
}

+(NSString*) determineAnimationType: (NSDictionary*) animation {
  NSNumber* x = [animation objectForKey:@"x"];
  NSNumber* y = [animation objectForKey:@"y"];
  NSNumber* value = [animation objectForKey:@"value"];
  NSNumber* toValue = [animation objectForKey:@"toValue"];
  NSString* animationType;
  
  if(x != nil && y != nil) {
    animationType = @"animateComponentXY";
  }
  
  if(value != nil && toValue != nil) {
    animationType = @"animateInterpolate";
  }
  
  return animationType;
}

+(void) animateInterpolate:(NSObject*) component withAnimation: (NSDictionary*) animation withBridge: (SyrBridge*) bridge withTargetId: (NSString*) targetId {

  NSString* animatedProperty = [animation objectForKey:@"animatedProperty"];
  SyrAnimationDelegate* delegate = [[SyrAnimationDelegate alloc] init];
  delegate.bridge = bridge;
  delegate.targetId = targetId;
  delegate.animation = animation;
  
  if([animatedProperty containsString:@"rotatez"] ||
     [animatedProperty containsString:@"rotatex"] ||
     [animatedProperty containsString:@"rotatey"]) {
    // start rotation animation
    SyrRotationAnimation* rotationAnimation = [[SyrRotationAnimation alloc] init];
    rotationAnimation.delegate = delegate;
    [rotationAnimation animate:component withAnimation:animation];
  }
  
  if([animatedProperty containsString:@"opacity"]) {
    SyrOpacityAnimation* opacityAnimation = [[SyrOpacityAnimation alloc] init];
    opacityAnimation.delegate = delegate;
    [opacityAnimation animate:component withAnimation:animation];
  }
  
  if([animatedProperty containsString:@"height"] ||
     [animatedProperty containsString:@"width"]) {
    SyrHeightWidthAnimation* hwAnimation = [[SyrHeightWidthAnimation alloc] init];
    hwAnimation.delegate = delegate;
    [hwAnimation animate:component withAnimation:animation];
  }
  
}

+(void) animateComponentXY:(NSObject*) component withAnimation: (NSDictionary*) animation withBridge: (SyrBridge*) bridge withTargetId: (NSString*) targetId {
  SyrAnimationDelegate* delegate = [[SyrAnimationDelegate alloc] init];
  delegate.bridge = bridge;
  delegate.targetId = targetId;
  delegate.animation = animation;
  
  SyrXYAnimation* xyAnimation = [[SyrXYAnimation alloc] init];
  xyAnimation.delegate = delegate;

  [xyAnimation animate:component withAnimation:animation];
}

@end
