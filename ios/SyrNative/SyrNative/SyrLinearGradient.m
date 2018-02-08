//
//  SyrLinearGradient.m
//  SyrNative
//
//  Created by Anderson,Derek on 11/17/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrLinearGradient.h"
#import "SyrStyler.h"

@implementation SyrLinearGradient

SYR_EXPORT_MODULE(LinearGradient)

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance  {
  UIView* view = [[UIView alloc] init];
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
  view.frame = [SyrStyler styleFrame:style];
  
  CAGradientLayer *gradientLayer = [CAGradientLayer layer];
  gradientLayer.frame = view.layer.bounds;
  
  NSMutableArray* colors = [[NSMutableArray alloc] init];
  NSArray* gradientColors = [[component objectForKey:@"attributes"] objectForKey:@"colors"];
  
  for(id color in gradientColors) {
    struct CGColor* cgcolor = [SyrStyler colorFromHash:color].CGColor;
    [colors addObject: (__bridge id _Nonnull)(cgcolor)];
  }
  
  gradientLayer.colors = colors;
  
  gradientLayer.locations = [NSArray arrayWithObjects:
                             [NSNumber numberWithFloat:0.0f],
                             [NSNumber numberWithFloat:1.0f],
                             nil];
  
  [view.layer addSublayer:gradientLayer];
  
  return [SyrStyler styleView:view withStyle:style];
}

@end
