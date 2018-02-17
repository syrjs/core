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
  StackView
} from '../index';

// currently required to pull images in to web.
// maps with iOS
// need a better way to handle these through the image loader
require('./images/piggy.png');

// important for mobile development esp around resolution scaling
// this should mirror the DEVELOPMENT time screen so that
// PixelRatio.getPixelSizeForLayoutSize(15) === 15
// it will then be scaled to the correct size on other screens
// the default is iPhoneSE
PixelRatio.setBaseScreenSize(PixelRatio.baseDisplays.iPhoneSE);

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
    this.state.color = "#ff0000"
  }
  render() {
    return <View style={{height: PixelRatio.getPixelSizeForLayoutSize(300), width: PixelRatio.getPixelSizeForLayoutSize(300), backgroundColor:this.state.color}}></View>
  }
  componentDidMount() {
    //console.log('setting state inner component');
    setTimeout(()=>{
      this.setState({
        color: "#00ff00"
      })
    }, 500)
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
    styles.image.transform = [{ rotatey: this.spinPiggyAnimation}];
  }
  render() {
    return (
      <Animated.View style={styles.stage}>
        <Text style={styles.text}>{this.state.message}</Text>
        {/* <InnerComponent/> */}
        <Animated.Image source={{ uri: 'piggy' }} style={styles.image} />
        <Button enabled={this.state.buttonEnabled} onPress={() => this.onPress()} style={styles.button}>
          {this.state.buttonMessage}
        </Button>
      </Animated.View>
    );
  }
  onPress() {
    //console.log('button pressed');
    this.num += 1;
    this.setState({
      buttonMessage: 'Pressed: ' + this.num,
    });

    if(!Platform.isWeb) {
      NativeModules.SyrView.testExportMethod("Super", 42);
    }
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

Render(MyComponent);
