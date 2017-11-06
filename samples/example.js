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
} from '../index';
import { styles } from './styles';

class MyComponent extends Component {
  constructor() {
    super();
    // interpolation animation
    this.spinAnimation = new Animated.Value(0);
  }
  render() {
    styles.secondaryView.transform = [this.spinAnimation];
    return (
      <Animated.View style={styles.mainView}>
        <Animated.View style={styles.secondaryView} />
        <View style={styles.spinner}>
          <Image style={styles.image} source={{ uri: 'icon_lock_white' }} />
        </View>
        <Text style={styles.text}>Securely logging you in.</Text>
      </Animated.View>
    );
  }
  spin() {
    Animated.timing(this.spinAnimation, {
      toValue: 360,
      duration: 5000,
    }).start(() => {
      this.spin();
    });
  }
  componentDidMount() {
    this.spin();
  }
}

Render(MyComponent);
