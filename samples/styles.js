import { Dimensions, PixelRatio } from '../index';

const styles = {
  view: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#eeeeee',
  },
  button: {
    height: PixelRatio.getPixelSizeForLayoutSize(75),
    top:
      Dimensions.get('window').height -
      PixelRatio.getPixelSizeForLayoutSize(100),
    left:
      Dimensions.get('window').width / 2 -
      (Dimensions.get('window').width -
        PixelRatio.getPixelSizeForLayoutSize(200)) /
        2,
    width:
      Dimensions.get('window').width -
      PixelRatio.getPixelSizeForLayoutSize(200),
    backgroundColor: '#0070ba',
    color: '#ffffff',
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(15),
    fontSize: PixelRatio.getPixelSizeForLayoutSize(26),
  },
  text: {
    color: '#000000',
    fontSize: PixelRatio.getPixelSizeForLayoutSize(48),
    width: Dimensions.get('window').width,
    height: PixelRatio.getPixelSizeForLayoutSize(60),
    top: PixelRatio.getPixelSizeForLayoutSize(50),
    left: 0,
    textAlign: 'center',
  },
  image: {
    width: PixelRatio.getPixelSizeForLayoutSize(241),
    height: PixelRatio.getPixelSizeForLayoutSize(299),
    top:
      Dimensions.get('window').height / 2 -
      PixelRatio.getPixelSizeForLayoutSize(299) / 2,
    left:
      Dimensions.get('window').width / 2 -
      PixelRatio.getPixelSizeForLayoutSize(241) / 2,
  },
};

export { styles };
