//
//  SyrComponent.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrComponent.h"

@implementation SyrComponent

+(void) sendEventWithName:(NSString*)name body:(NSDictionary*) body {
  [[[SyrRaster sharedInstance] bridge] sendEvent:@{@"type":@"event", @"name": name, @"body": body}];
}

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance {
  return [[UIView alloc] init];
}

@end
