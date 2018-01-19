//
//  SyrView.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/16/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrView.h"
#import "SyrStyler.h"

@implementation SyrView

SYR_EXPORT_MODULE()

SYR_EXPORT_METHOD(testExportMethod:(NSString *)name duration:(NSInteger *)duration)
{
  NSLog(@"sup");
  // do something with Name and Location strings
}

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance {
  UIView* view;
  if(componentInstance != nil) {
    view = (UIView*)componentInstance;
  } else {
    view = [[UIView alloc] init];
  }
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
  view.frame = [SyrStyler styleFrame:style];
  return [SyrStyler styleView:view withStyle:style];
}

@end
