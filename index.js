import { RasterManager } from './lib/rastermanager';
const DOMRaster = require('./lib/rasters/dom');
RasterManager.setRaster(DOMRaster);

/** Class representing a base mouse component. */
class Component {}

export { Component, RasterManager };
