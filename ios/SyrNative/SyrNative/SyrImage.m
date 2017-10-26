//
//  SyrImage.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrImage.h"

@implementation SyrImage

SYR_EXPORT_MODULE();

SYR_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  NSLog(@"some stuff");
}


+(NSObject*) render: (NSDictionary*) component {
  NSString* source = [[[[component objectForKey:@"instance"] objectForKey:@"props"] valueForKey:@"source"]  valueForKey:@"uri"];
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"props"] valueForKey:@"style"];
  UIImage* image = [UIImage imageNamed:source];
  UIImageView* imageHolder = [[UIImageView alloc] initWithImage:image];
  imageHolder.frame = [SyrImage styleFrame:style];
  return imageHolder;
}

@end
