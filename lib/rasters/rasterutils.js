class rasterUtils {
  constructor() {
    if (typeof window !== 'undefined') {
      var pairs = window.location.search.slice(1).split('&');
      this.props = {};
      pairs.forEach(pair => {
        pair = pair.split('=');
        this.props[pair[0]] = decodeURIComponent(pair[1] || '');
      });
    }
  }
}

const RasterUtils = new rasterUtils();

export { RasterUtils };
