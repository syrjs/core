//
//  SyrStyler.h
//  SyrNative
//
//  Created by Anderson,Derek on 12/14/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface SyrStyler : NSObject

#define UIColorFromRGB(rgbValue) \
[UIColor colorWithRed: ((float)((rgbValue & 0xFF0000) >> 16))/255.0 \
green:   ((float)((rgbValue & 0x00FF00) >>  8))/255.0 \
blue:    ((float)((rgbValue & 0x0000FF) >>  0))/255.0 \
alpha:   1.]

#define RGBA(r, g, b, a) \
[UIColor colorWithRed:(r)/255.0 green:(g)/255.0 blue:(b)/255.0 alpha:(a)]

+(UIView*) styleView: (UIView*) view withStyle: (NSDictionary*) style;
+(UIColor*) colorFromHash:(NSString*) color;
+(UIColor*) colorFromRGBA:(NSString*) color;
+(CGRect) styleFrame:(NSDictionary*)styleDictionary;

@end
