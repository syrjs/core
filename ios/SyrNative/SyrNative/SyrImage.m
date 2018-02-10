//
//  SyrImage.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/20/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrImage.h"
#import "SyrStyler.h"

@implementation SyrImage

SYR_EXPORT_MODULE(Image)

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance {
  
  NSString* source = [[[[component objectForKey:@"instance"] objectForKey:@"props"] valueForKey:@"source"]  valueForKey:@"uri"];
  NSDictionary* style = [[component objectForKey:@"instance"] valueForKey:@"style"];
  UIImage* image = [UIImage imageNamed:source];
  UIImageView* imageHolder;
  
  if(componentInstance != nil) {
    imageHolder = (UIImageView*)componentInstance;
    [imageHolder setImage:image];
  } else {
    imageHolder = [[UIImageView alloc] initWithImage:image];
  }
  

  imageHolder.frame = [SyrStyler styleFrame:style];
  return imageHolder;
}

@end
