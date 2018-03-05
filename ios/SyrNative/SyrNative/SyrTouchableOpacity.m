//
//  SyrTouchableOpacity.m
//  SyrNative
//
//  Created by Anderson,Derek on 12/15/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrTouchableOpacity.h"
#import "SyrStyler.h"

@interface SyrTouchableOpacityView : UIView

@end

@implementation SyrTouchableOpacityView
- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event {
  [UIView animateWithDuration:0.25 animations:^{
    self.alpha = 0.2;
  }];
}

- (void)touchesEnded:(NSSet *)touches withEvent:(UIEvent *)event {
  [UIView animateWithDuration:0.25 animations:^{
    self.alpha = 1.0;
  }];
}
@end

@implementation SyrTouchableOpacity

SYR_EXPORT_MODULE(TouchableOpacity)

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance  {
  UIView* view;
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
      view = [[SyrTouchableOpacityView alloc] init];
      view.frame = [SyrStyler styleFrame:style];
      
      // Setup Tap Code
      SyrEventHandler* eventHandler = [[SyrEventHandler sharedInstance] assignDelegate:guid];
      SEL selector = NSSelectorFromString(@"handleSingleTap:");
      UITapGestureRecognizer *singleFingerTap = [[UITapGestureRecognizer alloc] initWithTarget:eventHandler action:selector];
      singleFingerTap.cancelsTouchesInView = NO;
      [view addGestureRecognizer:singleFingerTap];
    }

  return [SyrStyler styleView:view withStyle:style];
}



@end
