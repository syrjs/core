//
//  SyrBundleManager.m
//  SyrNative
//
//  Created by Anderson,Derek on 12/14/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrBundleManager.h"
#import <CommonCrypto/CommonDigest.h>

@implementation SyrBundle @end

@interface SyrBundleManager()
	@property NSString* manifestServerEndPoint;
	@property NSMutableArray* bundles;
@end

@implementation SyrBundleManager

- (id) init
{
  self = [super init];
  if (self!=nil) {

  }
  return self;
}

- (id) initWithManifestServer:(NSString*) endpoint {
  self = [self init];
  if (self)
  {
    _manifestServerEndPoint = endpoint;
  }
  return self;
}

- (SyrBundle*) loadBundle: (NSString*) bundlePath {
  SyrBundle* returnBundle = [[SyrBundle alloc] init];

  if([self isDevelopmentBundle:bundlePath]) {
    returnBundle.bundlePath = bundlePath;
    NSLog(@"Development protocol of HTTP found!");
  } else {
    returnBundle.bundlePath = [self fileUrl:bundlePath];
    [self phoneHome];
  }
  
  return returnBundle;
}

- (void) phoneHome {
  [self getJSONDataFrom: _manifestServerEndPoint complete:^(NSDictionary* manifest){
     [self processManifest: manifest];
  }];
}

- (BOOL) isDevelopmentBundle: (NSString*) bundlePath {
  return [bundlePath containsString:@"http"];
}

-(NSString*) fileUrl: (NSString*) fileName {
  NSArray* paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask, YES);
  NSString* documentsDirectory = [paths objectAtIndex:0];
  NSString* filenameStr = [documentsDirectory stringByAppendingPathComponent:fileName];
  NSFileManager *fileManager = [NSFileManager defaultManager];
  
  if ([fileManager fileExistsAtPath:filenameStr]){
    return filenameStr;
  } else {
    // look for the file in bundles
    NSBundle* mainBundle = [NSBundle mainBundle];
    NSString* pathInBundle = [mainBundle pathForResource:@"syrBundle" ofType:@"html"];
    if (pathInBundle){
      return pathInBundle;
    } else {
      // look in other bundles
      NSArray *dirFiles = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:[mainBundle bundlePath] error:nil];
      NSArray *bundleFiles = [dirFiles filteredArrayUsingPredicate:[NSPredicate predicateWithFormat:@"self ENDSWITH '.bundle'"]];
      
      for(NSString* internalBundleName in bundleFiles) {
        
        NSString* pathOfInternalBundle = [mainBundle pathForResource:internalBundleName ofType:nil];
        NSBundle* internalBundle = [NSBundle bundleWithPath:pathOfInternalBundle];
        NSString* syrBundlePath = [internalBundle pathForResource:@"syrBundle" ofType:@"html"];
        
        if([syrBundlePath length] > 0) {
          return syrBundlePath;
        }
      }
    }
    return @"";
  }
}

- (void) processManifest: (NSDictionary*) manifest {
//  NSString* manifestStatus = [manifest valueForKey:@"ack"];
  NSDictionary* manifestApp = [manifest valueForKey:@"app"];
  NSDictionary* meta = [manifestApp objectForKey:@"meta"];
  NSString* baseURI = [meta valueForKey:@"baseURI"];
  NSString* version = [manifestApp valueForKey:@"configVersion"];
  
  NSArray* files = [manifestApp objectForKey:@"files"];
  if(files.count > 0) {
    for (NSObject* file in files) {
      NSString* fileType = [file valueForKey:@"type"];
      NSString* fileName = [file valueForKey:@"name"];
      NSString* fileHash = [file valueForKey:@"hash"];
      
      
      if([fileType containsString:@"script"]){
        // create string to call out to get remote file
        // cache bust akamai
        NSString* fileRemotePath = [NSString stringWithFormat:@"%@?%@",[baseURI stringByAppendingPathComponent:[version stringByAppendingPathComponent:fileName]], [[NSUUID UUID] UUIDString]];
        
        [self getStringDataFrom: fileRemotePath complete:^(NSString* fileData){
          if([fileData length] > 0) {
            NSArray* paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask, YES);
            NSString* documentsDirectory = [paths objectAtIndex:0];
            NSString* filenameStr = [documentsDirectory stringByAppendingPathComponent:fileName];
            NSString* md5Sum = [self md5:fileData];
            
            // check ths sum of the file
            if([md5Sum containsString:fileHash]) {
              // hash is ok, save the file
              [fileData writeToFile:filenameStr atomically:YES encoding:NSUTF8StringEncoding error:nil];
            }
          }
        }];
      }
    }
  }
}

- (void) getJSONDataFrom: (NSString*) url complete:(void(^)(NSDictionary* jsonData))someBlock{
  [self getStringDataFrom:url complete:^(NSString* stringData){
    NSData *objectData = [stringData dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *objectDictionary = [NSJSONSerialization JSONObjectWithData:objectData options:NSJSONReadingMutableContainers error:nil];
    someBlock(objectDictionary);
  }];
}

- (void) getStringDataFrom:(NSString *)url complete:(void(^)(NSString* stringData))someBlock{
  NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
  configuration.requestCachePolicy = NSURLRequestReloadIgnoringLocalCacheData;

  NSURLSessionDataTask *downloadTask = [[NSURLSession sessionWithConfiguration:configuration]
      dataTaskWithURL:[NSURL URLWithString:url] completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
      NSString* stringData = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
      someBlock(stringData);
  }];
  
  [downloadTask resume];
}

- (NSString *) md5:(NSString *) input
{
  const char *cStr = [input UTF8String];
  unsigned char digest[CC_MD5_DIGEST_LENGTH];

  CC_MD5(cStr, (CC_LONG)strlen(cStr), digest);
  
  NSMutableString *output = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
  
  for(int i = 0; i < CC_MD5_DIGEST_LENGTH; i++)
    [output appendFormat:@"%02x", digest[i]];
  
  return  output;
}

@end
