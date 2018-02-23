import {
  Component,
  Render,
  StackView,
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
  View,
} from '../index';

class OtherClass extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onPressHandler('+');
        }}
        style={{ height: 50, width: 100 }}
      >
        <View style={{ height: 50, width: 100, backgroundColor: '#ff00ff' }} />
      </TouchableOpacity>
    );
  }
}

class example extends Component {
  render() {
    return (
      <StackView axis="vertical" style={{ height: 400, width: 300 }}>
        <Button
          onPress={() => {
            this.onPressHandler('+');
          }}
          style={{ height: 50, width: 100 }}
        >
          button
        </Button>
        <Button
          onPress={() => {
            this.onPressHandler('+');
          }}
          style={{ height: 50, width: 100 }}
        >
          button
        </Button>
        <Button
          onPress={() => {
            this.onPressHandler('+');
          }}
          style={{ height: 50, width: 100 }}
        >
          button
        </Button>
        <Button
          onPress={() => {
            this.onPressHandler('+');
          }}
          style={{ height: 50, width: 100 }}
        >
          button
        </Button>
        <Button
          onPress={() => {
            this.onPressHandler('+');
          }}
          style={{ height: 50, width: 100 }}
        >
          button
        </Button>
        <OtherClass />
      </StackView>
    );
  }
  onPressHandler(btn) {
    console.log('click');
  }
}

Render(example);
