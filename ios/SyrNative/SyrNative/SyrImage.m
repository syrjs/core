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

+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance {
  
  NSString* source = [[[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"source"]  valueForKey:@"uri"];
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
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
