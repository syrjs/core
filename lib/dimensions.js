import { RasterManager } from './rastermanager';

class dimensions {
  get(target) {
    if (target == 'window') {
      return {
        height: RasterManager.getRaster().dimensions().height,
        width: RasterManager.getRaster().dimensions().width,
        scale: RasterManager.getRaster().dimensions().scale,
      };
    }
  }
}

const Dimensions = new dimensions();

export { Dimensions };
