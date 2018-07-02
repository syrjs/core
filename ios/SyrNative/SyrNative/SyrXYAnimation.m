//
//  SyrXYAnimation.m
//  SyrNative
//
//  Created by Anderson,Derek on 11/30/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrXYAnimation.h"

@implementation SyrXYAnimation

-(void) animate:(UIView*) component withAnimation: (NSDictionary*) animation {
//@TODO REVISIT and figure out a better way to do this.
//  NSNumber* x = [animation objectForKey:@"x"];
//  NSNumber* y = [animation objectForKey:@"y"];
  NSNumber* x2 = [animation objectForKey:@"x2"];
  NSNumber* y2 = [animation objectForKey:@"y2"];
  double duration = [[animation objectForKey:@"duration"] integerValue];
  duration = duration / 1000; // we get it as ms from the js
//  NSNumber* currentFrame = [component valueForKeyPath:@"frame"];
//  CGRect frame = CGRectMake([x floatValue], [y floatValue], [currentFrame CGRectValue].size.width, [currentFrame CGRectValue].size.height);
  // get render method
  SEL selector = NSSelectorFromString(@"setValue:forKey:");
  if ([component respondsToSelector:selector]) {
//    [component setValue:[NSValue valueWithCGRect:frame] forKey:@"frame"];
    [UIView animateWithDuration:[[NSNumber numberWithDouble:duration] floatValue] delay:0.0 options:UIViewAnimationOptionCurveEaseInOut animations:^{
      NSNumber* currentFrame = [component valueForKeyPath:@"frame"];
      CGRect frame = CGRectMake([x2 floatValue], [y2 floatValue], [currentFrame CGRectValue].size.width, [currentFrame CGRectValue].size.height);
      [component setValue:[NSValue valueWithCGRect:frame] forKey:@"frame"];
    } completion:^(BOOL finished) {
      [self->_delegate animationDidStop:nil finished:finished];
    }];
  }
}

@end
