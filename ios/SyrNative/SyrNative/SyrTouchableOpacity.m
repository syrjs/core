//
//  SyrTouchableOpacity.m
//  SyrNative
//
//  Created by Anderson,Derek on 12/15/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrTouchableOpacity.h"
#import "SyrStyler.h"
#import "SyrEventHandler.h"

@implementation SyrTouchableOpacity

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance  {
  UIView* view = [[UIView alloc] init];
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
  NSString* guid = [[component objectForKey:@"instance"] valueForKey:@"guid"];
  // todo: this should actually get dimesions from the inner frames, we don't currently have a 'fit to content' method
  view.frame = [SyrStyler styleFrame:style];
  
  // Setup Tap Code
  UITapGestureRecognizer *singleFingerTap = [[UITapGestureRecognizer alloc] initWithTarget:[[SyrEventHandler sharedInstance] assignDelegate:guid] action:@selector(handleSingleTap:)];

  [view addGestureRecognizer:singleFingerTap];

  return [SyrStyler styleView:view withStyle:style];
}

@end
