//
//  SyrEventHandler.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/16/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrEventHandler.h"

@implementation SyrEventHandler

+ (id) sharedInstance {
  static SyrEventHandler *instance = nil;
  @synchronized(self) {
    if (instance == nil) {
      instance = [[self alloc] init];
    }
  }
  return instance;
}

/** 
 Handles the clicks for native buttons to respond to clicks on the bridge
 likely should be in SyrButton
 todo : move to syr button
 */
- (void) btnSelected:(id)sender {
  NSNumber* tagNumber = [NSNumber numberWithInt:[sender tag]];
  NSDictionary* event = @{@"tag":tagNumber, @"type":@"buttonPressed"};
  [_bridge sendEvent:event];
}

@end
