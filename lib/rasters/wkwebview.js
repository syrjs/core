import { RasterUtils } from './rasterutils';

class wkraster {
  constructor() {
    this.type = 'wkwebview';
  }

  render(component) {
    this.sendMessage('gui', component);
  }

  sendMessage(type, message) {
    if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers['SyrNative']
    ) {
      // post ast to wkwebview ios
      window.webkit.messageHandlers['SyrNative'].postMessage({
        type: type,
        sender: RasterUtils.props.rootViewId,
        ast: JSON.stringify(message),
      });
    } else if (window.SyrBridge) {
      // post to android webview
      window.SyrBridge.message(
        JSON.stringify({
          type: type,
          ast: JSON.stringify(message),
        })
      );
    }
  }

  dimensions() {
    return {
      width: RasterUtils.props.window_width,
      height: RasterUtils.props.window_height,
      scale: RasterUtils.props.screen_density,
    };
  }

  props() {
    if (RasterUtils.props && RasterUtils.props.initial_props) {
      return JSON.parse(RasterUtils.props.initial_props);
    }
    return {};
  }
}

const WKRaster = new wkraster();
export { WKRaster };
