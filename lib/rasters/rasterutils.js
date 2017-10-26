
class rasterUtils {
  constructor() {
    var pairs = window.location.search.slice(1).split('&');
    this.props = {};
    pairs.forEach((pair)=>{
        pair = pair.split('=');
        this.props[pair[0]] = decodeURIComponent(pair[1] || '');
    });
  }
}

let RasterUtils = new rasterUtils();
export { RasterUtils }