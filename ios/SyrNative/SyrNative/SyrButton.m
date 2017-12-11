//
//  SyrButton.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrButton.h"
#import "SyrEventHandler.h"

@implementation SyrButton

+(NSObject*) render: (NSDictionary*) component {
  UIButton *button = [UIButton buttonWithType:UIButtonTypeSystem];
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
  NSString* buttonTitle =  [[[component objectForKey:@"instance"] objectForKey:@"state"] valueForKey:@"value"];
  
  NSString* titleColor = [style valueForKey:@"color"];
  if(titleColor != nil) {
    [button setTitleColor:[self colorFromHash:titleColor] forState:UIControlStateNormal];
  }
  
  [button setTitle:buttonTitle forState:UIControlStateNormal];
  button.frame = [self styleFrame:style];
  
  NSNumber* fontSize = [style valueForKey:@"fontSize"];
  if(fontSize != nil) {
   button.titleLabel.font = [UIFont boldSystemFontOfSize:[fontSize doubleValue]];
  }

  //[button sizeToFit];
  NSNumber* tag = [[component valueForKey:@"instance"] valueForKey:@"tag"];
  [button addTarget:[SyrEventHandler sharedInstance] action:@selector(btnSelected:) forControlEvents:UIControlEventTouchUpInside];
  button.tag = [tag integerValue];
  
  // Add an action in current code file (i.e. target)
  return [self styleView:button withStyle:style];
}

@end
