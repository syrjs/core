//
//  SyrTextView.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrText.h"
#import "SyrStyler.h"

@implementation SyrText

SYR_EXPORT_MODULE()

SYR_EXPORT_METHOD(sendMeAnEvent:(NSString*)name){
  [self sendEventWithName:@"EventReminder" body:@{@"name": name}];
}

+(NSObject*) render: (NSDictionary*) component {
  UILabel *text = [[UILabel alloc] init];
  text.backgroundColor = [UIColor clearColor];
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
  text.frame = [SyrStyler styleFrame:style];
  text.text = [[component objectForKey:@"instance"] valueForKey:@"value"];
  
  NSString* textColor = [style valueForKey:@"color"];
  if(textColor != nil) {
    text.textColor = [SyrStyler colorFromHash:textColor];
  }
  
  NSString* fontName = [style valueForKey:@"fontFamily"];
  NSNumber* fontSize = [style valueForKey:@"fontSize"];

  if(fontName != nil && fontSize != nil) {
    [text  setFont:[UIFont fontWithName:fontName size:[fontSize doubleValue]]];
  } else if (fontSize != nil) {
    [text  setFont:[UIFont systemFontOfSize:[fontSize doubleValue]]];
  }
  
  NSString* alignment = [style valueForKey:@"textAlign"];
  
  if([alignment containsString:@"center"]) {
    [text setTextAlignment:UITextAlignmentCenter];
  } else if ([alignment containsString:@"right"]) {
    [text setTextAlignment:UITextAlignmentRight];
  } else {
    [text setTextAlignment:UITextAlignmentLeft];
  }
  
  return [SyrStyler styleView:text withStyle:style];
}

@end
