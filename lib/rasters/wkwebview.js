import {RasterUtils} from './rasterutils';
class WKRaster {
  constructor() {
    this.type = 'wkwebview';
  }

  render(component) {
    console.log(JSON.stringify(component));
    this.sendMessage('gui', component);
  }

  sendMessage(type, message) {
    if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers['SyrNative']
    ) {
      // post ast to native raster
      window.webkit.messageHandlers['SyrNative'].postMessage({
        type: type,
        ast: JSON.stringify(message),
      });
    }
  }

  dimensions() {
    return {width: RasterUtils.props.window_width, height:RasterUtils.props.window_height}
  }
}

module.exports = new WKRaster();
