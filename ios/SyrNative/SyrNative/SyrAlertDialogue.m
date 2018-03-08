//
//  SyrAlertDialogue.m
//  SyrNative
//
//  Created by Malkireddy, Siddharth on 3/7/18.
//  Copyright © 2018 Anderson,Derek. All rights reserved.
//

//
//  SyrTextView.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrAlertDialogue.h"
#import "ViewHandler.h"


@implementation SyrAlertDialogue

SYR_EXPORT_MODULE(AlertDialogue)

SYR_EXPORT_METHOD(alert){
    UIAlertController* alert;
         alert = [UIAlertController alertControllerWithTitle:@"Logout" message:@"Are you sure you want to logout?" preferredStyle:UIAlertControllerStyleAlert];

    UIAlertAction* yesButton = [UIAlertAction
                                actionWithTitle:@"Yes, please"
                                style:UIAlertActionStyleDefault
                                handler:^(UIAlertAction * action) {
                                    //Handle your yes please button action here
                                }];
    UIAlertAction* noButton = [UIAlertAction
                               actionWithTitle:@"No, thanks"
                               style:UIAlertActionStyleDefault
                               handler:^(UIAlertAction * action) {
                                   //Handle no, thanks button
                               }];

    [alert addAction:yesButton];
    [alert addAction:noButton];
    
    UIViewController* topMostViewController = [ViewHandler topMostController];
    
    [topMostViewController presentViewController:alert animated:YES completion:nil];
}

@end
