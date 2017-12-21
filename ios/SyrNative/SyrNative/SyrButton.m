//
//  SyrButton.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrButton.h"
#import "SyrEventHandler.h"
#import "SyrStyler.h"

@implementation SyrButton

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance  {
  UIButton *button;
  
  if(componentInstance != nil) {
    button = (UIButton*)componentInstance;
  } else {
    button = [UIButton buttonWithType:UIButtonTypeSystem];
  }
  
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
  NSString* guid = [[component objectForKey:@"instance"] valueForKey:@"guid"];
  NSString* buttonTitle =  [[component objectForKey:@"instance"] valueForKey:@"value"];
  
  NSString* titleColor = [style valueForKey:@"color"];
  if(titleColor != nil) {
    [button setTitleColor:[SyrStyler colorFromHash:titleColor] forState:UIControlStateNormal];
  }
  
  [button setTitle:buttonTitle forState:UIControlStateNormal];
  button.frame = [SyrStyler styleFrame:style];
  
  NSNumber* fontSize = [style valueForKey:@"fontSize"];
  if(fontSize != nil) {
   button.titleLabel.font = [UIFont boldSystemFontOfSize:[fontSize doubleValue]];
  }

  //[button sizeToFit];
  NSNumber* tag = [[component valueForKey:@"instance"] valueForKey:@"tag"];
  [button addTarget:[[SyrEventHandler sharedInstance] assignDelegate:guid] action:@selector(handleSingleTap:) forControlEvents:UIControlEventTouchUpInside];
  button.tag = [tag integerValue];
  
  // Add an action in current code file (i.e. target)
  return [SyrStyler styleView:button withStyle:style];
}

@end
