import { Raster } from './raster';
import { RasterUtils } from '../rasterutils';

const document = global.document || {
  body: {
    addEventListener: () => {},
  },
};

if (!global.document) {
  global.document = document;
}

class domraster {
  constructor() {
    this.type = 'dom';
  }

  render(component, target) {
    // render a view
    this.sendMessage('gui', { component, target });
  }

  sendMessage(type, message) {
    if (type === 'gui') {
      Raster.parseAST(message.component, message.target);
    } else if (type === 'animation') {
      Raster.setupAnimation(message);
    }
  }

  dimensions() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      scale: window.devicePixelRatio || 1,
    };
  }

  props() {
    if (RasterUtils.props && RasterUtils.props.initial_props) {
      return JSON.parse(RasterUtils.props.initial_props);
    }
    return {};
  }
}

const DOMRaster = new domraster();
export { DOMRaster };
