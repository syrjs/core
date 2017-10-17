//
//  SyrCore.h
//  SyrNative
//
//  Created by Anderson,Derek on 7/7/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SyrRootView.h"

@interface SyrCore : NSObject

- (void)runApp:(NSString*)withBundlePath rootView:(SyrRootView*)rootView ;

@end
