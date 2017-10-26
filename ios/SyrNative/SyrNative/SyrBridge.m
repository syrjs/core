//
//  SyrBridge.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/5/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrBridge.h"
#import "SyrEventHandler.h"
#import "SyrRaster.h"
#import "SyrEventHandler.h"

@interface SyrBridge()
@property SyrEventHandler* eventHandler;
@property SyrRaster* raster;
@property WKWebView* bridgedBrowser;
@property SyrRootView* rootView;
@property NSMutableDictionary* instances;
@end

@implementation SyrBridge

- (id) init
{
  self = [super init];
  if (self!=nil) {
    _bridgedBrowser = [[NSMutableDictionary alloc] init];
    // setup a 0,0,0,0 wkwebview to use the jsbridge
    WKWebViewConfiguration *configuration = [[WKWebViewConfiguration alloc] init];
    WKUserContentController *controller = [[WKUserContentController alloc] init];
    // create a js bridge
    [controller addScriptMessageHandler:self name:@"SyrNative"];
    configuration.userContentController = controller;
    _bridgedBrowser = [[WKWebView alloc] initWithFrame:CGRectMake(0, 0, 0, 0) configuration:configuration];
    _bridgedBrowser.navigationDelegate = self;
    _eventHandler = [SyrEventHandler sharedInstance];
    _eventHandler.bridge = self;
    _raster = [SyrRaster sharedInstance];
    _raster.bridge = self;
  }
  return self;
}

- (void)buttonPressed:(UIButton *)button  {
  NSNumber* tagNumber = [NSNumber numberWithInt:button.tag];
  NSDictionary* event = @{@"tag":tagNumber, @"type":@"buttonPressed"};
  [self sendEvent:event];
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
- (void) loadBundle: (NSString*) withBundlePath withRootView: (SyrRootView*) rootView{
  
  NSLog(@"%@", _raster.nativemodules);
   _rootView = rootView;
  NSBundle* frameworkBundle = [NSBundle bundleForClass:[SyrBridge class]];
  NSString* syrBundlePath = [frameworkBundle pathForResource:@"SyrNative" ofType:@"bundle"];
  NSBundle* syrBundle = [NSBundle bundleWithPath:syrBundlePath];
  NSString* syrBridgePath = [syrBundle pathForResource:@"app" ofType:@"html"];
  NSURL* syrBridgeUrl = [NSURL fileURLWithPath:syrBridgePath];
  NSURLComponents *components = [NSURLComponents componentsWithURL:syrBridgeUrl resolvingAgainstBaseURL:syrBridgeUrl];
  

  NSMutableArray *queryItems = [NSMutableArray array];
  for (NSString *key in _raster.nativemodules) {
    [queryItems addObject:[NSURLQueryItem queryItemWithName:key value:_raster.nativemodules[key]]];
  }
  components.queryItems = queryItems;
  
  [_bridgedBrowser loadFileURL:components.URL allowingReadAccessToURL:components.URL];
}

- (void)userContentController:(WKUserContentController *)userContentController
      didReceiveScriptMessage:(WKScriptMessage *)message {
  NSDictionary* syrMessage = [message valueForKey:@"body"];
  NSString* messageType = [syrMessage valueForKey:@"type"];
  if([messageType containsString:@"event"]) {
    //
  } else if([messageType containsString:@"cmd"]) {
		// get the class
    NSString* className = [syrMessage valueForKey:@"class"];
    Class class = NSClassFromString(className);
    
    // create an instance of the object
    if(class != nil){
      [_instances setObject:class forKey:className];
    }
 
    //get render method
    NSString* selectorString = [syrMessage valueForKey:@"selector"];
    SEL methodSelector = NSSelectorFromString(selectorString);
    if ([class respondsToSelector:methodSelector]) {
    
      NSMethodSignature *methodSignature = [NSClassFromString(className) methodSignatureForSelector:methodSelector];
      //invoke render method, pass component
      NSInvocation *inv = [NSInvocation invocationWithMethodSignature:methodSignature];
    
      [inv setSelector:methodSelector];
      [inv setTarget:class];
      
      NSData *argsData = [[syrMessage valueForKey:@"args"] dataUsingEncoding:NSUTF8StringEncoding];
      NSError *error;
      //    Note that JSONObjectWithData will return either an NSDictionary or an NSArray, depending whether your JSON string represents an a dictionary or an array.
      id argsObject = [NSJSONSerialization JSONObjectWithData:argsData options:0 error:&error];
      int argsIndex = 2; // start at 2
      for(id arg in argsObject) {
        NSObject* argObj = [argsObject objectForKey:arg];
        [inv setArgument:&(argObj) atIndex:argsIndex];
        argsIndex = argsIndex + 1;
      }
      [inv invoke];
    }
    
  } else if([messageType containsString:@"gui"]) {
    [_raster parseAST:syrMessage withRootView:_rootView];
  } else if([messageType containsString:@"animation"]) {
    [_raster setupAnimation:syrMessage];
  }
}

- (void)webView:(WKWebView *)webView
didStartProvisionalNavigation:(WKNavigation *)navigation {
  NSLog(@"Loading Bundle");
  // bundle reloaded, remove all subviews from root view
  [_rootView.subviews makeObjectsPerformSelector:@selector(removeFromSuperview)];
}

- (void) sendEvent: (NSDictionary*) message {
  NSData *messageData = [NSJSONSerialization dataWithJSONObject:message
                                                     options:NSJSONWritingPrettyPrinted
                                                       error:nil];
  NSString *messageString = [[NSString alloc] initWithData:messageData encoding:NSUTF8StringEncoding];
  
  NSString* js = [NSString stringWithFormat:@"SyrEvents.emit(%@)", messageString];
  [_bridgedBrowser evaluateJavaScript:js completionHandler:^(id result, NSError *error) {
    if (error == nil)
    {
      
    }
    else
    {
      NSLog(@"evaluateJavaScript error : %@", error.localizedDescription);
    }
  }];
}

- (void) rasterRenderedComponent: (NSString*) withComponentId {
  NSDictionary* event = @{@"guid":withComponentId, @"type":@"componentDidMount"};
  [self sendEvent:event];
}

@end
