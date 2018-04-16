//
//  SyrContactManager.m
//  SyrNative
//
//  Created by Syed,hassan on 4/11/18.
//  Copyright © 2018 Anderson,Derek. All rights reserved.
//

#import "SyrContactManager.h"

@implementation SyrContactManager

SYR_EXPORT_MODULE(ContactManager)

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
        if (error == nil) {
            [SyrContactManager sendEventWithName:@"contactRequestResult" body:@{@"result":[NSNumber numberWithBool:granted]}];
        } else {
            [SyrContactManager sendEventWithName:@"contactRequestResult" body:@{@"result":error}];
        }
    }];
}
//Currently returns all contacts, with their firstname, lastname, phoneNumber, birthday, and profilepicture image
SYR_EXPORT_METHOD(fetchAllContacts) {
    CNContactStore *store = [[CNContactStore alloc] init];
    NSArray *keys = @[CNContactFamilyNameKey, CNContactGivenNameKey, CNContactPhoneNumbersKey,CNContactBirthdayKey];
    NSString *containerID = store.defaultContainerIdentifier;
    NSPredicate *contactPredicate = [CNContact predicateForContactsInContainerWithIdentifier:containerID];
    NSError *error;
    
    NSArray *contacts =  [store unifiedContactsMatchingPredicate:contactPredicate keysToFetch:keys error:&error];
    
    NSMutableDictionary *contactsJSON = [[NSMutableDictionary alloc] init];
    for(CNContact *contact in contacts) {
        
        NSMutableDictionary *numbers = [[NSMutableDictionary alloc] init];
        for(CNLabeledValue<CNPhoneNumber *> *number in contact.phoneNumbers) {
            numbers[[CNLabeledValue localizedStringForLabel:number.label]] = number.value.stringValue;
        }
        
        NSString *givenName = contact.givenName ?: @"";
        NSString *familyName = contact.familyName ?: @"";
        NSString *birthday = [contact.birthday.date descriptionWithLocale:nil] ?: @"";
        
        NSDictionary *contactJson = @{@"givenName": givenName,
                                      @"familyName":familyName,
                                      @"phoneNumber": numbers,
                                      @"birthday":birthday
                                      };
        
        contactsJSON[contact.identifier] = contactJson;
    }
    
    if (error == nil) {
        [SyrContactManager sendEventWithName:@"contactResults" body:@{@"result":contactsJSON}];
    } else {
        [SyrContactManager sendEventWithName:@"contactResults" body:@{@"result":error.localizedFailureReason}];
    }
}
@end

