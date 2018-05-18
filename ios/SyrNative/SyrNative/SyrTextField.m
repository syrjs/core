//
//  SyrTextField.m
//  SyrNative
//
//  Created by Syed,hassan on 4/12/18.
//  Copyright © 2018 Anderson,Derek. All rights reserved.
//

#import "SyrTextField.h"
#import "SyrEventHandler.h"

@implementation SyrTextField

SYR_EXPORT_MODULE(TextArea)

+(instancetype)sharedInstance {
    static SyrTextField *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];
    });
    return sharedInstance;
}

+(NSObject *)render:(NSDictionary *)component withInstance:(NSObject *)componentInstance {
    
    NSDictionary* style = [[component objectForKey:@"instance"] valueForKey:@"style"];
    
    UITextField *textField = [[UITextField alloc] initWithFrame:[SyrStyler styleFrame:style]];
    
    textField.delegate = SyrTextField.sharedInstance;
    
    textField.textColor = [SyrStyler colorFromHash:[style objectForKey:@"color"]];
    
    textField.placeholder = [[component objectForKey:@"attributes"] objectForKey:@"placeholder"];
    
    return [SyrStyler styleView:textField withStyle:style];
}

-(void)textFieldDidEndEditing:(UITextField *)textField reason:(UITextFieldDidEndEditingReason)reason {
    
    if(reason == UITextFieldDidEndEditingReasonCommitted) {
        [SyrTextField sendEventWithName:@"textAreaDidFinishEditing" body:@{@"text":textField.text,@"reason":@"committed"}];
    } else {
        [SyrTextField sendEventWithName:@"textAreaDidFinishEditing" body:@{@"text":textField.text,@"reason":@"cancelled"}];
    }
    
}

-(void)textFieldDidBeginEditing:(UITextField *)textField {
    [SyrTextField sendEventWithName:@"textAreaBeganEditing" body:@{}];
}

-(BOOL)textFieldShouldReturn:(UITextField *)textField {
    [SyrTextField sendEventWithName:@"textAreaProcessingReturn" body:@{@"text":textField.text}];
    [textField resignFirstResponder];
    return true;
}

-(BOOL)textFieldShouldClear:(UITextField *)textField {
    [SyrTextField sendEventWithName:@"textAreaClearingText" body:@{@"text":textField.text}];
    return true;
}


@end
