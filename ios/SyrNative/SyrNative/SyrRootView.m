//
//  SyrRootView.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/5/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrRootView.h"
#import "SyrCore.h"

@interface SyrRootView()
@property SyrCore* instance;
@end

@implementation SyrRootView

- (id) init
{
  self = [super init];
  if (self!=nil) {
  }
  return self;
}

- (id) initWithBundlePath: (NSString*) bundlePath {
  self = [super init];
  if (self)
  {
    self.instance = [[SyrCore alloc] init];
    [_instance runApp:bundlePath rootView:self];
  }
  return self;
}

@end
