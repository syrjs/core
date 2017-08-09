//
//  SyrCore.h
//  SyrNative
//
//  Created by Anderson,Derek on 7/7/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WebKit/WebKit.h>

#define UIColorFromRGB(rgbValue) \
	[UIColor colorWithRed: ((float)((rgbValue & 0xFF0000) >> 16))/255.0 \
green:   ((float)((rgbValue & 0x00FF00) >>  8))/255.0 \
blue:    ((float)((rgbValue & 0x0000FF) >>  0))/255.0 \
alpha:   1.]

@interface SyrCore : NSObject <WKScriptMessageHandler>
@property(strong,nonatomic)WKWebView *theWebView;
-(void) runApp: (UIViewController*)viewController;
-(UIView*) parseAST: (NSDictionary *) astDictionary;
-(void)buttonTapped:(UIButton *)sender;
@end
