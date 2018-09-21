import { Dimensions, PixelRatio } from '../../index';
PixelRatio.setBaseScreenSize(PixelRatio.baseDisplays.iPhoneSE);

const Styles = {
  mainView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#aaaaaa',
  },
  buttons: {
    width: PixelRatio.getPixelSizeForLayoutSize(600),
    height: PixelRatio.getPixelSizeForLayoutSize(600),
    top: PixelRatio.getPixelSizeForLayoutSize(200),
  },
  numButton: function(number) {
    const row = Math.floor(number / 3) - (number % 3 ? 0 : 1);
    const col = number % 3 ? number % 3 : 3; // 0, 1, 2
    const width = Dimensions.get('window').width / 5;
    const height = Dimensions.get('window').height / 7;
    const padding = PixelRatio.getPixelSizeForLayoutSize(10);

    const left = (col - 1) * width + padding * col;
    const top = row * height + padding * row;

    return {
      height: height,
      width: width,
      backgroundColor: '#eeeeee',
      color: '#000000',
      left: left,
      top: top,
    };
  },
  displayArea: {
    textAlign: 'right',
    height: PixelRatio.getPixelSizeForLayoutSize(125),
    top: PixelRatio.getPixelSizeForLayoutSize(50),
    left: PixelRatio.getPixelSizeForLayoutSize(10),
    width:
      Dimensions.get('window').width - PixelRatio.getPixelSizeForLayoutSize(20),
    backgroundColor: '#dedede',
    fontSize: PixelRatio.getPixelSizeForLayoutSize(105),
  },
  plus: {
    width: PixelRatio.getPixelSizeForLayoutSize(200),
    height: PixelRatio.getPixelSizeForLayoutSize(200),
    backgroundColor: '#f49b42',
    fontSize: PixelRatio.getPixelSizeForLayoutSize(60),
    left:
      Dimensions.get('window').width -
      PixelRatio.getPixelSizeForLayoutSize(200) -
      PixelRatio.getPixelSizeForLayoutSize(10),
    top: PixelRatio.getPixelSizeForLayoutSize(200),
  },
};

export { Styles };
