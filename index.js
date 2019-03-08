/**
 * This file glues together a bunch of stuff, to make a superset compatible reactique api
 */

import './lib/fills';

import { Component, Render } from './lib/component';

// animations and events
import { Animated } from './lib/animated';
import { Events, EventEmitter } from './lib/events';

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

// central SyrStore (flux Store)
import { SyrStore } from './lib/store';
import { Resolver } from './lib/resolver';

import { RasterManager } from './lib/rastermanager';

// api objects
export {
  Component,
  Render,
  View,
  StackView,
  RasterManager,
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
  Resolver
};