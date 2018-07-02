//
//  SyrSwitch.m
//  SyrNative
//
//  Created by Chen, Sherman on 3/7/18.
//  Copyright © 2018 Anderson,Derek. All rights reserved.
//

#import "SyrSwitch.h"
#import "SyrStyler.h"
#import "SyrEventHandler.h"

@implementation SyrSwitch

SYR_EXPORT_MODULE(Switch)

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance {
    UISwitch* iSwitch;
    NSDictionary* instance = [component objectForKey:@"instance"];
    NSString* guid = [instance valueForKey:@"uuid"];
    NSDictionary* props = [instance objectForKey:@"props"];
    NSDictionary* style = [instance valueForKey:@"style"];
    NSString* onTintColor = [props valueForKey:@"onTintColor"];
    NSString* tintColor = [props valueForKey:@"tintColor"];
    BOOL value = [[props objectForKey:@"value"] boolValue];
    BOOL isDisabled = [[props objectForKey:@"isDisabled"] boolValue];
    
    // (re)init switch
    if (componentInstance != nil) {
        iSwitch = (UISwitch*) componentInstance;
    } else {
        iSwitch = [[UISwitch alloc] init];
        SyrEventDelegate* eventHandler = [[SyrEventHandler sharedInstance] assignDelegate:guid];
        SEL selector = NSSelectorFromString(@"handleValueChange:");
        [iSwitch addTarget:eventHandler action:selector forControlEvents:UIControlEventValueChanged];
    }
    
    // set style, just positioning for the frame atm, considering add transforms prop to transform the actual height and width of UISwitch
    iSwitch.frame = [SyrStyler styleFrame:style];
    
    // customize switch UI on/off tint colors
    if (onTintColor != nil) {
            iSwitch.onTintColor = [SyrStyler colorFromHash: onTintColor];
    }
    
    if (tintColor != nil) {
        iSwitch.tintColor = [SyrStyler colorFromHash: tintColor];
    }
    
    // set switch on / off default is off
    if (value == YES) {
        iSwitch.on = YES;
    }
    
    // enable or disable switch default is enabled
    if (isDisabled == YES) {
        iSwitch.enabled = NO;
    }
    
    return [SyrStyler styleView:iSwitch withStyle:style];
}

@end
