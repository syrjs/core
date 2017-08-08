/** Class manages the consumption and use of rasters */

class RasterManager {}

let _raster;

RasterManager.setRaster = raster => {
  console.log('setting raster', raster);
  _raster = raster;
};

RasterManager.getRaster = () => {
  return _raster;
};

RasterManager.render = component => {
  let c = new component();
  console.log(c.render());
};

RasterManager.currentRasterType = () => {
  console.log('raster', _raster);
  return _raster.type;
};

export { RasterManager };
