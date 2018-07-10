//
//  SyrRootView.h
//  SyrNative
//
//  Created by Anderson,Derek on 10/5/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface SyrRootView : UIView
@property NSDictionary* appProperties;
@property (nonatomic)  NSString* resourceBundlePath;
-(id)initWithBundlePath:(NSString*)bundlePath initialProperties:(NSDictionary*)initialProps;
-(id) initWithBundlePath:(NSString*)bundlePath initialProperties:(NSDictionary*)initialProps withResourceBundlePath: (NSString*) resourceBundlePath;
@end
