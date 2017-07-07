/** Class representing a base mouse component. */
class BaseComponent {
    /**
     * Create a component.
     * @param {object} def - The definition of the mouse component.
     */
    constructor (def) {
      // do something
    }

    /**
     * Renders a component using a given rasterizer
     */
  render () {
      // get the raster manager
    let rasterManager = require('./rastermanager.js')
    let raster = rasterManager.getRaster()

    // tell the raster to render this component
    raster.render(this)

    return this
  }
}


module.exports = BaseComponent;