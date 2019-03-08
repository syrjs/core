import { Dimensions, PixelRatio } from '../../index';
PixelRatio.setBaseScreenSize(PixelRatio.baseDisplays.iPhoneSE);

const Styles = {
  mainView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#aaaaaa',
    padding: 5,
  },
  buttonContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: PixelRatio.getPixelSizeForLayoutSize(200),
    margin: 5,
  },
  numButton: function(number) {
    const row = Math.floor(number / 4) - (number % 4 ? 0 : 1);
    const col = number % 4 ? number % 4 : 4; // 0, 1, 2
    const width = Dimensions.get('window').width / 5;
    const height = Dimensions.get('window').height / 7;
    const padding = PixelRatio.getPixelSizeForLayoutSize(10);

    const left = (col - 1) * width + padding * col;
    const top = row * height + padding * row;

    return {
      fontSize: 20,
      fontWeight: 'bold',
      height: height,
      width: width,
      left: left,
      backgroundColor: number % 4 === 0 ? '#f49b42' : '#eeeeee',
      top: top,
    };
  },
  displayArea: {
    textAlign: 'right',
    height: PixelRatio.getPixelSizeForLayoutSize(125),
    top: PixelRatio.getPixelSizeForLayoutSize(50),
    left: PixelRatio.getPixelSizeForLayoutSize(20),
    width:
      Dimensions.get('window').width - PixelRatio.getPixelSizeForLayoutSize(30),
    backgroundColor: '#dedede',
    fontSize: PixelRatio.getPixelSizeForLayoutSize(105),
  },
};

export { Styles };
