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
@property NSDictionary* props;
@end

@implementation SyrRootView

- (id) init
{
  self = [super init];
  if (self!=nil) {
  }
  return self;
}

- (NSDictionary*)appProperties {
  return _props;
}

- (void)setAppProperties:(NSDictionary *)passedProps{
  _props = passedProps;
}

/**
 this view holds the Syr rendering
 */
- (id) initWithBundlePath:(NSString*)bundlePath initialProperties:(NSDictionary*)initialProps {
  self = [super init];
  if (self)
  {
    self.instance = [[SyrCore alloc] init];
    self.props = initialProps;
    [_instance runApp:bundlePath rootView:self];
  }
  return self;
}

@end
