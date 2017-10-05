//
//  SyrBridge.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/5/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrBridge.h"
#import "SyrRootView.h"

@interface SyrBridge()
@property WKWebView* bridgedBrowser;
@property SyrRootView* rootView;
@end

@implementation SyrBridge

- (id) init
{
  self = [super init];
  if (self!=nil) {
    // setup a 0,0,0,0 wkwebview to use the jsbridge
    WKWebViewConfiguration *configuration = [[WKWebViewConfiguration alloc] init];
    WKUserContentController *controller = [[WKUserContentController alloc] init];
    // create a js bridge
    [controller addScriptMessageHandler:self name:@"SyrNative"];
    configuration.userContentController = controller;
    _bridgedBrowser = [[WKWebView alloc] initWithFrame:CGRectMake(0, 0, 0, 0) configuration:configuration];
  }
  return self;
}

- (id) initWithRootView: (SyrRootView*) rootView {
  self = [super init];
  if (self)
  {
    self.rootView = rootView;
    [self addView];
  }
  return self;
}
- (void) addView {
  // create a root view
  [_rootView addSubview:_bridgedBrowser];
}
- (void) loadBundle: (NSString*) withBundlePath {
  NSLog(@"Loading Bundle");
  // pointing at the dev server for now
  NSURL *nsurl=[NSURL URLWithString:@"http://127.0.0.1:8080/?sds"];
  NSURLRequest *nsrequest=[NSURLRequest requestWithURL:nsurl];
  [_bridgedBrowser loadRequest:nsrequest];
}

- (void)userContentController:(WKUserContentController *)userContentController
      didReceiveScriptMessage:(WKScriptMessage *)message {
  NSDictionary* syrMessage = [message valueForKey:@"body"];
}

@end
