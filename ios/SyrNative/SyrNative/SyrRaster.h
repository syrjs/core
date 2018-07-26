//
//  SyrRaster.h
//  SyrNative
//
//  Created by Anderson,Derek on 7/8/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "SyrRootView.h"
#import "SyrBridge.h"
#import "SyrInfoBox.h"

#define UIColorFromRGB(rgbValue) \
[UIColor colorWithRed: ((float)((rgbValue & 0xFF0000) >> 16))/255.0 \
green:   ((float)((rgbValue & 0x00FF00) >>  8))/255.0 \
blue:    ((float)((rgbValue & 0x0000FF) >>  0))/255.0 \
alpha:   1.]

@interface SyrRaster : NSObject
@property SyrBridge* bridge;
+ (id) sharedInstance;
-(void) reset;
-(void) parseAST: (NSDictionary*) astString withRootView:(SyrRootView*) rootView;
-(void) registerComponent: (NSString*) component withName:(NSString*) name;
-(void) setupAnimation: (NSDictionary*) animationDict;
-(void) showInfoMessage: (NSDictionary*) message withRootView:(SyrRootView*) rootView;
@property NSMutableDictionary* nativemodules;
@property NSMutableDictionary* registeredClasses;
@end
