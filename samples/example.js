import { Component, Render, View, Animated } from '../index';

let style = {
  top: 0,
  left: 0,
  height: 450,
  width: 375,
  color: '#000000',
  backgroundColor: '#ff00ff',
};

let otherStyle = {
  top: 60,
  left: 0,
  height: 150,
  width: 375,
  color: '#000000',
  backgroundColor: '#fff000',
};

let otherOtherStyle = {
  top: 100,
  left: 0,
  height: 150,
  width: 375,
  color: '#000000',
  backgroundColor: '#fffff0',
};

class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      message: 'This is a Slide Up',
    };
    this.animation = new Animated.ValueXY({
      x: 0,
      y: 700,
    });
  }
  render() {
    return (
      <Animated.View style={style}>
        <View style={otherStyle}>Sup</View>
        <View style={otherOtherStyle}>Sup</View>
        {this.state.message}
      </Animated.View>
    );
  }
  componentDidMount() {
      Animated.timing(this, {
        toValue: { x: 0, y: 250 },
        duration: 1000,
      }).start();

      setTimeout(() => {
        Animated.timing(this, {
          toValue: { x: 0, y: 700 },
          duration: 1000,
        }).start();
      }, 2000);
  }
}

Render(MyComponent);
