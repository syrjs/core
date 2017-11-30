import { Component, Render, View, Dimensions, Animated } from '../index';

const styles = {
  square : {
    width: 100,
    height: 100,
    backgroundColor: '#ff0000',
    top: (Dimensions.get('window').height/2) - 50,
    left: (Dimensions.get('window').width/2) - 50
  }
}
class MyComponent extends Component {
  constructor() {
    super();
    this.spinAnimation = new Animated.Value(0);
    this.opacityAnimation = new Animated.Value(0);
    styles.square.transform = [this.spinAnimation, {opacity: this.opacityAnimation}];
  }
  render() {
    return <Animated.View style={styles.square}></Animated.View>
  }
  fade(){
    Animated.timing(this.opacityAnimation, {
      toValue: 1,
      duration: 5000
    }).start(()=>{
      this.fade();
    });
  }
  spin() {
    Animated.timing(this.spinAnimation, {
      toValue: 360,
      duration: 5000
    }).start(()=>{
      this.spin();
    });
  }
  componentDidMount() {
    this.spin();
    this.fade();
  }
}

Render(MyComponent);
