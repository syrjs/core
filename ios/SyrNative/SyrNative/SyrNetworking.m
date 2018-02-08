//
//  SyrNetworking.m
//  SyrNative
//
//  Created by Anderson,Derek on 2/6/18.
//  Copyright © 2018 Anderson,Derek. All rights reserved.
//

#import "SyrNetworking.h"

@implementation SyrNetworking

SYR_EXPORT_MODULE()

SYR_EXPORT_METHOD(get: (NSDictionary*) requestDict) {
  // fetch on the async queue
  dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0ul);
  dispatch_async(queue, ^{
    // get request
    NSString* requestUrl = [requestDict valueForKey:@"url"];
    NSString* guid = [requestDict valueForKey:@"guid"];
    NSString* method = [requestDict valueForKey:@"method"];
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
    [request setHTTPMethod:method];
    [request setURL:[NSURL URLWithString:requestUrl]];
    
    NSError *error = nil;
    NSHTTPURLResponse *responseCode = nil;
    
    // get data
    NSData *oResponseData = [NSURLConnection sendSynchronousRequest:request returningResponse:&responseCode error:&error];
    
    
    // log error if not success just for info
    if([responseCode statusCode] != 200){
      NSLog(@"Error getting %@, HTTP status code %li", requestUrl, (long)[responseCode statusCode]);
    }
    
    // get the response
    NSString* response = [[NSString alloc] initWithData:oResponseData encoding:NSASCIIStringEncoding];
    NSNumber* statusCode = [NSNumber numberWithDouble:[responseCode statusCode]];
    
    
    // send the response back
    [self sendEventWithName:@"NetworkingCallback" body:@{@"data": response, @"responseCode": statusCode, @"guid": guid}];
  });
}

@end
