/** Class manages the consumption and use of rasters */

class RasterManager {
  setRaster (raster) {
    this._raster = raster
  }

  getRaster () {
    return this._raster
  }
}

module.exports = new RasterManager()
