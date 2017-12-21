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
  UIView* view;
  if(componentInstance != nil) {
    view = (UIView*)componentInstance;
  } else {
    view = [[UIView alloc] init];
  }
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
  NSDictionary* state =	[[component objectForKey:@"instance"] objectForKey:@"state"];
  
  if([state objectForKey:@"x"] != nil || [state objectForKey:@"x"] != nil) {
    NSLog(@"hello");
    [style setValue:[state objectForKey:@"x"] forKey:@"left"];
  }
  
  view.frame = [SyrStyler styleFrame:style];
  
  return [SyrStyler styleView:view withStyle:style];
}

@end
