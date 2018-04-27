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

SYR_EXPORT_MODULE(TouchableOpacity)

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance  {
  UIView* view = [[UIView alloc] init];
  NSDictionary* style = [[component objectForKey:@"instance"] valueForKey:@"style"];
  NSString* guid = [[component objectForKey:@"instance"] valueForKey:@"uuid"];
  // todo: this should actually get dimesions from the inner frames, we don't currently have a 'fit to content' method
    NSString* elementName = [component objectForKey:@"elementName"];
    if(componentInstance != nil) {
        view = (UIView*)componentInstance;
        if([elementName containsString:@"Animated"] == false){
            view.frame = [SyrStyler styleFrame:style];
        }
    } else {
        view = [[UIView alloc] init];
        view.frame = [SyrStyler styleFrame:style];
    }
    
  
  // Setup Tap Code
  SEL selector = NSSelectorFromString(@"handleSingleTap:");
  UITapGestureRecognizer *singleFingerTap = [[UITapGestureRecognizer alloc] initWithTarget:[[SyrEventHandler sharedInstance] assignDelegate:guid] action:selector];

  [view addGestureRecognizer:singleFingerTap];

  return [SyrStyler styleView:view withStyle:style];
}

@end
