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
#import "sys/utsname.h"

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
    _bridgedBrowser = [[WKWebView alloc] init];
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

- (id) initWithRootView: (SyrRootView*) rootView {
  self = [super init];
  if (self)
  {
    self.rootView = rootView;
    [self addView];
  }
  return self;
}

- (void)buttonPressed:(UIButton *)button  {
  NSNumber* tagNumber = [NSNumber numberWithDouble:button.tag];
  NSDictionary* event = @{@"tag":tagNumber, @"type":@"buttonPressed"};
  [self sendEvent:event];
}

- (void) addView {
  // create a root view
  [_rootView addSubview:_bridgedBrowser];
}

/**
 load the javascript bundle.
 we use an html fixture to aid in loading
 
 we pass as query the native modules available
 and envrionment info
 */
- (void) loadBundle: (NSString*) withBundlePath withRootView: (SyrRootView*) rootView{
  
  // load a bundle with the root view we were handed
  // todo multiplex bridge : multiple apps, one instance
   _rootView = rootView;
  
  // todo: lets abstract this out to the bundle manager
  NSBundle* frameworkBundle = [NSBundle bundleForClass:[SyrBridge class]];
  NSString* syrBundlePath = [frameworkBundle pathForResource:@"SyrNative" ofType:@"bundle"];
  NSBundle* syrBundle = [NSBundle bundleWithPath:syrBundlePath];
  NSString* syrBridgePath = [syrBundle pathForResource:@"app" ofType:@"html"];
  
  [_bridgedBrowser.configuration.preferences setValue:@TRUE forKey:@"allowFileAccessFromFileURLs"];

#if DEBUG
  NSURL* syrBridgeUrl = [NSURL URLWithString:@"http://192.168.2.4:8080"];
#else
  NSBundle* mainBundle = [NSBundle mainBundle];
  NSString* pyplBundlePath = [mainBundle pathForResource:@"PYPLCheckout" ofType:@"bundle"];
  NSBundle* pyplBundle = [NSBundle bundleWithPath:pyplBundlePath];
  NSString* filePath = [pyplBundle pathForResource:@"syrBundle" ofType:@"html"];
  NSURL* syrBridgeUrl = [NSURL fileURLWithPath:filePath];
#endif

  NSURLComponents *components = [NSURLComponents componentsWithURL:syrBridgeUrl resolvingAgainstBaseURL:syrBridgeUrl];
  NSMutableArray* exportedMethods = [[NSMutableArray alloc] init];
  
  // pass native module names and selectors to the javascript side
  NSMutableArray *queryItems = [NSMutableArray array];
  for (NSString *key in _raster.nativemodules) {
    NSString *new = [key stringByReplacingOccurrencesOfString: @"__syr_export__" withString:@"_"];
    [exportedMethods addObject:new];
  }
  
  // setup some environment stuff for the interpreter
  NSNumber* width = [NSNumber numberWithDouble:[UIScreen mainScreen].bounds.size.width];
  NSNumber* height = [NSNumber numberWithDouble:[UIScreen mainScreen].bounds.size.height];
  NSDictionary* bootupProps = [rootView appProperties];
  
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:bootupProps
                                                     options:NSJSONWritingPrettyPrinted
                                                       error:nil];

  NSData *jsonExportedMethodsData = [NSJSONSerialization dataWithJSONObject:exportedMethods
                                                     options:NSJSONWritingPrettyPrinted
                                                       error:nil];
  
  NSString* uriStringExportedMethods = [[NSString alloc] initWithData:jsonExportedMethodsData encoding:NSUTF8StringEncoding];
  NSString* uriStringBootupProps = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  
  CGFloat screenScale = [[UIScreen mainScreen] scale];
  NSNumber* screenScaleNS = [NSNumber numberWithFloat:screenScale];
  
  [queryItems addObject:[NSURLQueryItem queryItemWithName:@"initial_props" value:uriStringBootupProps]];
  [queryItems addObject:[NSURLQueryItem queryItemWithName:@"window_width" value:[width stringValue]]];
  [queryItems addObject:[NSURLQueryItem queryItemWithName:@"window_height" value:[height stringValue]]];
  [queryItems addObject:[NSURLQueryItem queryItemWithName:@"screen_density" value:[screenScaleNS stringValue]]];
  [queryItems addObject:[NSURLQueryItem queryItemWithName:@"platform" value:@"ios"]];
  [queryItems addObject:[NSURLQueryItem queryItemWithName:@"platform_version" value:[[UIDevice currentDevice] systemVersion]]];
  [queryItems addObject:[NSURLQueryItem queryItemWithName:@"exported_methods" value:uriStringExportedMethods]];
  [queryItems addObject:[NSURLQueryItem queryItemWithName:@"model" value:[self deviceName]]];
  
  components.queryItems = queryItems;
  NSURLRequest * req = [NSURLRequest requestWithURL:components.URL];
  [_bridgedBrowser loadRequest:req]; //[_bridgedBrowser loadFileURL:components.URL allowingReadAccessToURL:components.URL];
  
  [NSTimer scheduledTimerWithTimeInterval:2.0
                                   target:self
                                 selector:@selector(heartBeat)
                                 userInfo:nil
                                  repeats:YES];
}


