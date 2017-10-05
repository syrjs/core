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
  
  SyrRootView* rootView = [[SyrRootView alloc] initWithBundlePath:@""];
}


- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

@end
