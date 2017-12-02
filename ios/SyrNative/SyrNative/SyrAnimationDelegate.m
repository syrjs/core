//
//  SyrAnimationDelegate.m
//  SyrNative
//
//  Created by Anderson,Derek on 12/1/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrAnimationDelegate.h"

@implementation SyrAnimationDelegate

- (void)animationDidStop:(CAAnimation *)anim
                finished:(BOOL)finished {
  if(finished){
    NSDictionary* event = @{@"guid":_targetId, @"type":@"animationComplete", @"animation": _animation};
    [_bridge sendEvent:event];
  }
}

@end
