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
  
  // EventEmitter.subscribe('foo', cb);
  
  // [self sendEventWithName:@"foo" body: @{@"foo":@"bar"};
  [[[SyrRaster sharedInstance] bridge] sendEvent:@{@"type":@"event", @"name": name, @"body": body}];
}

@end
