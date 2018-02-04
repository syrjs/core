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
  NSString* guid = [[component objectForKey:@"instance"] valueForKey:@"uuid"];
  
  if(componentInstance != nil) {
    button = (UIButton*)componentInstance;
  } else {
    button = [UIButton buttonWithType:UIButtonTypeSystem];
    [button addTarget:[[SyrEventHandler sharedInstance] assignDelegate:guid] action:@selector(handleSingleTap:) forControlEvents:UIControlEventTouchUpInside];
  }
  
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
  NSString* buttonTitle =  [[component objectForKey:@"instance"] valueForKey:@"value"];
  
	// default to button enabled
  id isEnabled = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] objectForKey:@"enabled"];
  if(isEnabled != nil) {
    if([isEnabled boolValue] == NO) {
      button.enabled = false;
    }
  }
  
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
  button.tag = [tag integerValue];
  
  // Add an action in current code file (i.e. target)
  return [SyrStyler styleView:button withStyle:style];
}

@end
