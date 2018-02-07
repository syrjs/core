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

SYR_EXPORT_MODULE(StackView)

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance  {
  UIStackView* stackView = [[UIStackView alloc] init];
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
  NSString* axis = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"axis"];
  NSString* guid = [[component objectForKey:@"instance"] valueForKey:@"guid"];
  NSString* spacing = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"spacing"];
  NSString* distribution = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"distribution"];
  NSString* alignment = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"align"];
  NSString* height = [style valueForKey:@"height"];
  
  if([alignment containsString:@"center"]) {
    stackView.alignment = UIStackViewAlignmentCenter;
  }
  
  if([axis containsString:@"vertical"]) {
    stackView.axis = UILayoutConstraintAxisVertical;
  } else {
    stackView.axis = UILayoutConstraintAxisHorizontal;
  }
  
  if(spacing != nil) {
    stackView.spacing = [spacing doubleValue];
  }
  
  if ([distribution containsString:@"fill"]) {
    stackView.distribution = UIStackViewDistributionFill;
  } else if ([distribution containsString:@"proportional"]) {
    stackView.distribution = UIStackViewDistributionFillProportionally;
  } else if ([distribution containsString:@"spacing"]) {
    stackView.distribution = UIStackViewDistributionEqualSpacing;
  } else {
    // default behavior
    stackView.distribution = UIStackViewDistributionFillEqually;
  }
  
  stackView.frame = [SyrStyler styleFrame:style];
  if(height != nil && [height isKindOfClass:[NSString class]] && [height containsString:@"auto"]) {
      NSNumber* totalHeight = [NSNumber numberWithInt:0];
      for(id child in [component objectForKey:@"children"]){
        NSDictionary* childStyle = [[[child objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
        NSNumber* height = [childStyle objectForKey:@"height"];
        totalHeight = [NSNumber numberWithDouble:[totalHeight doubleValue]+[height doubleValue]+[spacing doubleValue]];
      }
    	CGRect frame = stackView.frame;
    	frame.size.height = [totalHeight doubleValue];
    	stackView.frame = frame;
  }
  
  return [SyrStyler styleView:stackView withStyle:style];
}

@end
