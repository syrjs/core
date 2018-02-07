//
//  SyrAnimatedImage.m
//  SyrNative
//
//  Created by Anderson,Derek on 1/16/18.
//  Copyright © 2018 Anderson,Derek. All rights reserved.
//

#import "SyrAnimatedImage.h"
#import "SyrImage.h"

@implementation SyrAnimatedImage

SYR_EXPORT_MODULE(AnimatedImage)

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance {
  return [SyrImage render:component withInstance:componentInstance];
}

@end
