import { RasterManager } from './lib/rastermanager';
import { Component } from './lib/component';
const DOMRaster = require('./lib/rasters/dom');

RasterManager.setRaster(DOMRaster);
const Render = RasterManager.render;

export { Component, Render, RasterManager};
