//
//  SyrOpacityAnimation.h
//  SyrNative
//
//  Created by Anderson,Derek on 11/30/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface SyrOpacityAnimation : NSObject
@property NSObject* delegate;
-(void) animate:(NSObject*) component withAnimation: (NSDictionary*) animation;
@end
