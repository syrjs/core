import { RasterUtils } from './rasters/rasterutils';

class platform {
  constructor() {
    this.OS =
      (RasterUtils.props && RasterUtils.props.platform) ||
      get_browser().name.toLowerCase();
    this.Version =
      (RasterUtils.props && RasterUtils.props.platform_version) ||
      get_browser().version;
    this.isWeb = RasterUtils.props && RasterUtils.props.platform ? false : true;
    this.model = (RasterUtils.props && RasterUtils.props.model) || null;
  }
}

function get_browser() {
  // running in node most likely
  if (typeof navigator == 'undefined') {
    return {
      name: 'nodejs',
      version: 'shrug',
    };
  }

  // looking for browser info
  var ua = navigator.userAgent,
    tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: 'IE', version: tem[1] || '' };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR|Edge\/(\d+)/);
    if (tem != null) {
      return { name: 'Opera', version: tem[1] };
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    name: M[0],
    version: M[1],
  };
}

const Platform = new platform();

export { Platform };
