//
//  SyrBridge.h
//  SyrNative
//
//  Created by Anderson,Derek on 10/5/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WebKit/WebKit.h>
#import "SyrRootView.h"

@interface SyrBridge : NSObject <WKScriptMessageHandler, WKNavigationDelegate>
@property (nonatomic)  NSString* resourceBundlePath;
- (void) loadBundle: (NSString*) withBundlePath withRootView: (SyrRootView*) rootView;
- (void) rasterRenderedComponent: (NSString*) withComponentId;
- (void) rasterRemovedComponent: (NSString*) withComponentId;
- (void) sendEvent: (NSDictionary*) message;
@end
