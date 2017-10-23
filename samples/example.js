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
      y: 0,
    });

    // interpolation animation
    this.spinAnimation = new Animated.Value(0);
  }
  render() {
    styles.mainView.transform =[this.slideAnimation];
    styles.image.transform = [this.spinAnimation];
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
  spin() {
    Animated.timing(this.spinAnimation, {
      toValue: 360,
      duration: 2000
    }).start(()=>{
      this.spin();
    });
  }
  slideUp() {

    this.slideAnimation.setValue({x:0, y:600});
    Animated.timing(this.slideAnimation, {
      toValue: { x: 0, y: 0 },
      duration: 1000,
    }).start(()=>{
      this.slideDown()
    });
  }
  slideDown() {
    this.slideAnimation.setValue({x:0, y:0});
    Animated.timing(this.slideAnimation, {
      toValue: { x: 0, y: 600 },
      duration: 1000,
    }).start(()=>{
      this.slideUp();
    });
  }
  componentDidMount() {
      this.spin();
      this.slideUp();
  }
}

Render(MyComponent);
