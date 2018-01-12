import { RasterManager } from './rastermanager';

class dimensions {
  get(target) {
    if (target == 'window') {
      return {
        height: RasterManager.getRaster().dimensions().height,
        width: RasterManager.getRaster().dimensions().width,
        scale: 1
      };
    }
  }
}

const Dimensions = new dimensions();

export { Dimensions };
