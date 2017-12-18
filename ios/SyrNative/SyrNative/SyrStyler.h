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

+(UIView*) styleView: (UIView*) view withStyle: (NSDictionary*) style;
+(UIColor*) colorFromHash:(NSString*) color;
+(CGRect) styleFrame:(NSDictionary*)styleDictionary;

@end
