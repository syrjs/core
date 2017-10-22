import { RasterManager } from './lib/rastermanager';
import { Component } from './lib/component';
import { View } from './lib/view';
import { Animated } from './lib/animated';
import { Events } from './lib/events';
import { Button } from './lib/button';
import { Text } from './lib/text';
import { Image } from './lib/image';

const DOMRaster = require('./lib/rasters/dom');
const WKRaster = require('./lib/rasters/wkwebview');

if (window.webkit && window.webkit.messageHandlers) {
  RasterManager.setRaster(WKRaster);
} else {
  RasterManager.setRaster(DOMRaster);
}

const Render = RasterManager.render;

export {
  Component,
  Render,
  RasterManager,
  View,
  Animated,
  Events,
  Button,
  Text,
  Image
};