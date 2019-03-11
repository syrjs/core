import { Raster } from './raster';


let _window;

if(typeof global != 'undefined') {
 _window = global;
} else {
 _window = window;
}

const document = _window.document || {
  body: {
    addEventListener: () => {},
  },
};

if (!_window.document) {
  _window.document = document;
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
      width: _window.innerWidth,
      height: _window.innerHeight,
      scale: _window.devicePixelRatio || 1,
    };
  }

  props() {
    return {};
  }
}

const DOMRaster = new domraster();
export { DOMRaster };
