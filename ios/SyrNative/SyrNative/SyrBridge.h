//
//  SyrBridge.h
//  SyrNative
//
//  Created by Anderson,Derek on 10/5/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WebKit/WebKit.h>

@interface SyrBridge : NSObject <WKScriptMessageHandler>
- (void) loadBundle: (NSString*) withBundlePath;
@end
