//
//  SyrAlertDialogue.m
//  SyrNative
//
//  Created by Malkireddy, Siddharth on 3/7/18.
//  Copyright © 2018 Anderson,Derek. All rights reserved.
//

#import "SyrAlertDialogue.h"
#import "SyrViewHandler.h"


@implementation SyrAlertDialogue

SYR_EXPORT_MODULE(SyrAlertDialogue)

SYR_EXPORT_METHOD(alert:(NSString*)title message:(NSString*)message actions:(NSArray*)actions){
    UIAlertController* alert;
         alert = [UIAlertController alertControllerWithTitle:title message:message preferredStyle:UIAlertControllerStyleAlert];
    
    for(id action in actions) {
        [alert addAction:[UIAlertAction
                          actionWithTitle:[action valueForKey:@"title"]
                          style:UIAlertActionStyleDefault
                          handler:^(UIAlertAction * action) {
                              [self sendEventWithName:@"alertDialogue" body:[action valueForKey:@"title"]];
                          }]];
    }
    
    UIViewController* topMostViewController = [SyrViewHandler topMostController];
    
    [topMostViewController presentViewController:alert animated:YES completion:nil];
}

@end
