//
//  SyrAnimator.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrAnimator.h"


@interface SyrAnimatorDelegate : NSObject
@property SyrBridge* bridge;
@property	NSString* targetId;
@property	NSDictionary* animation;
@end
@implementation SyrAnimatorDelegate

- (void)animationDidStop:(CAAnimation *)anim
                finished:(BOOL)finished {
  if(finished){
    NSLog(@"animation complete");
    NSDictionary* event = @{@"guid":_targetId, @"type":@"animationComplete", @"animation": _animation};
    [_bridge sendEvent:event];
  }
}

@end

@implementation SyrAnimator
+(void) animate: (NSObject*) component withAnimation: (NSDictionary*) animation withBridge: (SyrBridge*) bridge withTargetId: (NSString*) targetId{
  		NSLog(@"animate");

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
  NSLog(@"interpolate");
  [CATransaction begin];
  NSNumber* from = [animation objectForKey:@"value"];
  NSNumber* to = [animation objectForKey:@"toValue"];
  double duration = [[animation objectForKey:@"duration"] integerValue];
  duration = duration / 1000; // we get it as ms from the js

  CABasicAnimation *coreAnimation = [CABasicAnimation   animationWithKeyPath:@"transform.rotation.z"];
  coreAnimation.duration = duration;
  coreAnimation.additive = YES;
  coreAnimation.removedOnCompletion = YES;
  coreAnimation.fillMode = kCAFillModeForwards;
  coreAnimation.fromValue = [NSNumber numberWithFloat:DEGREES_TO_RADIANS([from longValue])];
  coreAnimation.toValue = [NSNumber numberWithFloat:DEGREES_TO_RADIANS([to longValue])];
  
  SyrAnimatorDelegate* delegate = [[SyrAnimatorDelegate alloc] init];
  delegate.bridge = bridge;
  delegate.targetId = targetId;
  delegate.animation = animation;
  coreAnimation.delegate = delegate;
  
//  [CATransaction setCompletionBlock:^{
//    NSDictionary* event = @{@"guid":targetId, @"type":@"animationComplete", @"animation": animation};
//    [bridge sendEvent:event];
//  }];
//  
  [[component valueForKey:@"layer"] addAnimation:coreAnimation forKey:@"rotation"];
  [CATransaction commit];
}

+(void) animateComponentXY:(NSObject*) component withAnimation: (NSDictionary*) animation withBridge: (SyrBridge*) bridge withTargetId: (NSString*) targetId {
  NSNumber* x = [animation objectForKey:@"x"];
  NSNumber* y = [animation objectForKey:@"y"];
  NSNumber* x2 = [animation objectForKey:@"x2"];
  NSNumber* y2 = [animation objectForKey:@"y2"];
  double duration = [[animation objectForKey:@"duration"] integerValue];
  duration = duration / 1000; // we get it as ms from the js
  NSNumber* currentFrame = [component valueForKeyPath:@"frame"];
  CGRect frame = CGRectMake([x floatValue], [y floatValue], [currentFrame CGRectValue].size.width, [currentFrame CGRectValue].size.height);
  // get render method
  SEL selector = NSSelectorFromString(@"setValue:forKey:");
  if ([component respondsToSelector:selector]) {
    [component performSelector: selector withObject:[NSValue valueWithCGRect:frame] withObject:@"frame"];
    [UIView animateWithDuration:[[NSNumber numberWithDouble:duration] floatValue] delay:0.0 options:UIViewAnimationOptionCurveEaseInOut animations:^{
      CGRect frame = CGRectMake([x2 floatValue], [y2 floatValue], [currentFrame CGRectValue].size.width, [currentFrame CGRectValue].size.height);
      [component performSelector: selector withObject:[NSValue valueWithCGRect:frame] withObject:@"frame"];
    } completion:^(BOOL finished) {
      NSDictionary* event = @{@"guid":targetId, @"type":@"animationComplete", @"animation": animation};
      [bridge sendEvent:event];
    }];
    
  }
}

@end
