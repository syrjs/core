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
        style={{ height: 50, width: 300 }}
      >
        <View style={{ height: 50, width: 200, backgroundColor: '#ff00ff' }} />
      </TouchableOpacity>
    );
  }
}

class AnOtherClass extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onPressHandler('+');
        }}
        style={{ height: 50, width: 300 }}
      >
        <View style={{ height: 50, width: 200, backgroundColor: '#ffff00' }} />
      </TouchableOpacity>
    );
  }
}

class SomeOtherClass extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onPressHandler('+');
        }}
        style={{ height: 50, width: 300 }}
      >
        <View style={{ height: 50, width: 200, backgroundColor: '#0000ff' }} />
      </TouchableOpacity>
    );
  }
}

class example extends Component {
  render() {
    return (
      <StackView
        axis="horizontal"
        spacing={20}
        style={{ height: 500, width: 800, left: 100, top: 100 }}
      >
        <OtherClass />
        <AnOtherClass />
        <SomeOtherClass />
      </StackView>
    );
  }
  onPressHandler(btn) {
    console.log('click');
  }
}

Render(example);
