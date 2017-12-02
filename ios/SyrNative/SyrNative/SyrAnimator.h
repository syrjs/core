//
//  SyrAnimator.h
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//
#import <Foundation/Foundation.h>
#import "SyrBridge.h"

@interface SyrAnimator : NSObject
+(void) animate: (NSObject*) component withAnimation: (NSDictionary*) animationDict withBridge: (SyrBridge*) bridge withTargetId: (NSString*) targetId;
@end
