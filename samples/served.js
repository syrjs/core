let BaseComponent = require('../index.js')
let RasterManager = require('../rastermanager.js')

let basecomponent = new BaseComponent({
  style: {
    top: 50,
    height: 250,
    width: 250,
    backgroundColor: '#6699ff',
    display: 'block',
    position: 'absolute'
  },
  components: [
    new BaseComponent({
      type: 'Text',
      content: 'Foo bar this ios a test',
      style: {
        backgroundColor: '#6699ff',
        height: 10,
        width: 250
      }
    }),
    new BaseComponent({
      type: 'Button',
      content: 'Press This Button',
      style: {
        backgroundColor: '#000000',
        color: '#ffffff',
        top: 50,
        height: 30,
        width: 175
      }
    })
  ]
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
