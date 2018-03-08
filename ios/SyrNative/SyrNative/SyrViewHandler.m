//
//  ViewHandler.m
//  SyrNative
//
//  Created by Malkireddy, Siddharth on 3/7/18.
//  Copyright © 2018 Anderson,Derek. All rights reserved.
//

#import "SyrViewHandler.h"

@implementation SyrViewHandler
+ (UIViewController*) topMostController {
    
    // http://pinkstone.co.uk/how-to-avoid-whose-view-is-not-in-the-window-hierarchy-error-when-presenting-a-uiviewcontroller/
    
    UIViewController *topController = [UIApplication sharedApplication].keyWindow.rootViewController;
    while (topController.presentedViewController) {
        topController = topController.presentedViewController;
    }
    
    return topController;
}
@end

