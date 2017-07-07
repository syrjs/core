/** Class manages the consumption and use of rasters */

class RasterManager {
    /**
     * Create a component.
     * @param {object} raster - Provide the raster manager with the raster of choice
     */
    constructor(){}

    setRaster(raster){
        this._raster = raster;
    }

    getRaster(){
        return this._raster;
    }
}

module.exports = new RasterManager();