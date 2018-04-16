//
//  SyrContactManager.h
//  SyrNative
//
//  Created by Syed,hassan on 4/11/18.
//  Copyright © 2018 Anderson,Derek. All rights reserved.
//

#import "SyrComponent.h"
#import <Contacts/Contacts.h>

@interface SyrContactManager : SyrComponent
+(instancetype)sharedInstance;
@end
