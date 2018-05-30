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
  NativeModules,
  SyrNavigator,
} from '../index';

// currently required to pull images in to web.
// maps with iOS
// need a better way to handle these through the image loader
require('./images/piggy.png');

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
    backgroundColor: '#ff00ff',
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

class InnerComponent extends Component {
  constructor() {
    super();
    this.state.color = '#ff00ff';
  }
  render() {
    return (
      <View
        style={{ height: 100, width: 100, backgroundColor: this.state.color }}
      />
    );
  }
  componentDidMount() {
    console.log('setting state inner component');

    setTimeout(() => {
      this.setState({
        color: '#000000',
      });
    }, 1000);
  }
}

class MyComponent extends Component {
  constructor() {
    // platform specific styling
    if (Platform.isWeb) {
      styles.button.border = '0';
    }
    super();
    this.num = 0;
    this.spin = 0;
    this.state = {
      buttonEnabled: true,
      buttonMessage: 'Pressed: ' + this.num,
      message: 'Spinning Image: ' + this.spin,
    };
    this.spinPiggyAnimation = new Animated.Value(0);
    styles.image.transform = [{ rotatey: this.spinPiggyAnimation }];
  }
  render() {
    return (
      <Animated.View style={styles.stage}>
        <Text style={styles.text}>{this.state.message}</Text>
        <Animated.View style={styles.image} />
        <InnerComponent />
        <Button
          enabled={this.state.buttonEnabled}
          onPress={() => this.onPress()}
          style={styles.button}
        >
          {this.state.buttonMessage}
        </Button>
      </Animated.View>
    );
  }
  onPress() {
    SyrNavigator.dispatch({});
    // this.num += 1;
    // this.setState({
    //   buttonMessage: 'Pressed: ' + this.num,
    // });
  }
  spinPiggy() {
    this.spin += 1;
    Animated.timing(this.spinPiggyAnimation, {
      toValue: 360,
      duration: 2000,
    }).start(() => {
      this.setState({
        message: 'Spinning Image: ' + this.spin,
      });
      this.spinPiggy();
    });
  }
  componentDidMount() {
    this.spinPiggy();
  }
}

// Render(MyComponent);

export { MyComponent };
