const RasterManager = require('./rastermanager.js');
const DOMRaster = require('./rasters/dom');

RasterManager.setRaster();

/** Class representing a base mouse component. */
class Mouse {
  /**
   * Create a component.
   * @param {object} def - The definition of the mouse component.
   */
  constructor(def) {
    this._ast = def;
  }

  renderInto(target) {
    let html = this.render();
    target.innerHTML = html;
  }

  render() {
    console.log(this._ast);
    return DOMRaster.render(this._ast);
  }
}

module.exports = Mouse;