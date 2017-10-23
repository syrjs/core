//
//  SyrAnimator.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrAnimator.h"

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
  NSNumber* from = [animation objectForKey:@"value"];
  NSNumber* to = [animation objectForKey:@"toValue"];
  double duration = [[animation objectForKey:@"duration"] integerValue];
  duration = duration / 1000; // we get it as ms from the js
  SEL selector = NSSelectorFromString(@"setValue:forKey:");
  if ([component respondsToSelector:selector]) {
   
    [UIView animateWithDuration:[[NSNumber numberWithDouble:duration] floatValue] delay:0.0 options:UIViewAnimationOptionCurveEaseInOut animations:^{
       CGAffineTransform transform = CGAffineTransformMakeRotation(M_PI);
       [component performSelector: selector withObject:[NSValue valueWithCGAffineTransform:transform] withObject:@"transform"];
    } completion:^(BOOL finished) {
      NSDictionary* event = @{@"guid":targetId, @"type":@"animationComplete", @"animation": animation};
      [bridge sendEvent:event];
    }];
  }
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
