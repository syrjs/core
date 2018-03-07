//
//  SyrHapticHelper.h
//  SyrNative
//
//  Created by Malkireddy, Siddharth on 3/7/18.
//  Copyright © 2018 Anderson,Derek. All rights reserved.
//

// credit Emre YANIK

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

typedef enum {
    FeedbackType_Selection,
    FeedbackType_Impact_Light,
    FeedbackType_Impact_Medium,
    FeedbackType_Impact_Heavy,
    FeedbackType_Notification_Success,
    FeedbackType_Notification_Warning,
    FeedbackType_Notification_Error
}FeedbackType;

#define getEnumValue(name) \
[NSNumber numberWithInt:#name]

@interface SyrHapticHelper : NSObject

+ (void)generateFeedback:(NSString*) type;

@end

