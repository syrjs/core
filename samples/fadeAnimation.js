import { Component, Render, View, Dimensions, Animated } from '../index';

const styles = {
  stage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  fadeOut: {
    width: 200,
    height: 100,
    backgroundColor: '#aa00ff',
    top: Dimensions.get('window').height / 2 - 200,
    left: Dimensions.get('window').width / 2 - 100,
    borderRadius: 30,
  },
};
class MyComponent extends Component {
  constructor() {
    super();
    this.fadeOutAnimation = new Animated.Value(1);
    this.fadeInAnimation = new Animated.Value(0);
    styles.fadeOut.transform = [
      { opacity: this.fadeOutAnimation },
      { opacity: this.fadeInAnimation },
    ];
  }
  render() {
    return (
      <View style={styles.stage}>
        <Animated.View style={styles.fadeOut} />
      </View>
    );
  }
  pulse() {
    // start X axis spinning animation
    Animated.timing(this.fadeOutAnimation, {
      toValue: 0,
      duration: 500,
    }).start(() => {
      Animated.timing(this.fadeInAnimation, {
        toValue: 1,
        duration: 500,
      }).start(() => {
        this.pulse();
      });
    });
  }
  componentDidMount() {
    this.pulse();
  }
}

// Render(MyComponent);
export { MyComponent };
