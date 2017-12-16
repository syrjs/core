//
//  SyrHeightWidthAnimation.m
//  SyrNative
//
//  Created by Anderson,Derek on 11/30/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrHeightWidthAnimation.h"

@implementation SyrHeightWidthAnimation


-(void) animate:(NSObject*) component withAnimation: (NSDictionary*) animation {
  NSString* animatedProperty = [animation objectForKey:@"animatedProperty"];
  NSNumber* toValue = [animation objectForKey:@"toValue"];
  double duration = [[animation objectForKey:@"duration"] integerValue];
  duration = duration / 1000; // we get it as ms from the js
  NSNumber* currentFrame = [component valueForKeyPath:@"frame"];
  CGRect frame = CGRectMake(0, 0, [currentFrame CGRectValue].size.width, [currentFrame CGRectValue].size.height);
  
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
    [component performSelector: selector withObject:[NSValue valueWithCGRect:frame] withObject:@"frame"];
    [UIView animateWithDuration:[[NSNumber numberWithDouble:duration] floatValue] delay:0.0 options:UIViewAnimationOptionCurveEaseInOut animations:^{
        NSNumber* currentFrame = [component valueForKeyPath:@"frame"];
      	NSNumber* x = [NSNumber numberWithFloat:[currentFrame CGRectValue].origin.x];
      	NSNumber* y = [NSNumber numberWithFloat:[currentFrame CGRectValue].origin.y];
        CGRect frame = CGRectMake([x doubleValue], [y doubleValue], [width doubleValue], [height doubleValue]);
        [component performSelector: selector withObject:[NSValue valueWithCGRect:frame] withObject:@"frame"];
    } completion:^(BOOL finished) {
      [_delegate animationDidStop:nil finished:finished];
    }];
  }
}

@end
