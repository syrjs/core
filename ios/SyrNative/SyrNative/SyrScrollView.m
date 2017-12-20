//
//  SyrScrollView.m
//  SyrNative
//
//  Created by Anderson,Derek on 10/28/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrScrollView.h"
#import "SyrStyler.h"

@implementation SyrScrollView


+(NSObject*) render: (NSDictionary*) component withInstance: (NSObject*) componentInstance  {
	UIScrollView *scrollView = [[UIScrollView alloc] init];
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
  scrollView.frame = [SyrStyler styleFrame:style];
  
  // determine how big the content frame should be.
  NSNumber* farthestY = [NSNumber numberWithInt:0];
  NSNumber* farthestHeight = [NSNumber numberWithInt:0];
  for(id child in [component objectForKey:@"children"]){
    NSDictionary* childStyle = [[[child objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
    NSNumber* y = [childStyle objectForKey:@"top"];
    NSNumber* height = [childStyle objectForKey:@"height"];
    if(y > farthestY) {
      farthestY = y;
      farthestHeight = [NSNumber numberWithDouble:[height doubleValue]+[farthestY doubleValue]];
    } else {
      farthestHeight = [NSNumber numberWithDouble:[height doubleValue]];
    }
  }
  
  if(farthestHeight < [style objectForKey:@"height"]) {
    farthestHeight = [style objectForKey:@"height"];
  }
  
  scrollView.contentSize = CGSizeMake(scrollView.frame.size.width,[farthestHeight doubleValue]);
  return scrollView;
}


@end
