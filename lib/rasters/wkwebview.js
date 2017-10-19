class WKRaster {
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
      // post ast to native raster
      window.webkit.messageHandlers['SyrNative'].postMessage({
        type: type,
        ast: JSON.stringify(message),
      });
    }
  }
}

module.exports = new WKRaster();
