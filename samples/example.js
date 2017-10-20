import { Component, Render, View, Animated, Button } from '../index';
import { styles } from './styles';
console.log('styles>>>', styles);

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
      <Animated.View style={styles.mainView}>
        <Button onPress={this.onPressClickMe}>Click Me</Button>
        <View style={styles.secondaryView}>{this.state.message}</View>
        <Image style={styles.image} source={{uri:'testImage'}}/>
      </Animated.View>
    );
  }
  onPressClickMe() {
      // animate in after mounting
      Animated.timing(this.parent, {
        toValue: { x: 0, y: 700 },
        duration: 500,
      }).start();
  }
  componentDidMount() {
      // animate in after mounting
      Animated.timing(this, {
        toValue: { x: 0, y: 250 },
        duration: 500,
      }).start();
  }
}

Render(MyComponent);
