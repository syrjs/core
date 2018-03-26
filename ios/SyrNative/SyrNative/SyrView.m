//
//  SyrView.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/16/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrView.h"
#import "SyrStyler.h"

@implementation SyrView

SYR_EXPORT_MODULE(View)

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance {
    UIView* view;
    NSDictionary* style = [[component objectForKey:@"instance"] valueForKey:@"style"];
    
    // quick check to look for animated
    NSString* elementName = [component objectForKey:@"elementName"];
    if(componentInstance != nil) {
        view = (UIView*)componentInstance;
        if([elementName containsString:@"Animated"] == false){
            view.frame = [SyrStyler styleFrame:style];
        }
    } else {
        view = [[UIView alloc] init];
        view.frame = [SyrStyler styleFrame:style];
    }
    
    return [SyrStyler styleView:view withStyle:style];
}

@end
