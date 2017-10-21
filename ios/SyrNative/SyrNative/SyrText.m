//
//  SyrTextView.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrText.h"

@implementation SyrText

+(NSObject*) render: (NSDictionary*) component {
  UITextView *textView = [[UITextView alloc] init];
  textView.backgroundColor = [UIColor clearColor];
  textView.frame = CGRectMake(0, 0, 300, 40);
  for(id subchild in [component objectForKey:@"children"]) {
    if([subchild isKindOfClass:[NSString class]]) {
      textView.text = subchild;
    }
  }
  return textView;
}

@end
