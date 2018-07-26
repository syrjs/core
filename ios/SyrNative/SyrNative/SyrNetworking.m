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

SYR_EXPORT_METHOD(request: (NSDictionary*) requestDict) {
  // fetch on the async queue
  dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0ul);
  dispatch_async(queue, ^{
    // get request
    NSString* requestUrl = [requestDict valueForKey:@"url"];
    NSString* guid = [requestDict valueForKey:@"guid"];
    NSString* method = [requestDict valueForKey:@"method"];
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
    NSString* body = [requestDict valueForKey:@"body"];
    
    id headers = [requestDict objectForKey:@"headers"];
    
    if(body != nil) {
      NSData* postData = [body dataUsingEncoding:NSUTF8StringEncoding];
      NSString *postLength = [NSString stringWithFormat:@"%lu", (unsigned long)[postData length]];
      [request setHTTPBody: postData];
      [request setValue:postLength forHTTPHeaderField:@"Content-Length"];
    }

    // set more headers here
    for (id key in headers) {
      [request setValue:[headers valueForKey:key]  forHTTPHeaderField:key];
    }
    
    [request setHTTPMethod:method];
    [request setURL:[NSURL URLWithString:requestUrl]];
    
    // todo: forward these errors along with the data response
    [[[NSURLSession sharedSession] dataTaskWithRequest:request completionHandler:^(NSData * data, NSURLResponse * response, NSError * error) {
      NSDictionary* platformError = nil;
      NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
      
      // log error if not success just for info
      if([httpResponse statusCode]!= 200){
        NSLog(@"Error getting %@, HTTP status code %li", requestUrl, (long)[httpResponse statusCode]);
      }
      
      if(error != nil) {
        platformError = @{@"message": [error localizedDescription]};
      } else {
        platformError = @{};
      }
      
      // get the response
   		NSString* responseString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
      NSNumber* statusCode = [NSNumber numberWithDouble:[httpResponse statusCode]];
      
      // send the response back
      [self sendEventWithName:@"NetworkingCallback" body:@{@"data": responseString, @"responseCode": statusCode, @"guid": guid, @"platformError":platformError}];
      
    }] resume];
    
  });
}

@end
