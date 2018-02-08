//
//  SyrAnimatedView.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrAnimatedView.h"
#import "SyrView.h"

@implementation SyrAnimatedView

SYR_EXPORT_MODULE(AnimatedView)

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance  {
  return [SyrView render:component withInstance:componentInstance];
}

@end
