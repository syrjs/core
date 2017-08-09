//
//  ViewController.m
//  MouseNativeSample
//
//  Created by Anderson,Derek on 7/6/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "ViewController.h"
#import <SyrNative/SyrNative.h>

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
	[super viewDidLoad];
	SyrPublic* syrpublic = [[SyrPublic alloc] init];
	[syrpublic runApp:self];

	// Do any additional setup after loading the view, typically from a nib.
}


- (void)didReceiveMemoryWarning {
	[super didReceiveMemoryWarning];
	// Dispose of any resources that can be recreated.
}


@end
