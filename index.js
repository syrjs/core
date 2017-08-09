import { RasterManager as React } from './lib/rastermanager';
const DOMRaster = require('./lib/rasters/dom');
React.setRaster(DOMRaster);

/** Class representing a base mouse component. */
class Component {
  constructor(props) {
    //this.props = this.render().attributes || {};
  }

  render() {}
}

// compatibility with react
React.Component = Component;

export { Component, React };
