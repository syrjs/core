//
//  ViewController.m
//  SyrNativeSample
//
//  Created by Anderson,Derek on 8/22/17.
//  Copyright © 2017 PayPal. All rights reserved.
//

#import "ViewController.h"
#import <SyrNative/SyrNative.h>

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  
  // init rootView
  SyrRootView* rootView = [[SyrRootView alloc] initWithBundlePath:@"" initialProperties:@{@"foo": @"baz"}];
  rootView.frame = self.view.frame;
  
  // attach rootView
  [self.view addSubview:rootView];
}


- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

@end
