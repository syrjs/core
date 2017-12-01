import { Component, Render, View, Dimensions, Animated } from '../index';

const styles = {
  square : {
    width: 200,
    height: 100,
    backgroundColor: '#ff00ff',
    top: (Dimensions.get('window').height/2) - 50,
    left: (Dimensions.get('window').width/2) - 100,
    borderRadius: 30
  }
}
class MyComponent extends Component {
  constructor() {
    super();
    this.spinAnimation = new Animated.Value(0);
    this.opacityInAnimation = new Animated.Value(0);
    this.opacityOutAnimation = new Animated.Value(1);
    this.moveAimation = new Animated.ValueXY({ x: 0, y: 600 });
    styles.square.transform = [
      this.spinAnimation,
      { opacity: this.opacityInAnimation },
      { opacity: this.opacityOutAnimation },
      this.moveAimation,
    ];
  }
  render() {
    return <Animated.View style={styles.square} />;
  }
  moveUp() {
    Animated.timing(this.moveAimation, {
      toValue: { x: 0, y: 0 },
      duration: 5000,
    }).start(() => {
      this.spin();
    });
  }
  fadeIn() {
    Animated.timing(this.opacityInAnimation, {
      toValue: 1,
      duration: 5000,
    }).start(() => {
      this.fadeOut();
    });
  }
  fadeOut() {
    Animated.timing(this.opacityOutAnimation, {
      toValue: 0,
      duration: 5000,
    }).start(() => {
      this.fadeIn();
    });
  }
  spin() {
    Animated.timing(this.spinAnimation, {
      toValue: 360,
      duration: 5000,
    }).start(() => {
      this.spin();
    });
  }
  componentDidMount() {
    this.fadeIn();
    this.moveUp();
  }
}

Render(MyComponent);
