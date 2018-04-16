//
//  SyrContactManager.m
//  SyrNative
//
//  Created by Syed,hassan on 4/11/18.
//  Copyright © 2018 Anderson,Derek. All rights reserved.
//

#import "SyrContactManager.h"

@implementation SyrContactManager
+(instancetype)sharedInstance {
    static SyrContactManager *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];
    });
    return sharedInstance;
}

SYR_EXPORT_METHOD(requestContactPermissions) {
    CNContactStore *store = [[CNContactStore alloc] init];
    [store requestAccessForEntityType: CNEntityTypeContacts completionHandler:^(BOOL granted, NSError * _Nullable error) {
        if (error !=nil) {
            [SyrContactManager sendEventWithName:@"contactRequestResult" body:@{@"result":[NSNumber numberWithBool:granted]}];
        } else {
            [SyrContactManager sendEventWithName:@"contactRequestResult" body:@{@"result":error}];
        }
    }];
}
//Currently returns all contacts, with their firstname, lastname, phoneNumber, birthday, and profilepicture image
SYR_EXPORT_METHOD(fetchAllContacts) {
    CNContactStore *store = [[CNContactStore alloc] init];
    NSArray *keys = @[CNContactFamilyNameKey, CNContactGivenNameKey, CNContactPhoneNumbersKey, CNContactImageDataKey,CNContactBirthdayKey];
    NSString *containerID = store.defaultContainerIdentifier;
    NSPredicate *contactPredicate = [CNContact predicateForContactsInContainerWithIdentifier:containerID];
    NSError *error;
    
    NSArray *contacts =  [store unifiedContactsMatchingPredicate:contactPredicate keysToFetch:keys error:&error];
    
    if (error == nil) {
        [SyrContactManager sendEventWithName:@"contactResults" body:@{@"result":contacts}];
    } else {
        [SyrContactManager sendEventWithName:@"contactResults" body:@{@"result":error}];
    }
}
@end
