//
//  SyrRotationAnimation.m
//  SyrNative
//
//  Created by Anderson,Derek on 11/30/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrRotationAnimation.h"

#define DEGREES_TO_RADIANS(degrees)((M_PI * degrees)/180)

@implementation SyrRotationAnimation

-(void) animate:(NSObject*) component withAnimation: (NSDictionary*) animation {
  [CATransaction begin];
  NSNumber* from = [animation objectForKey:@"value"];
  NSNumber* to = [animation objectForKey:@"toValue"];
  
  NSString* animatedProperty = [[animation objectForKey:@"animatedProperty"] substringFromIndex: [[animation objectForKey:@"animatedProperty"] length] - 1];
  
  double duration = [[animation objectForKey:@"duration"] integerValue];
  duration = duration / 1000; // we get it as ms from the js
  
  // get the rotation property from the animation def
  NSString* rotationProperty = [NSString stringWithFormat:@"transform.rotation.%@", animatedProperty];
  
  // rotation
  CABasicAnimation *coreAnimation = [CABasicAnimation animationWithKeyPath:rotationProperty];
  coreAnimation.duration = duration;
  coreAnimation.additive = YES;
  coreAnimation.removedOnCompletion = YES;
  coreAnimation.fillMode = kCAFillModeForwards;
  coreAnimation.fromValue = [NSNumber numberWithFloat:DEGREES_TO_RADIANS([from longValue])];
  coreAnimation.toValue = [NSNumber numberWithFloat:DEGREES_TO_RADIANS([to longValue])];
  coreAnimation.delegate = _delegate;
  
  [[component valueForKey:@"layer"] addAnimation:coreAnimation forKey:@"rotation"];
  
  [CATransaction commit];
}

@end
