//
//  SyrView.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/16/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrView.h"

@implementation SyrView

+(NSObject*) render: (NSDictionary*) component {
  UIView* view = [[UIView alloc] init];
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"props"] valueForKey:@"style"];
  view.frame = [SyrView styleFrame:style];
  return [SyrView styleView:view withStyle:style];
}

@end
