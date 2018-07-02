//
//  SyrButton.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrButton.h"
#import "SyrEventHandler.h"
#import "SyrStyler.h"
#import "SyrHapticHelper.h"

@interface SyrButtonView : UIButton
@property NSString* feedbackType;
@end

@implementation SyrButtonView
- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event {
    [SyrHapticHelper generateFeedback:_feedbackType];
    [UIView animateWithDuration:0.15 animations:^{
        self.alpha = 0.5;
    }];
}

- (void)touchesEnded:(NSSet *)touches withEvent:(UIEvent *)event {
    [UIView animateWithDuration:0.15 animations:^{
        self.alpha = 1.0;
    }];
}
@end

@implementation SyrButton

SYR_EXPORT_MODULE(Button)

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance  {
  SyrButtonView *button;
  NSString* guid = [[component objectForKey:@"instance"] valueForKey:@"uuid"];
  
  if(componentInstance != nil) {
    button = (SyrButtonView*)componentInstance;
  } else {
    button = [[SyrButtonView alloc] init];
    SEL selector = NSSelectorFromString(@"handleSingleTap:");
    //[button addTarget:[[SyrEventHandler sharedInstance] assignDelegate:guid] action:selector forControlEvents:UIControlEventTouchUpInside];
      
      //@TODO: going the touchable opacity route for now. Will need to come back and look at how to do this on a UIButton without subClassing it.
    SyrEventDelegate* eventHandler = [[SyrEventHandler sharedInstance] assignDelegate:guid];
    UITapGestureRecognizer *singleFingerTap = [[UITapGestureRecognizer alloc] initWithTarget:eventHandler action:selector];
    singleFingerTap.cancelsTouchesInView = NO;
    [button addGestureRecognizer:singleFingerTap];
  }
  
  NSDictionary* style = [[component objectForKey:@"instance"] valueForKey:@"style"];
  NSDictionary* props = [[component objectForKey:@"instance"] valueForKey:@"props"];
  NSString* buttonTitle =  [[component objectForKey:@"instance"] valueForKey:@"value"];
  
	// default to button enabled
  id isEnabled = [[[component objectForKey:@"instance"] objectForKey:@"props"] objectForKey:@"enabled"];
  if(isEnabled != nil) {
    if([isEnabled boolValue] == NO) {
      button.enabled = false;
    }
  }
    
    NSString* hapticFeedbackType = [props objectForKey:@"hapticFeedbackType"];
    if(hapticFeedbackType != nil) {
        button.feedbackType = hapticFeedbackType;
    }
  
  NSString* titleColor = [style valueForKey:@"color"];
  if(titleColor != nil) {
    [button setTitleColor:[SyrStyler colorFromHash:titleColor] forState:UIControlStateNormal];
  }
  
  [button setTitle:buttonTitle forState:UIControlStateNormal];
  button.frame = [SyrStyler styleFrame:style];
  
  NSNumber* fontSize = [style valueForKey:@"fontSize"];
  if(fontSize != nil) {
   button.titleLabel.font = [UIFont boldSystemFontOfSize:[fontSize doubleValue]];
  }

  //[button sizeToFit];
  NSNumber* tag = [[component valueForKey:@"instance"] valueForKey:@"tag"];
  button.tag = [tag integerValue];
  
  // Add an action in current code file (i.e. target)
  return (UIButton*)[SyrStyler styleView:button withStyle:style];
}

@end
