import {
  Component,
  Render,
  StackView,
  ScrollView,
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
  onPressHandler(btn) {
    console.log('OtherClass');
  }


  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onPressHandler('+');
        }}
        style={{ height: 50, width: 300 }}
      >
        <View style={{ height: 500, width: 200, backgroundColor: '#ff00ff' }} />
      </TouchableOpacity>
    );
  }
}

class AnOtherClass extends Component {
  onPressHandler(btn) {
    console.log('AnOtherClass');
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onPressHandler('+');
        }}
        style={{ height: 50, width: 300 }}
      >
        <View style={{ height: 500, width: 200, backgroundColor: '#ffff00' }} />
      </TouchableOpacity>
    );
  }
}

class SomeOtherClass extends Component {
  onPressHandler(btn) {
    console.log('SomeOtherClass');
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onPressHandler('+');
        }}
        style={{ height: 50, width: 300 }}
      >
        <View style={{ height: 500, width: 200, backgroundColor: '#0000ff' }} />
      </TouchableOpacity>
    );
  }
}

class example extends Component {
  render() {
    return (
      <ScrollView style={{ height: 200, width: 1000}}>
      <StackView
        axis="vertical"
        spacing={20}
        style={{ height: 500, width: 1000}}
      >
        <OtherClass />
        <AnOtherClass />
        <SomeOtherClass />
      </StackView>
      </ScrollView>
    );
  }
  onPressHandler(btn) {
    console.log('click');
  }
}

Render(example);
