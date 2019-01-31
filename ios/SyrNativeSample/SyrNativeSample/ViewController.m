//
//  ViewController.m
//  SyrNativeSample
//
//  Created by Anderson,Derek on 8/22/17.
//  Copyright © 2017 PayPal. All rights reserved.
//

#import "ViewController.h"
#import <SyrNative/SyrNative.h>
#import <SyrNative/SyrBundleManager.h>

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  
  SyrBundleManager* bundleManager = [[SyrBundleManager alloc] initWithManifestServer:@""];
  SyrBundle* myBundle = [bundleManager loadBundle:@"http://localhost:8080"];
  
  // init rootView
  SyrRootView* rootView = [[SyrRootView alloc] initWithBundlePath:[myBundle bundlePath] initialProperties:@{@"foo": @"baz"}];
  rootView.frame = self.view.frame;
  
  // attach rootView
  [self.view addSubview:rootView];
}


- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

@end
