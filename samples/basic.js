let BaseComponent = require('../index.js');
let RasterManager = require('../rastermanager.js');

// set the raster for the raster manager
RasterManager.setRaster(require('../rasters/dom.js'));

let basecomponent = new BaseComponent({
  style: {
    left: 50,
    top: 50,
    height: 250,
    width: 250,
    background: '#6699ff',
    display: 'block',
    position: 'absolute',
  },
});

console.log(basecomponent.render());
