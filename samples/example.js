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
    styles.square.transform = [this.spinAnimation];
  }
  render() {
    return <Animated.View style={styles.square}></Animated.View>
  }
  spin() {
    Animated.timing(this.spinAnimation, {
      toValue: 360,
      duration: 1000
    }).start(()=>{
      this.spin();
    });
  }
  componentDidMount() {
    this.spin();
  }
}

Render(MyComponent);
