import { Component, Render, View, Animated, Button, TextView } from '../index';
import { styles } from './styles';

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
        <Button onPress={this.onPressClickMe}></Button>
        <View style={styles.secondaryView}></View>
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
