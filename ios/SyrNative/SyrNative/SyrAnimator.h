//
//  SyrAnimator.h
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface SyrAnimator : NSObject
+(void) animate: (NSObject*) component withAnimation: (NSDictionary*) animationDict;
@end
