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
          NSLog(@"Set the frame!");
          [component performSelector: selector withObject:[NSValue valueWithCGRect:frame] withObject:@"frame"];

          [UIView animateWithDuration:[[NSNumber numberWithDouble:duration] floatValue] delay:0.0 options:UIViewAnimationOptionCurveEaseInOut animations:^{
            //todo add animate for size
            CGRect frame = CGRectMake([x2 floatValue], [y2 floatValue], [currentFrame CGRectValue].size.width, [currentFrame CGRectValue].size.height);
            [component performSelector: selector withObject:[NSValue valueWithCGRect:frame] withObject:@"frame"];
          } completion:^(BOOL finished) {
            NSDictionary* event = @{@"guid":targetId, @"type":@"animationComplete", @"animation": animation};
            [bridge sendEvent:event];
          }];
          
        }
      }
}
@end
