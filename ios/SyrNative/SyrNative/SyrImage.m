//
//  SyrImage.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrImage.h"

@implementation SyrImage

+(NSObject*) render: (NSDictionary*) component {
  NSString* source = [[[[component objectForKey:@"instance"] objectForKey:@"props"] valueForKey:@"source"]  valueForKey:@"uri"];
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"props"] valueForKey:@"style"];
  UIImage* image = [UIImage imageNamed:source];
  UIImageView* imageHolder = [[UIImageView alloc] initWithImage:image];
  imageHolder.frame = [self styleFrame:style];
  return imageHolder;
}

@end
