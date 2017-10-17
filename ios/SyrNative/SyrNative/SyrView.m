//
//  SyrView.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/16/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrView.h"
#import "SyrRaster.h"

#import <UIKit/UIKit.h>

@implementation SyrView

- (id) init
{
  self = [super init];
  if (self!=nil) {
    [[SyrRaster sharedInstance] registerComponent:self withName:@"View"];
  }
  return self;
}


@end
