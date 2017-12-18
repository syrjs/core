//
//  SyrAnimatedView.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrAnimatedView.h"
#import "SyrStyler.h"

@implementation SyrAnimatedView

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance  {
  UIView* view = [[UIView alloc] init];
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
  view.frame = [SyrStyler styleFrame:style];
  
  return [SyrStyler styleView:view withStyle:style];
}

@end
