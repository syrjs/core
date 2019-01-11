//
//  SyrBundleManager.m
//  SyrNative
//
//  Created by Anderson,Derek on 12/14/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrBundleManager.h"

@implementation SyrBundle @end

@interface SyrBundleManager()
	@property NSString* manifestServerEndPoint;
	@property NSMutableArray* bundles;
@end

@implementation SyrBundleManager

- (id) init
{
  self = [super init];
  if (self!=nil) {

  }
  return self;
}

- (id) initWithManifestServer:(NSString*) endpoint {
  self = [self init];
  if (self)
  {
    _manifestServerEndPoint = endpoint;
  }
  return self;
}

- (SyrBundle*) loadBundle: (NSString*) bundlePath {
  SyrBundle* returnBundle = [[SyrBundle alloc] init];
  returnBundle.bundlePath = bundlePath;
  
  if([self isDevelopmentBundle:bundlePath]) {
    NSLog(@"Development protocol of HTTP found!");
  }
  
  return returnBundle;
}

- (BOOL) isDevelopmentBundle: (NSString*) bundlePath {
  return [bundlePath containsString:@"http"];
}

@end
