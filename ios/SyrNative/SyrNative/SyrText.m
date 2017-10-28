//
//  SyrTextView.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrText.h"

@implementation SyrText

SYR_EXPORT_MODULE()

SYR_EXPORT_METHOD(sendMeAnEvent:(NSString*)name){
  [self sendEventWithName:@"EventReminder" body:@{@"name": name}];
}

+(NSObject*) render: (NSDictionary*) component {
  UILabel *text = [[UILabel alloc] init];
  text.backgroundColor = [UIColor clearColor];
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"props"] valueForKey:@"style"];
  text.frame = [SyrText styleFrame:style];
  text.text = [[[component objectForKey:@"instance"] objectForKey:@"state"] valueForKey:@"value"];
  
  NSString* textColor = [style valueForKey:@"color"];
  if(textColor != nil) {
    text.textColor = [SyrText colorFromHash:textColor];
  }
  
  NSString* fontName = [style valueForKey:@"fontFamily"];
  NSNumber* fontSize = [style valueForKey:@"fontSize"];

  if(fontName != nil && fontSize != nil) {
    [text  setFont:[UIFont fontWithName:fontName size:[fontSize doubleValue]]];
  } else if (fontSize != nil) {
    [text  setFont:[UIFont systemFontOfSize:[fontSize doubleValue]]];
  }
  
  return [SyrText styleView:text withStyle:style];
}

@end
