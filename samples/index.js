import { Component, Render, Animated, Image, Dimensions } from '../index';

import { Scrim } from './components/scrim';
import { PaySheet } from './components/paysheet';

// styles for checkout
import { styles } from './styles';

// native checkout component
class NativeCheckout extends Component {
  constructor() {
    super();

    // setup animations
    this.slideRYIAnimation = new Animated.ValueXY({
      x: 0,
      y: Dimensions.get('window').height,
    });
    this.resizeRYIAnimation = new Animated.Value(0);
    this.slideStageAnimation = new Animated.ValueXY({
      x: 0,
      y: Dimensions.get('window').height,
    });
    this.slideOut = new Animated.ValueXY({ x: 0, y: 0 });
    this.slideIn = new Animated.ValueXY({
      x: Dimensions.get('window').width,
      y: 0,
    });

    // bind animations to styles

    styles.ryi.transform = [
      this.slideRYIAnimation,
      { height: this.resizeRYIAnimation },
    ];
    styles.stage.transform = [this.slideStageAnimation];
    styles.reviewPage.transform = [this.slideOut];
    styles.walletPage.transform = [this.slideIn];
  }
  render() {
    // render UI
    return (
      <Animated.View style={styles.stage}>
        <Scrim />
        <PaySheet userConsentHandler={this.userConsentHandler.bind(this)} />
      </Animated.View>
    );
  }
  growRYI() {
    // resizes the RYI
    Animated.timing(this.resizeRYIAnimation, {
      duration: 1000,
      toValue: 550,
    }).start();

    Animated.timing(this.slideRYIAnimation, {
      duration: 1000,
      toValue: {
        y: 200,
      },
    }).start();
  }
  hideRYI() {
    Animated.timing(this.slideOut, {
      duration: 500,
      toValue: {
        x: -Dimensions.get('window').width,
        y: 0,
      },
    }).start();
    this.slideRYIAnimation.y = Dimensions.get('window').height / 2;
    this.growRYI();

    Animated.timing(this.slideIn, {
      duration: 750,
      toValue: {
        x: 0,
        y: Dimensions.get('window').height,
      },
    }).start();

    // this needs to be maintained by state
    // this.slideRYIAnimation.y = Dimensions.get('window').height / 2;

    // Animated.timing(this.slideRYIAnimation, {
    //   duration: 750,
    //   toValue: {
    //     y: Dimensions.get('window').height,
    //   },
    // }).start();

    // setTimeout(()=>{
    //   this.slideStageAnimation.y = 0;
    //   Animated.timing(this.slideStageAnimation, {
    //     toValue: {
    //       y: Dimensions.get('window').height
    //     },
    //     duration: 500
    //   }).start();
    // }, 1000)
  }
  // when the user presses the consent button
  userConsentHandler() {
    this.hideRYI();
  }
  // when the spinner fades out

  // slide in the RYI sheet
  slideInRyi() {
    Animated.timing(this.slideRYIAnimation, {
      duration: 750,
      toValue: {
        y: Dimensions.get('window').height / 2,
      },
    }).start(() => {
      this.fadeOutSpinner();
      this.shouldSpin = false;
    });
  }

  // when the component is available via the UI
  componentDidMount() {
    Animated.timing(this.slideStageAnimation, {
      toValue: {
        y: 0,
      },
      duration: 500,
    }).start(() => {
      this.setProps({
        foo: 'bar',
      });
    });
  }
}

// render this Component
Render(NativeCheckout);
