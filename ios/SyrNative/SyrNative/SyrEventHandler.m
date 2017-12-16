//
//  SyrEventHandler.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/16/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrEventHandler.h"

@interface SyrEventHandler()
@property NSMutableArray* eventDelegates;
@end

@implementation SyrEventDelegate
- (void) handleSingleTap:(id)sender {
  NSLog(@"touch, %@", _callbackId);
  NSDictionary* event = @{@"guid":_callbackId, @"type":@"onPress"};
  [_bridge sendEvent:event];
}
@end

@implementation SyrEventHandler

+ (id) sharedInstance {
  static SyrEventHandler *instance = nil;
  @synchronized(self) {
    if (instance == nil) {
      instance = [[self alloc] init];
      instance.eventDelegates = [[NSMutableArray alloc] init];
    }
  }
  return instance;
}

-(SyrEventDelegate*) assignDelegate:(NSString*)guid {
   SyrEventDelegate* delegate = [[SyrEventDelegate alloc] init];
  delegate.callbackId = guid;
  delegate.bridge = _bridge;
  [_eventDelegates addObject:delegate];
  return delegate;
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
