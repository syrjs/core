import { Component, View, Animated, Text, Image } from '../../index';

// styles for checkout
import { styles } from '../styles';

class Scrim extends Component {
  constructor() {
    super();
    this.shouldSpin = true;
    this.fadeSpinnerAnimation = new Animated.Value(1.0);
    this.spinSpinnerAnimation = new Animated.Value(0);
    styles.scrimView.transform = [{ opacity: this.fadeSpinnerAnimation }];
    styles.spinnerBackground.transform = [this.spinSpinnerAnimation];
  }
  render() {
    return (
      <View style={styles.scrimView}>
        <Animated.View style={styles.mainView}>
          <Animated.View style={styles.spinnerBackground} />
          <View style={styles.spinnerMask}>
            <Image
              style={styles.imageLock}
              source={{ uri: 'icon_lock_white' }}
            />
          </View>
          <Text style={styles.scrimMessage}>Securely logging you in.</Text>
        </Animated.View>
      </View>
    );
  }
  componentDidMount() {
    this.startSpinner();
  }
  startSpinner() {
    if (this.shouldSpin) {
      Animated.timing(this.spinSpinnerAnimation, {
        toValue: 360,
        duration: 5000,
      }).start(() => {
        this.startSpinner();
      });
    }
  }
  fadeOutSpinner() {
    Animated.timing(this.fadeSpinnerAnimation, {
      toValue: 0.0,
      duration: 500,
    }).start();
  }
}

export { Scrim };
