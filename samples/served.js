
let BaseComponent = require('../index.js')
let RasterManager = require('../rastermanager.js')

let basecomponent = new BaseComponent({
  style: {
    left: 50,
    top: 50,
    height: 250,
    width: 250,
    background: '#000000',
    // background: '#6699ff',
    display: 'block',
    position: 'absolute'
  }
})


if (window.webkit && window.webkit.messageHandlers) {

  // set the raster for the raster manager
  RasterManager.setRaster(require('../rasters/ast.js'))
  let ast = basecomponent.render()
  // assume for now that we are inside a native bridge
  window.webkit.messageHandlers['AST'].postMessage(JSON.stringify(ast))
} else {
  RasterManager.setRaster(require('../rasters/dom.js'))
  let html = basecomponent.render()
  // lets render to the browser
  document.querySelector('#app').innerHTML = html
}
