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

class AnOtherClass extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onPressHandler('+');
        }}
        style={{ height: 50, width: 100 }}
      >
        <View style={{ height: 50, width: 100, backgroundColor: '#ffff00' }} />
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
        style={{ height: 50, width: 100 }}
      >
        <View style={{ height: 50, width: 100, backgroundColor: '#0000ff' }} />
      </TouchableOpacity>
    );
  }
}

class example extends Component {
  render() {
    return (
      <StackView axis="vertical" style={{ height: 300, width: 300 }}>
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
