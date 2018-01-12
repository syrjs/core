import  { RasterUtils } from './rasters/rasterutils';

class platform {
  constructor() {
    this.OS = RasterUtils.props.platform || 'web';
  }
}

const Platform = new platform();

export { Platform };
