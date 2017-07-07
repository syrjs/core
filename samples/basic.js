let BaseComponent = require('../index.js')
let RasterManager = require('../rastermanager.js')

// set the raster for the raster manager
RasterManager.setRaster(require('../rasters/dom.js'))

let basecomponent = new BaseComponent({
  style: {
    left: 0,
    height: 20,
    width: 150
  },
  components: [
    new BaseComponent({type: 'Text', content: 'Hello World'}),
    new BaseComponent({type: 'Button', content: 'Yes'})
  ]
})

console.log(basecomponent.render())

// set the raster for the raster manager
RasterManager.setRaster(require('../rasters/ast.js'))

console.log('ast: ', basecomponent.render())
