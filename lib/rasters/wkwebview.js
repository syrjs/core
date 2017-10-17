
class WKRaster {

  constructor() {
    this.type = 'wkwebview';
  }

  render(component) {
    if (window.webkit
        && window.webkit.messageHandlers
        && window.webkit.messageHandlers['SyrNative']) {
        // post ast to native raster
        console.log(component);
        window.webkit.messageHandlers['SyrNative'].postMessage({type: 'gui', ast: JSON.stringify(component)});
    }
  }

}

module.exports = new WKRaster();