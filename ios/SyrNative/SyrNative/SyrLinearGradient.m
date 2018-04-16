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
    NSString *rightToleft = @"rightToLeft";
    NSString *leftToRight = @"leftToRight";
    NSString *topToBottom = @"topToBottom";
    NSString *bottomToTop = @"bottomToTop";
    NSString *topLeftToBottomRight = @"topLeftToBottomRight";
    NSString *bottomRightToTopLeft = @"bottomRightToTopLeft";
    NSString *topRightToBottomLeft = @"topRightToBottomLeft";
    NSString *bottomLeftToTopRight = @"bottomLeftToTopRight";
    
    UIView* view = [[UIView alloc] init];
    NSDictionary* style = [[component objectForKey:@"instance"] valueForKey:@"style"];
    view.frame = [SyrStyler styleFrame:style];
    
    CAGradientLayer *gradientLayer = [CAGradientLayer layer];
    gradientLayer.frame = view.layer.bounds;
    
    NSMutableArray* colors = [[NSMutableArray alloc] init];
    NSArray* gradientColors = [[[component objectForKey:@"instance"] objectForKey:@"props"] objectForKey:@"colors"];
    NSString* direction = [[component valueForKey:@"attributes"]objectForKey:@"direction"];
    
    if ([direction  isEqual: rightToleft]) {
        gradientLayer.startPoint = CGPointMake(1, 0.5);
        gradientLayer.endPoint = CGPointMake(0, 0.5);
    }
    if ([direction  isEqual: leftToRight]) {
        gradientLayer.startPoint = CGPointMake(0, 0.5);
        gradientLayer.endPoint = CGPointMake(1, 0.5);
    }
    if ([direction  isEqual: bottomToTop]) {
        gradientLayer.startPoint = CGPointMake(0.5, 1);
        gradientLayer.endPoint = CGPointMake(0.5, 0);
    }
    if ([direction  isEqual: topToBottom]) {
        gradientLayer.startPoint = CGPointMake(0.5, 0);
        gradientLayer.endPoint = CGPointMake(0.5, 1);
    }
    if ([direction  isEqual: topLeftToBottomRight]) {
        gradientLayer.startPoint = CGPointZero;
        gradientLayer.endPoint = CGPointMake(1, 1);
    }
    if ([direction  isEqual: bottomRightToTopLeft]) {
        gradientLayer.startPoint = CGPointMake(1, 1);
        gradientLayer.endPoint = CGPointZero;
    }
    if ([direction  isEqual: topRightToBottomLeft]) {
        gradientLayer.startPoint = CGPointMake(1, 0);
        gradientLayer.endPoint = CGPointMake(0, 1);
    }
    if ([direction  isEqual: bottomLeftToTopRight]) {
        gradientLayer.startPoint = CGPointMake(0, 1);
        gradientLayer.endPoint = CGPointMake(1, 0);
    }
    
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
