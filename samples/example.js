import {
  Component,
  Render,
  View,
  Animated,
  Button,
  Text,
  Image,
  EventEmitter,
  ScrollView,
  Dimensions,
  LinearGradient
} from '../index';
import { styles } from './styles';

class MyComponent extends Component {
  constructor() {
    super();
    // interpolation animation
    this.shouldSpin = true;
    this.fadeAnimation = new Animated.Value(1.0);
    this.spinAnimation = new Animated.Value(0);
    this.slideAnimation = new Animated.ValueXY({x: 0, y: Dimensions.get('window').height});
  }
  render() {
    styles.scrimView.transform = [{ opacity: this.fadeAnimation }];
    styles.secondaryView.transform = [this.spinAnimation];
    styles.ryi.transform = [this.slideAnimation];
    return (
      <View style={styles.stage}>
        <View style={styles.scrimView}>
          <Animated.View style={styles.mainView}>
            <Animated.View style={styles.secondaryView} />
            <View style={styles.spinner}>
              <Image style={styles.image} source={{ uri: 'icon_lock_white' }} />
            </View>
            <Text style={styles.text}>Securely logging you in.</Text>
          </Animated.View>
        </View>
        <Animated.View style={styles.ryi}>
          <LinearGradient style={styles.gradientView}></LinearGradient>
        </Animated.View>
      </View>
    );
  }
  fade() {
    Animated.timing(this.fadeAnimation, {
      toValue: 0.0,
      duration: 2000,
    }).start();
  }
  slide() {
    Animated.timing(this.slideAnimation, {
      duration: 1000,
      toValue: {
        y: (Dimensions.get('window').height / 2)
      }
    }).start(()=>{
      this.fade();
      this.shouldSpin = false;
    });
  }
  spin() {
    if (this.shouldSpin) {
      Animated.timing(this.spinAnimation, {
        toValue: 360,
        duration: 5000,
      }).start(() => {
        this.spin();
      });
    }
  }
  componentDidMount() {
    this.spin();
    this.slide();
  }
}

Render(MyComponent);
