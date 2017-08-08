import { RasterManager } from './rastermanager';
const DOMRaster = require('./rasters/dom');
RasterManager.setRaster(DOMRaster);

/** Class representing a base mouse component. */
class Component {}

export { Component, RasterManager };
