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

SYR_EXPORT_MODULE(Text)

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance {
  UILabel *text;

  // todo: flip to cgsize and introduce wrapping
  
  if(componentInstance != nil) {
    text = (UILabel*)componentInstance;
  } else {
    text = [[UILabel alloc] init];
  }
  
  text.backgroundColor = [UIColor clearColor];
  NSDictionary* style = [[component objectForKey:@"instance"] valueForKey:@"style"];
  text.frame = [SyrStyler styleFrame:style];
  text.text = [[component objectForKey:@"instance"] valueForKey:@"value"];
  
  NSString* textColor = [style valueForKey:@"color"];
  if(textColor != nil) {
    text.textColor = [SyrStyler colorFromHash:textColor];
  }
  
  NSString* fontName = [style valueForKey:@"fontFamily"];
  NSNumber* fontSize = [style valueForKey:@"fontSize"];
  NSString* fontWeight = [style valueForKey:@"fontWeight"];
  NSString* lineBreak = [style valueForKey:@"lineBreak"];
  NSNumber* maxLines = [style valueForKey:@"maxLines"];

  if(lineBreak != nil){
    if([lineBreak containsString:@"normal"]) {
      [text setLineBreakMode:NSLineBreakByWordWrapping];
    }
    if([lineBreak containsString:@"loose"]) {
      [text setLineBreakMode:NSLineBreakByCharWrapping];
    }
    if(maxLines != nil) {
      [text setNumberOfLines:[maxLines doubleValue]];
    }
  }

  if(fontName != nil && fontSize != nil) {
    [text  setFont:[UIFont fontWithName:fontName size:[fontSize doubleValue]]];
  } else if (fontSize != nil) {
    [text  setFont:[UIFont systemFontOfSize:[fontSize doubleValue]]];
  }
  
  if(fontWeight != nil) {
    if([fontWeight containsString:@"bold"]) {
      [text setFont:[UIFont boldSystemFontOfSize:text.font.pointSize]];
    }
  }
  
  NSString* alignment = [style valueForKey:@"textAlign"];
  
  if([alignment containsString:@"center"]) {
    [text setTextAlignment:NSTextAlignmentCenter];
  } else if ([alignment containsString:@"right"]) {
    [text setTextAlignment:NSTextAlignmentRight];
  } else {
    [text setTextAlignment:NSTextAlignmentLeft];
  }
  
  return [SyrStyler styleView:text withStyle:style];
}

@end
