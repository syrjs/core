//
//  SyrComponent.h
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//
#import "SyrRaster.h"
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#define SYR_CONCAT2(A, B) A ## B
#define SYR_CONCAT(A, B) SYR_CONCAT2(A, B)

// tell syr to register a native class
#define SYR_EXPORT_MODULE(name) \
+ (void)load { [[SyrRaster sharedInstance] registerComponent:NSStringFromClass([self class]) withName:@#name]; }

// tell syr how to find native class methods to send to JavaScript
#define SYR_EXPORT_METHOD(method) \
+ (void)SYR_CONCAT(__syr_export__, method)

@interface SyrComponent : NSObject
+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance;
+(void) sendEventWithName:(NSString*)name body:(NSDictionary*) body;
@end
