/** Class representing a base mouse component. */
class BaseComponent {
  /**
   * Create a component.
   * @param {object} def - The definition of the mouse component.
   */
  constructor (def) {
    this.type = (def && def.type) || 'Container'
    this.components = def && def.components
    this.content = def && def.content
    this.style = def && def.style
  }

  getAST () {
    function parseTree (node) {
      let retChildren = []
      let type = node.type
      if (node.components) {
        for (let i = 0; i < node.components.length; i++) {
          retChildren.push(parseTree(node.components[i]))
        }
      }

      let ret = { type: type, children: retChildren }
      if (node.content) ret.content = node.content
      if (node.style) ret.style = node.style
      return ret
    }

    return parseTree(this)
  }

  /**
   * Renders a component using a given rasterizer
   */
  render () {
      // get the raster manager
    let rasterManager = require('./rastermanager.js')
    let raster = rasterManager.getRaster()

    // tell the raster to render this component
    return raster.render(this)
  }
}

module.exports = BaseComponent
