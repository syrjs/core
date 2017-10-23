import { Component, Render, View, Animated, Button, TextView, Image } from '../index';
import { styles } from './styles';

class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      message: 'This is a Slide Up',
    };

    // 2d slide animation
    this.slideAnimation = new Animated.ValueXY({
      x: 0,
      y: 700,
    });

    // interpolation animation
    this.spinAnimation = new Animated.Value(0);
  }
  render() {
    styles.mainView.transform = [this.slideAnimation, this.spinAnimation];
    return (
      <Animated.View style={styles.mainView}>
        <Button style={styles.button} onPress={this.onPressClickMe.bind(this)}></Button>
        <View style={styles.secondaryView}>
          <Text>Something</Text>
        </View>
        <Image style={styles.image} source={{uri:'testImage'}}/>
      </Animated.View>
    );
  }
  onPressClickMe() {
      // animate in after mounting
      Animated.timing(this.slideAnimation, {
        toValue: { x: 0, y: 700 },
        duration: 1000,
      }).start();
  }
  componentDidMount() {
    console.log(this.spinAnimation);
      // this.setState({
      //   message: 'hello how are you'
      // });
      //animate in after mounting
      // Animated.timing(this.slideAnimation, {
      //   toValue: { x: 0, y: 250 },
      //   duration: 1000,
      // }).start();

      Animated.timing(this.spinAnimation, {
        toValue: 1,
        duration: 1000
      }).start();
  }
}

Render(MyComponent);
