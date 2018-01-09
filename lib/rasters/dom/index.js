import { Raster } from './raster';

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

  render(component) {
    // render a view
    this.sendMessage('gui', component);
  }

  sendMessage(type, message) {
    if (type === 'gui') {
      Raster.parseAST(message);
    } else if (type === 'animation') {
      Raster.setupAnimation(message);
    }
  }

  dimensions() {
    console.log(window.innerWidth, window.innerHeight)
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  props() {
    return {};
  }
}

const DOMRaster = new domraster();
export { DOMRaster };
