//
//  SyrAnimatedText.m
//  SyrNative
//
//  Created by Anderson,Derek on 1/16/18.
//  Copyright © 2018 Anderson,Derek. All rights reserved.
//

#import "SyrAnimatedText.h"
#import "SyrText.h"

@implementation SyrAnimatedText

SYR_EXPORT_MODULE(AnimatedText)

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance {
  return [SyrText render:component withInstance:componentInstance];
}

@end
