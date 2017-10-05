import { RasterManager } from './lib/rastermanager';
import { Component } from './lib/component';

const DOMRaster = require('./lib/rasters/dom');
const WKRaster = require('./lib/rasters/wkwebview');

if (window.webkit && window.webkit.messageHandlers) {
  RasterManager.setRaster(WKRaster);
} else {
  RasterManager.setRaster(DOMRaster);
}

const Render = RasterManager.render;
export { Component, Render, RasterManager};
