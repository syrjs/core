//
//  SyrAnimationDelegate.h
//  SyrNative
//
//  Created by Anderson,Derek on 12/1/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "SyrBridge.h"

@interface SyrAnimationDelegate : NSObject <CAAnimationDelegate>
@property SyrBridge* bridge;
@property  NSString* targetId;
@property  NSDictionary* animation;
- (void)animationDidStop:(CAAnimation *)anim
                finished:(BOOL)finished;
@end
