//
//  SyrBundleManager.h
//  SyrNative
//
//  Created by Anderson,Derek on 12/14/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface SyrBundle: NSObject
  @property NSString* bundlePath;
@end

@interface SyrBundleManager : NSObject
- (id) initWithManifestServer:(NSString*) endpoint;
- (SyrBundle*) loadBundle: (NSString*) bundlePath;
@end
