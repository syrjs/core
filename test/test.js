let assert = require('assert');

// describe('Base Component', function() {
//   var BaseComponent = require('../index.js');
//   describe('Construction', function() {
//     it('should create a new base compponent', function() {
//       let testComponent = new BaseComponent();
//     });
//   });
// });

describe('Raster CLI', function() {
  let BaseComponent = require('../index.js');
  let RasterManager = require('../rastermanager.js');
  // set the raster for the raster manager
  RasterManager.setRaster(require('../rasters/cli.js'));

  describe('Base Component', function() {
    it('should render its base content', function() {
      let basecomponent = new BaseComponent({
        components: [
          new BaseComponent({ type: 'Text', content: 'Hello World' }),
          new BaseComponent({ type: 'Button' }),
        ],
      });

      basecomponent.render();
    });
  });
});
