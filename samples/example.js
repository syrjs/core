import { Component, Render, View, Animated } from '../index';

let style = {
  top: 0,
  left: 0,
  height: 700,
  width: 375,
  color: '#000000',
  backgroundColor: '#ff00ff',
};
class MyComponent extends Component {
  constructor() {
    super();
    this.state =  {
      message : "hello"
    }
    this.animation = new Animated.ValueXY({
      x: -375,
      y: 0
    });
  }
  render() {
    return (
      <Animated.View style={style}>
        {this.state.message}
      </Animated.View>
    );
  }
  componentDidMount() {
    Animated.timing(this, {
      toValue: {x: 0, y: 0},
      duration: 1000
    }).start();

    setTimeout(()=>{
      Animated.timing(this, {
        toValue: {x: -375, y: 0},
        duration: 1000
      }).start();
    }, 2000);
  }
}

Render(MyComponent);