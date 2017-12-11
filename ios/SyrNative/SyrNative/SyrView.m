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
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
  view.frame = [self styleFrame:style];
  return [self styleView:view withStyle:style];
}

@end
