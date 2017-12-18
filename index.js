/**
 * This file glues together a bunch of stuff, to make a superset compatible reactique api
 */

// core composition
import { RasterManager } from './lib/rastermanager';
import { Component } from './lib/component';

// animations and events
import { Animated } from './lib/animated';
import { Events , EventEmitter } from './lib/events';

// syr components
import { View } from './lib/view';
import { Button } from './lib/button';
import { Text } from './lib/text';
import { Image } from './lib/image';
import { LinearGradient } from './lib/lineargradient';
import { TouchableOpacity } from './lib/touchable';

// syr environment
import { NativeModules } from './lib/nativemodules';
import { Dimensions } from './lib/dimensions';
import { ScrollView } from './lib/scrollview';

// rendering platforms
import { DOMRaster } from './lib/rasters/dom';
import { WKRaster } from './lib/rasters/wkwebview';

// detecting rendering bridge
if (window.SyrBridge || (window.webkit && window.webkit.messageHandlers)) {
  RasterManager.setRaster(WKRaster);
}  else {
  RasterManager.setRaster(DOMRaster);
}

// export render
const Render = RasterManager.render;

// api objects
export {
  Component,
  Render,
  RasterManager,
  View,
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
  TouchableOpacity
};