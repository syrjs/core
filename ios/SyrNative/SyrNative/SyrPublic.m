//
//  SyrPublic.m
//  SyrNative
//
//  Created by Anderson,Derek on 7/7/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SyrPublic.h"
#import "SyrCore.h"

@implementation SyrPublic

SyrCore* syrcore;

- (id) init
{
	self = [super init];
	if (self!=nil) {
		syrcore = [[SyrCore alloc] init];
	}
	return self;
}

-(void)runApp: (UIViewController*) viewController {
	[syrcore runApp: viewController];
}

@end
