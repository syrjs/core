//
//  SyrOpacityAnimation.m
//  SyrNative
//
//  Created by Anderson,Derek on 11/30/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrOpacityAnimation.h"

@implementation SyrOpacityAnimation

-(void) animate:(NSObject*) component withAnimation: (NSDictionary*) animation {
  [CATransaction begin];
  
  // finish hooking these up for in/out
  NSNumber* from = [animation objectForKey:@"value"];
  NSNumber* to = [animation objectForKey:@"toValue"];
  NSArray* values;
  NSString* animationKey;
  
  double duration = [[animation objectForKey:@"duration"] integerValue];
  duration = duration / 1000; // we get it as ms from the js
  
  if(from > to) {
    // fade out
    values = @[@1.0, @0.0];
    animationKey = @"opacityOUT";
  } else {
    // fade in
    values = @[@0.0, @1.0];
    animationKey = @"opacityIN";
  }
  
  // fade out
  CAKeyframeAnimation *fadeInAndOutAnimation = [CAKeyframeAnimation animationWithKeyPath:@"opacity"];
  fadeInAndOutAnimation.beginTime = CACurrentMediaTime();
  fadeInAndOutAnimation.duration = duration;
  fadeInAndOutAnimation.keyTimes = @[@0.0, @1.0];
  fadeInAndOutAnimation.values = values;
  fadeInAndOutAnimation.additive = NO;
  fadeInAndOutAnimation.removedOnCompletion = false;
  fadeInAndOutAnimation.fillMode = kCAFillModeForwards;
  fadeInAndOutAnimation.delegate = _delegate;

  [[component valueForKey:@"layer"] addAnimation:fadeInAndOutAnimation forKey:animationKey];
  
  [CATransaction commit];
}

@end
