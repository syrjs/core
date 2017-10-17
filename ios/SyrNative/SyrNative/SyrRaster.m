//
//  MouseRaster.m
//  MouseNative
//
//  Created by Anderson,Derek on 7/8/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrRaster.h"

#import <UIKit/UIKit.h>

@interface SyrRaster()

@property UIView* rootView;
@property NSMutableDictionary* components;

@end

@implementation SyrRaster

+ (id) sharedInstance {
  static SyrRaster *instance = nil;
  @synchronized(self) {
    if (instance == nil) {
      instance = [[self alloc] init];
    }
  }
  return instance;
}


- (id) init
{
  self = [super init];
  if (self!=nil) {
    _components = [[NSMutableDictionary alloc] init];
  }
  return self;
}


-(void) parseAST: (NSDictionary*) astString withRootView: (SyrRootView*) rootView {

  NSError *jsonError;
  NSData *objectData = [[astString valueForKey:@"ast"] dataUsingEncoding:NSUTF8StringEncoding];
  NSDictionary *astDict = [NSJSONSerialization JSONObjectWithData:objectData
                                                       options:NSJSONReadingMutableContainers
                                                         error:&jsonError];
  
  _rootView = rootView;
 	[self build: astDict];
}

-(void) build: (NSDictionary*) astDict {
  NSString* elementName = [astDict objectForKey:@"elementName"];
  if([elementName containsString:@"View"]) {
    UIView* view = [_components objectForKey:[[astDict valueForKey:@"instance"] valueForKey:@"guid"]];
    if(view == nil) {
      view = [[UIView alloc] init];
    }
    NSDictionary* attributes = [astDict objectForKey:@"attributes"];
    NSDictionary* style = [attributes objectForKey:@"style"];
    view = [self styleView:view withStyle:style];
    [_rootView addSubview:view];
    
    NSDictionary* children = [astDict objectForKey:@"children"];
    for(id child in children) {
      if([child isKindOfClass:[NSString class]]) {
        UITextView *textView = [[UITextView alloc] init];
        textView.text = child;
        textView.frame = view.frame;
        textView.backgroundColor = [UIColor clearColor];
        [view addSubview:textView];
      }
    }
    
    [_bridge rasterRenderedComponent:[[astDict valueForKey:@"instance"] valueForKey:@"guid"]];
    [_components setObject:view forKey:[[astDict valueForKey:@"instance"] valueForKey:@"guid"]];
  }
}

-(UIView*) styleView: (UIView*) view withStyle: (NSDictionary*) style {
  view.frame = [self styleFrame:style];
  NSString* backgroundColor = [style valueForKey:@"backgroundColor"];
  view.backgroundColor = [self colorFromHash:backgroundColor];
  return view;
}

- (CGRect)styleFrame:(NSDictionary*)styleDictionary {
  NSNumber* frameHeight = [styleDictionary objectForKey:@"height"];
  NSNumber* frameWidth = [styleDictionary objectForKey:@"width"];
  NSNumber* framex = [styleDictionary objectForKey:@"left"];
  NSNumber* framey = [styleDictionary objectForKey:@"top"];
  return CGRectMake([framex doubleValue], [framey doubleValue], [frameWidth doubleValue], [frameHeight doubleValue]);
}

- (UIColor*)colorFromHash:(NSString*) color {
  color = [color stringByReplacingOccurrencesOfString:@"#" withString:@"0x"];
  unsigned colorInt = 0;
  [[NSScanner scannerWithString:color] scanHexInt:&colorInt];
  return UIColorFromRGB(colorInt);
}


@end
