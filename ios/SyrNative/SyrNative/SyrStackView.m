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
  UIStackView* stackView;
  
  if(componentInstance != nil) {
    stackView = (UIStackView*)componentInstance;
  } else {
    stackView = [[UIStackView alloc] init];
  }
  
  NSDictionary* style = [[component objectForKey:@"instance"] valueForKey:@"style"];
  NSString* axis = [[[component objectForKey:@"instance"] objectForKey:@"props"] valueForKey:@"axis"];
  NSString* spacing = [[[component objectForKey:@"instance"] objectForKey:@"props"] valueForKey:@"spacing"];
  NSString* distribution = [[[component objectForKey:@"instance"] objectForKey:@"props"] valueForKey:@"distribution"];
  NSString* alignment = [[[component objectForKey:@"instance"] objectForKey:@"props"] valueForKey:@"align"];
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
        NSDictionary* childStyle = [SyrStackView determineChildStyle:child];
        
        // don't count children moving into unmount into the calculation
        BOOL unmount = (BOOL)[child valueForKey:@"unmount"];
        if(!unmount) {
          NSNumber* height = [childStyle objectForKey:@"height"];
          totalHeight = [NSNumber numberWithDouble:[totalHeight doubleValue]+[height doubleValue]+[spacing doubleValue]];
        }

      }
    	CGRect frame = stackView.frame;
    	frame.size.height = [totalHeight doubleValue];
    	stackView.frame = frame;
    
    	// this is stupid and dumb work around
    	// we need a better notification to parents, to resize
    	if([stackView.superview isKindOfClass:[UIScrollView class]]) {
        UIScrollView* parent = (UIScrollView*)stackView.superview;
        double scrollheight = [totalHeight doubleValue] + 50;
        parent.contentSize = CGSizeMake(parent.frame.size.width, scrollheight);
    	}
  }
  
  return [SyrStyler styleView:stackView withStyle:style];
}

+(NSDictionary*) determineChildStyle: (NSDictionary*) child {
    NSDictionary* childStyle = [[child objectForKey:@"instance"] valueForKey:@"style"];
    if(childStyle != nil ){
        return childStyle;
    }
    return [SyrStackView determineChildStyle: [[child objectForKey:@"children"] objectAtIndex:0]];
}

@end
