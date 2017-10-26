//
//  SyrComponent.h
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrRaster.h"
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#define UIColorFromRGB(rgbValue) \
[UIColor colorWithRed: ((float)((rgbValue & 0xFF0000) >> 16))/255.0 \
green:   ((float)((rgbValue & 0x00FF00) >>  8))/255.0 \
blue:    ((float)((rgbValue & 0x0000FF) >>  0))/255.0 \
alpha:   1.]

#define SYR_CONCAT2(A, B) A ## B
#define SYR_CONCAT(A, B) SYR_CONCAT2(A, B)

// tell syr to register a native class
#define SYR_EXPORT_MODULE() \
+ (void)load { [[SyrRaster sharedInstance] registerComponent:NSStringFromClass([self class])]; }

// tell syr how to find native class methods to send to JavaScript
#define SYR_EXPORT_METHOD(method) \
+ (void)SYR_CONCAT(__syr_export__, method)

@interface SyrComponent : NSObject
+(NSObject*) render: (NSDictionary*) component;
+(UIView*) styleView: (UIView*) view withStyle: (NSDictionary*) style;
+(UIColor*) colorFromHash:(NSString*) color;
+(CGRect) styleFrame:(NSDictionary*)styleDictionary;
@end
