import { Dimensions } from './dimensions';

class pixelratio {
  get() {
    // returns the pixel density
    return Dimensions.get('window').scale;
  }
  getPixelSizeForLayoutSize(size) {
    const baseScreen = 640; // iPhone 5
    const ratio = Dimensions.get('window').width / baseScreen;
    return Math.round(ratio * size);
  }
}


const PixelRatio = new pixelratio();

export { PixelRatio };