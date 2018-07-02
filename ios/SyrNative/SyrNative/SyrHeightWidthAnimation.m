//
//  SyrHeightWidthAnimation.m
//  SyrNative
//
//  Created by Anderson,Derek on 11/30/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrHeightWidthAnimation.h"

@implementation SyrHeightWidthAnimation


-(void) animate:(UIView*) component withAnimation: (NSDictionary*) animation {
  NSString* animatedProperty = [animation objectForKey:@"animatedProperty"];
  NSNumber* toValue = [animation objectForKey:@"toValue"];
  double duration = [[animation objectForKey:@"duration"] integerValue];
  duration = duration / 1000; // we get it as ms from the js
  NSNumber* currentFrame = [component valueForKeyPath:@"frame"];

  NSNumber* width = [NSNumber numberWithFloat:[currentFrame CGRectValue].size.width];
  NSNumber* height = [NSNumber numberWithFloat:[currentFrame CGRectValue].size.height];

  if([animatedProperty containsString:@"height"]) {
    height = toValue;
  } else {
    width = toValue;
  }
  
  // get render method
  SEL selector = NSSelectorFromString(@"setValue:forKey:");
  if ([component respondsToSelector:selector]) {
    [UIView animateWithDuration:[[NSNumber numberWithDouble:duration] floatValue] delay:0.0 options:UIViewAnimationOptionCurveEaseInOut animations:^{
        CGRect frame = CGRectMake([currentFrame CGRectValue].origin.x, [currentFrame CGRectValue].origin.y, [width doubleValue], [height doubleValue]);
      	[component setValue:[NSValue valueWithCGRect:frame] forKey:@"frame"];
    } completion:^(BOOL finished) {
      [self->_delegate animationDidStop:nil finished:finished];
    }];
  }
}

@end
