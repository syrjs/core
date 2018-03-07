//
//  SyrHapticHelper.h
//  SyrNative
//
//  Created by Malkireddy, Siddharth on 3/7/18.
//  Copyright © 2018 Anderson,Derek. All rights reserved.
//

// credit Emre YANIK

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#define getEnumValue(name) \
[NSNumber numberWithInt:#name]

@interface SyrHapticHelper : NSObject

+ (void)generateFeedback:(NSString*) type;

@end

