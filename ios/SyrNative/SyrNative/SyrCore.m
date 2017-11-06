//
//  SyrCore.m
//  SyrNative
//
//  Created by Anderson,Derek on 7/7/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrCore.h"
#import "SyrBridge.h"

@interface SyrCore()
@property SyrBridge* bridge;
@end

@implementation SyrCore

- (id) init
{
	self = [super init];
	if (self!=nil) {
    _bridge = [[SyrBridge alloc] init];
	}
	return self;
}

/**
 run a syr app
 */
- (void)runApp:(NSString*)withBundlePath rootView:(SyrRootView*)rootView {
  
  NSLog(@"Starting Syr Native Application");
  return [_bridge loadBundle:withBundlePath withRootView:rootView];
}


@end
