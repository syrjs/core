import { Component, Render, View, Dimensions, Animated } from '../index';

const styles = {
  stage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: '#aa00ff',
    top: 0,
    left: 0,
  },
};
class MyComponent extends Component {
  constructor() {
    super();
    this.growAnimation = new Animated.Value(0);
    styles.square.transform = [{ height: this.growAnimation }];
  }
  render() {
    return (
      <View style={styles.stage}>
        <Animated.View style={styles.square} />
      </View>
    );
  }
  growShrink() {
    Animated.timing(this.growAnimation, {
      toValue: 300,
      duration: 1000,
    }).start(() => {
      Animated.timing(this.growAnimation, {
        toValue: 100,
        duration: 1000,
      }).start(() => {
        this.growShrink();
      });
    });
  }
  componentDidMount() {
    this.growShrink();
  }
}

Render(MyComponent);
