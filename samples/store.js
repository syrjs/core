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
  SyrStore,
} from '../index';

// currently required to pull images in to web.
// maps with iOS
// need a better way to handle these through the image loader

SyrStore.setInitialState({
  testMessage: 'first state',
});

SyrStore.reduce = function(action, payload) {
  switch (action) {
    case 'test':
      SyrStore.dispatch(returnNewState(payload));
      console.log(action, payload);
      break;
  }
};

const returnNewState = function(newState) {
  return Object.assign({}, SyrStore.getState(), newState);
};

class OtherClass extends Component {
  render() {
    return (
      <View
        style={{
          top: 200,
          height: 100,
          width: 300,
          backgroundColor: '#0000ff',
        }}
      >
        <Text style={{ height: 100, width: 300 }}>{'woooot'}</Text>
      </View>
    );
  }
}

class MyComponent extends Component {
  render() {
    return (
      <View style={{ height: 300, width: 300, backgroundColor: '#000000' }}>
        <View style={{ height: 100, width: 300, backgroundColor: '#ff00ff' }}>
          <Text style={{ height: 100, width: 300 }}>
            {this.props.data.testMessage}
          </Text>
        </View>
        <View
          style={{
            top: 100,
            height: 100,
            width: 300,
            backgroundColor: '#00ff00',
          }}
        >
          <Text style={{ height: 100, width: 300 }}>{'woooot'}</Text>
        </View>
        <OtherClass />
      </View>
    );
  }
  componentDidMount() {
    SyrStore.reduce('test', {
      testMessage: 'second state.',
    });
  }
}

Render(SyrStore.createFunctionalComponent(MyComponent));
