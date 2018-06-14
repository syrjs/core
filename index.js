/**
 * This file glues together a bunch of stuff, to make a superset compatible reactique api
 */

require('./lib/fills');

// core composition
import { RasterManager } from './lib/rastermanager';
import { Component } from './lib/component';

// animations and events
import { Animated } from './lib/animated';
import { Events , EventEmitter } from './lib/events';

// fillers for native platforms
import { Networking } from './lib/networking';

// syr components
import { View } from './lib/view';
import { StackView } from './lib/stackview';
import { Button } from './lib/button';
import { Text } from './lib/text';
import { Image } from './lib/image';
import { LinearGradient } from './lib/lineargradient';
import { TouchableOpacity } from './lib/touchable';
import { ScrollView } from './lib/scrollview';
import { Alert } from './lib/alertDialogue';
import { Switch } from './lib/switch';

// syr environment
import { NativeModules } from './lib/nativemodules';
import { Dimensions } from './lib/dimensions';
import { PixelRatio } from './lib/pixelratio';
import { Platform } from './lib/platform';

// rendering platforms
import { DOMRaster } from './lib/rasters/dom';
import { WKRaster } from './lib/rasters/wkwebview';
import { NoDOM } from './lib/rasters/nodom';

// central SyrStore (flux Store)
import { SyrStore } from './lib/store';
@TODO: This will be for the new version of syrStore
// import { Resolver } from './lib/resolver';

// detecting rendering bridge
if (typeof window !== 'undefined' && (window.SyrBridge || (window.webkit && window.webkit.messageHandlers))) {
  RasterManager.setRaster(WKRaster);
}  else {
  if(typeof window == 'undefined') {
    RasterManager.setRaster(NoDOM);
  } else {
    RasterManager.setRaster(DOMRaster);
  }
}

// export render
const Render = RasterManager.render;

// api objects
export {
  Component,
  Render,
  RasterManager,
  View,
  StackView,
  Animated,
  Events,
  Button,
  Text,
  Image,
  NativeModules,
  Dimensions,
  EventEmitter,
  ScrollView,
  LinearGradient,
  TouchableOpacity,
  PixelRatio,
  Platform,
  Alert,
  SyrStore,
  Switch,
//   Resolver
};
