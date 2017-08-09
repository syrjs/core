//
//  SyrCore.m
//  SyrNative
//
//  Created by Anderson,Derek on 7/7/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrCore.h"

@implementation SyrCore

UIViewController* theView;
typedef void (^StyleCaseBlock)();

- (id) init
{
	self = [super init];
	if (self!=nil) {
		WKWebViewConfiguration *configuration = [[WKWebViewConfiguration alloc] init];
		WKUserContentController *controller = [[WKUserContentController alloc] init];
		[controller addScriptMessageHandler:self name:@"AST"];
		configuration.userContentController = controller;
		self.theWebView = [[WKWebView alloc] initWithFrame:CGRectMake(0, 0, 0, 0) configuration:configuration];
	}
	return self;
}

- (void)runApp: (UIViewController*)viewController {
	NSURL *nsurl=[NSURL URLWithString:@"http://127.0.0.1:8080/?sds"];
	NSURLRequest *nsrequest=[NSURLRequest requestWithURL:nsurl];
	[self.theWebView loadRequest:nsrequest];
	theView = viewController;
	[viewController.view addSubview:self.theWebView];
	NSLog(@"logging run app");
}

- (void)userContentController:(WKUserContentController *)userContentController
        didReceiveScriptMessage:(WKScriptMessage *)message {

	// recieve a message through the bridge
	NSString *s = message.body;

	// parse for jsonData
	NSData *jsonData = [s dataUsingEncoding:NSUTF8StringEncoding];
	NSError *error;

	id jsonObject = [NSJSONSerialization JSONObjectWithData:jsonData options:0 error:&error];

	if (error) {
		NSLog(@"Error parsing JSON: %@", error);
	}
	else
	{
		// not supporting array for base object just yet
		if ([jsonObject isKindOfClass:[NSArray class]])
		{
			NSArray* jsonArray = (NSArray *)jsonObject;
		}
		else {
			NSDictionary* jsonDictionary = (NSDictionary *)jsonObject;
			UIView* paintedView = [self parseAST:jsonObject];
		}
	}
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

- (void)buttonTapped:(UIButton *)sender {
  NSLog(@"Ok button was tapped: dismiss the view controller.");
}

- (UILabel*)buildLabel:(NSDictionary*)astDictionary {
  UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 0, 0)];
  
  return label;
}

- (UIButton*)buildButton:(NSDictionary*)astDictionary {
  UIButton *button = [UIButton buttonWithType:UIButtonTypeRoundedRect];
  
  
  return button;
}

- (UIView*)buildContainer:(NSDictionary*)astDictionary {
  // builds a uiview to return
  UIView* view = [[UIView alloc] init];
  typedef void (^CaseBlock)();
  NSDictionary *d = @{
                      @"type":
                        ^{
                          NSString *type = [astDictionary objectForKey:@"type"];
                          if ([type isEqualToString:@"Container"]) {
                          
                          }
                        },
                      @"children":
                        ^{
                          NSLog(@"foo children");
                        }
                      };
  
  return view;
}

- (NSObject*)parseAST:(NSDictionary *) astDictionary {
	// parse through the ast
	typedef void (^CaseBlock)();
	NSDictionary *styleDictionary = (NSDictionary *)[astDictionary objectForKey:@"style"];
	UIView* view = [[UIView alloc] init];
  
	NSDictionary *d = @{
		@"type":
		^{
			// parse each type
			// todo abstract into class handlers
//			NSString *type = [astDictionary objectForKey:@"type"];
//			if ([type isEqualToString:@"Container"]) {
//				view.backgroundColor = [self colorFromHash:[styleDictionary objectForKey:@"backgroundColor"]];
//				view.frame = [self styleFrame:styleDictionary];
//        view.userInteractionEnabled = YES;
//        theView.view.userInteractionEnabled = YES;
//				[theView.view addSubview:view];
//			} else if ([type isEqualToString:@"Text"]) {
//				NSString *content = [astDictionary objectForKey:@"content"];
//				UILabel *theLabel = [[UILabel alloc] initWithFrame:[self styleFrame:styleDictionary]];
//				[theLabel setTextColor:[self colorFromHash:[styleDictionary objectForKey:@"color"]]];
//				[theLabel setBackgroundColor:[self colorFromHash:[styleDictionary objectForKey:@"backgroundColor"]]];
//				[theLabel setText:content];
//				[theLabel setFont:[UIFont fontWithName: @"Trebuchet MS" size: 14.0f]];
//				[view addSubview:theLabel];
//			} else if ([type isEqualToString:@"Button"]) {
//				UIButton *button = [UIButton buttonWithType:UIButtonTypeRoundedRect];
//				NSString *content = [astDictionary objectForKey:@"content"];
//        [button setTitle:content forState:UIControlStateNormal];
//        button.frame = CGRectMake(20, 20, 100, 20);
//        [button addTarget:self action:@selector(buttonTapped:) forControlEvents:UIControlEventTouchUpInside];
//        [view addSubview:button];
//			}
		},
		@"children":
		^{
			// this will be an array loop through children call into parseAST
			NSArray* astList = (NSArray *)[astDictionary objectForKey:@"children"];
			for (NSDictionary* o in astList)
			{
				UIView* subview = [self parseAST:o];
				[view addSubview:subview];
			}
		}
	};

	for (NSString* key in astDictionary) {
		CaseBlock c = d[key];
		if (c) c();
	}

	return view;
}


@end
