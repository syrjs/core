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
  scrollView.contentSize = CGSizeMake(320,800);
  NSDictionary* style = [[[component objectForKey:@"instance"] objectForKey:@"attributes"] valueForKey:@"style"];
  scrollView.frame = [SyrStyler styleFrame:style];
  return scrollView;
}


@end
