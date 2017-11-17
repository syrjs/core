import { RasterManager } from './rastermanager';

class dimensions {
  get(target) {
    if (target == 'window') {
      return {
        height: RasterManager.getRaster().dimensions().height,
        width: RasterManager.getRaster().dimensions().width,
      };
    }
  }
}

const Dimensions = new dimensions();

export { Dimensions };
