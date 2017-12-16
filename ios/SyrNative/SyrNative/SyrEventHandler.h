//
//  SyrEventHandler.h
//  SyrNative
//
//  Created by Anderson,Derek on 10/16/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SyrBridge.h"

@interface SyrEventDelegate : NSObject
@property NSString* callbackId;
@property SyrBridge* bridge;
@end

@interface SyrEventHandler : NSObject
@property SyrBridge* bridge;
+ (id) sharedInstance;
- (void)btnSelected:(id)sender;
- (SyrEventDelegate*) assignDelegate: (NSString*) guid;
@end