- (void) heartBeat {
  NSString* js = [NSString stringWithFormat:@""];
  
  // dispatching on the bridge to wkwebview needs to be done on the main thread
  dispatch_async(dispatch_get_main_queue(), ^{
    [_bridgedBrowser evaluateJavaScript:js completionHandler:^(id result, NSError *error) {
      if (error == nil)
      {
        // do something with JS returns here
      }
      else
      {
        NSLog(@"evaluateJavaScript error : %@", error.localizedDescription);
      }
    }];
  });
}

/**
	the bridge sending a message for us to act on
 */
- (void)userContentController:(WKUserContentController *)userContentController
      didReceiveScriptMessage:(WKScriptMessage *)message {
  
  NSDictionary* syrMessage = [message valueForKey:@"body"];
  NSString* messageType = [syrMessage valueForKey:@"type"];
  if([messageType containsString:@"cmd"]) {
    
    // keep messaging on the async queue
    [self invokeMethodWithMessage:syrMessage];
  } else if([messageType containsString:@"gui"]) {
    
    //updating the UI needs to be done on the main thread
    dispatch_async(dispatch_get_main_queue(), ^{
       [_raster parseAST:syrMessage withRootView:_rootView];
    });
   
  } else if([messageType containsString:@"animation"]) {
    
    // animations define the thread they are on
    [_raster setupAnimation:syrMessage];
  } else if([messageType containsString:@"error"]) {
    [_raster showInfoMessage:syrMessage withRootView:_rootView];
  }
}

/**
 Invoke a class method from the signature we are given.
 assume the data types, and use NSObject to pass them through
 */
- (void)invokeMethodWithMessage: (NSDictionary*) syrMessage {
  
  NSData *objectData = [[syrMessage valueForKey:@"ast"] dataUsingEncoding:NSUTF8StringEncoding];
  NSDictionary *astDict = [NSJSONSerialization JSONObjectWithData:objectData
                                                          options:NSJSONReadingMutableContainers
                                                            error:nil];
  
  // get the class
  NSString* className = [_raster.registeredClasses valueForKey:[astDict valueForKey:@"clazz"]];
  Class class = NSClassFromString(className);
  
  // create an instance of the object
  if(class != nil){
    [_instances setObject:class forKey:className];
  }
  
  //get render method
  NSString* selectorString = [NSString stringWithFormat:@"__syr_export__%@", [astDict valueForKey:@"method"]];
  SEL methodSelector = NSSelectorFromString(selectorString);
  if ([class respondsToSelector:methodSelector]) {
    
    NSMethodSignature *methodSignature = [NSClassFromString(className) methodSignatureForSelector:methodSelector];
    //invoke render method, pass component
    NSInvocation *inv = [NSInvocation invocationWithMethodSignature:methodSignature];
    
    [inv setSelector:methodSelector];
    [inv setTarget:class];
    
    NSData *argsData = [[astDict valueForKey:@"args"] dataUsingEncoding:NSUTF8StringEncoding];
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
}

/**
 if the page is refreshed, we need to thrash the render
 todo - ensure this isn't leaking
 */
- (void)webView:(WKWebView *)webView
didStartProvisionalNavigation:(WKNavigation *)navigation {
  NSLog(@"Loading Bundle");
  // bundle reloaded, remove all subviews from root view
  [_rootView.subviews makeObjectsPerformSelector:@selector(removeFromSuperview)];
}

/**
 send an event to through the bridge to the javascript side.
 todo - handle errors
 */
- (void) sendEvent: (NSDictionary*) message {
  // send events on an async queue
  dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0ul);
  dispatch_async(queue, ^{
    NSData *messageData = [NSJSONSerialization dataWithJSONObject:message
                                                          options:NSJSONWritingPrettyPrinted
                                                            error:nil];
    NSString *messageString = [[NSString alloc] initWithData:messageData encoding:NSUTF8StringEncoding];
    NSString* js = [NSString stringWithFormat:@"SyrEvents.emit(%@)", messageString];
    
    // dispatching on the bridge to wkwebview needs to be done on the main thread
    dispatch_async(dispatch_get_main_queue(), ^{
      [_bridgedBrowser evaluateJavaScript:js completionHandler:^(id result, NSError *error) {
        if (error == nil)
        {
          // do something with JS returns here
        }
        else
        {
          NSLog(@"evaluateJavaScript error : %@", error.localizedDescription);
        }
      }];
    });
  });
}

- (void)webView:(WKWebView *)webView
didFailProvisionalNavigation:(WKNavigation *)navigation
      withError:(NSError *)error {
  NSLog(@"error");
}

/**
 delegate method for the raster to invoke when it has added the UI component to a parent
 */
- (void) rasterRenderedComponent: (NSString*) withComponentId {
  NSDictionary* event = @{@"guid":withComponentId, @"type":@"componentDidMount"};
  [self sendEvent:event];
}

- (void) rasterRemovedComponent: (NSString*) withComponentId {
  NSDictionary* event = @{@"guid":withComponentId, @"type":@"componentWillUnmount"};
  [self sendEvent:event];
}

- (NSString*) deviceName
{
    struct utsname systemInfo;
    uname(&systemInfo);
    
    return [NSString stringWithCString:systemInfo.machine
                              encoding:NSUTF8StringEncoding];
}

@end
