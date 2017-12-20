//
//  SyrStackedView.m
//  SyrNative
//
//  Created by Anderson,Derek on 11/18/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrStackView.h"
#import "SyrStyler.h"

@implementation SyrStackView

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance  {
  UIStackView* stackView = [[UIStackView alloc] init];
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
  NSString* axis = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"axis"];
  NSString* guid = [[component objectForKey:@"instance"] valueForKey:@"guid"];
  
  if([axis containsString:@"vertical"]) {
    stackView.axis = UILayoutConstraintAxisVertical;
  } else {
    stackView.axis = UILayoutConstraintAxisHorizontal;
  }
  
  stackView.distribution = UIStackViewDistributionFillEqually;

  stackView.frame = [SyrStyler styleFrame:style];
  return [SyrStyler styleView:stackView withStyle:style];
}

@end
