import { Component, Render, View, Dimensions, Animated } from '../index';

const styles = {
  stage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  spinX: {
    width: 200,
    height: 100,
    backgroundColor: '#ff00ff',
    top: Dimensions.get('window').height / 2 - 200,
    left: Dimensions.get('window').width / 2 - 100,
    borderRadius: 30,
  },
  spinY: {
    width: 200,
    height: 100,
    backgroundColor: '#ff00ff',
    top: Dimensions.get('window').height / 2 - 50,
    left: Dimensions.get('window').width / 2 - 100,
    borderRadius: 30,
  },
  spinZ: {
    width: 200,
    height: 100,
    backgroundColor: '#00ff00',
    top: Dimensions.get('window').height / 2 + 100,
    left: Dimensions.get('window').width / 2 - 100,
    borderRadius: 30,
  },
};
class MyComponent extends Component {
  constructor() {
    super();
    this.spinXAnimation = new Animated.Value(0);
    this.spinYAnimation = new Animated.Value(0);
    this.spinZAnimation = new Animated.Value(0);
    styles.spinX.transform = [{ x: this.spinXAnimation }];
    styles.spinY.transform = [{ y: this.spinYAnimation }];
    styles.spinZ.transform = [{ z: this.spinZAnimation }];
  }
  render() {
    return (
      <View style={styles.stage}>
        <Animated.View style={styles.spinX} />
        <Animated.View style={styles.spinY} />
        <Animated.View style={styles.spinZ} />
      </View>
    );
  }
  spin() {
    // start X axis spinning animation
    Animated.timing(this.spinXAnimation, {
      toValue: 360,
      duration: 5000,
    }).start(() => {
      // start spinning again when complete
      this.spin();
    });

    // start Y axis spinning animation
    Animated.timing(this.spinYAnimation, {
      toValue: 360,
      duration: 5000,
    }).start();

    // start Z axis spinning animation
    Animated.timing(this.spinZAnimation, {
      toValue: 360,
      duration: 5000,
    }).start();
  }
  componentDidMount() {
    this.spin();
  }
}

Render(MyComponent);
