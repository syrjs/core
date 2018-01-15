import {
  Component,
  Render,
  View,
  Dimensions,
  Animated,
  Text,
  Button,
  Image,
  TouchableOpacity,
  LinearGradient,
  PixelRatio,
  Platform,
} from '../index';

const styles = {
  stage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#eeeeee',
  },
  button: {
    height: PixelRatio.getPixelSizeForLayoutSize(75),
    top:
      Dimensions.get('window').height -
      PixelRatio.getPixelSizeForLayoutSize(200),
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
    height: 50,
    top: PixelRatio.getPixelSizeForLayoutSize(50),
    left: 0,
    textAlign: 'center',
  },
};
class MyComponent extends Component {
  constructor() {
    // platform specific styling
    if (Platform.isWeb) {
      styles.button.border = '0';
    }

    super();
  }
  render() {
    return (
      <View style={styles.stage}>
        <Text style={styles.text}>Welcome to Syr Applications!</Text>
        <Button style={styles.button}>Test Button 1</Button>
      </View>
    );
  }
  componentDidMount() {
    console.log('componentDidMount');
    console.log(Platform.Version, Platform.OS, Platform.isWeb);
  }
}

Render(MyComponent);
