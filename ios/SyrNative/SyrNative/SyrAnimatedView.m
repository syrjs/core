//
//  SyrAnimatedView.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrAnimatedView.h"

@implementation SyrAnimatedView

+(NSObject*) render: (NSDictionary*) component {
  UIView* view = [[UIView alloc] init];
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"props"] valueForKey:@"style"];
  view.frame = [SyrAnimatedView styleFrame:style];
  
  return [SyrAnimatedView styleView:view withStyle:style];
}

@end
