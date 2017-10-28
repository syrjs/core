//
//  SyrComponent.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrComponent.h"

@implementation SyrComponent

+(void) sendEventWithName:(NSString*)name body:(NSDictionary*) body {
  [[[SyrRaster sharedInstance] bridge] sendEvent:@{@"type":@"event", @"name": name, @"body": body}];
}

+(UIColor*) colorFromHash:(NSString*) color {
  color = [color stringByReplacingOccurrencesOfString:@"#" withString:@"0x"];
  unsigned colorInt = 0;
  [[NSScanner scannerWithString:color] scanHexInt:&colorInt];
  return UIColorFromRGB(colorInt);
}

+(UIView*) styleView: (UIView*) view withStyle: (NSDictionary*) style {
  //view.frame = [self styleFrame:style];
  NSString* backgroundColor = [style valueForKey:@"backgroundColor"];
  view.backgroundColor = [self colorFromHash:backgroundColor];
  
  NSNumber* borderRadius = [style valueForKey:@"borderRadius"];
  if (borderRadius) {
    view.layer.cornerRadius = [borderRadius doubleValue];
  }
  
  NSNumber* borderWidth = [style valueForKey:@"borderWidth"];
 	NSString* borderColor = [style valueForKey:@"backgroundColor"];
  if(borderWidth != nil) {
    CALayer *upperBorder = [CALayer layer];
    upperBorder.backgroundColor = [[UIColor whiteColor] CGColor];
    upperBorder.frame = CGRectMake(0, 0, CGRectGetWidth(view.frame), 6.0f);
    [view.layer addSublayer:upperBorder];
    
    CALayer *rightBorder = [CALayer layer];
    upperBorder.backgroundColor = [[UIColor whiteColor] CGColor];
    upperBorder.frame = CGRectMake(0, 0, CGRectGetWidth(view.frame), 6.0f);
    [view.layer addSublayer:upperBorder];
    
    CALayer *bottomBorder = [CALayer layer];
    upperBorder.backgroundColor = [[UIColor whiteColor] CGColor];
    upperBorder.frame = CGRectMake(0, 0, CGRectGetWidth(view.frame), 6.0f);
    [view.layer addSublayer:upperBorder];
    
    CALayer *leftBorder = [CALayer layer];
    upperBorder.backgroundColor = [[UIColor whiteColor] CGColor];
    upperBorder.frame = CGRectMake(0, 0, CGRectGetWidth(view.frame), 6.0f);
    [view.layer addSublayer:upperBorder];
  }
  // overflow hidden
  view.layer.masksToBounds = true;
  return view;
}

+(CGRect) styleFrame:(NSDictionary*)styleDictionary {
  NSNumber* frameHeight = [styleDictionary objectForKey:@"height"];
  NSNumber* frameWidth = [styleDictionary objectForKey:@"width"];
  NSNumber* framex = [styleDictionary objectForKey:@"left"];
  NSNumber* framey = [styleDictionary objectForKey:@"top"];
  return CGRectMake([framex doubleValue], [framey doubleValue], [frameWidth doubleValue], [frameHeight doubleValue]);
}

@end
