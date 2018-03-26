/**
 * PixelRatio
 * Provides Needed APIs for Resolution Scaling
 */
import { Platform } from './platform';
import { Dimensions } from './dimensions';

class pixelratio {
  constructor() {
    // base screen displays a developer can use
    this.baseDisplays = {
      iPhoneSE: 640,
      iPhone6: 750,
      iPhone7: 1080,
      FHD: 1080,
      HD: 720,
      QHD: 1440,
    };
    // default to iPhoneSE as default base
    this.baseScreenSize = this.baseDisplays.iPhoneSE;
  }
  setBaseScreenSize(baseScreenSize) {
    // get base screen size over ride from developer
    this.baseScreenSize = baseScreenSize;
  }
  get() {
    // returns the pixel density
    return Dimensions.get('window').scale;
  }
  getPixelSizeForLayoutSize(size) {
    // check orientation for scaling calc
    const diff =
      Dimensions.get('window').width - Dimensions.get('window').height;
    const currentScreen =
      diff < 1
        ? Dimensions.get('window').width
        : Dimensions.get('window').height;
    const ratio = currentScreen / this.baseScreenSize;
    if (Platform.OS === 'ios') {
      return ratio * size;
    }
    return Math.round(ratio * size);
  }
}

const PixelRatio = new pixelratio();

export { PixelRatio };
