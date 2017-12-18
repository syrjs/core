import { Component, View, Animated, LinearGradient } from '../../index';

// styles for checkout
import { styles } from '../styles';
import { Ryi } from './ryi';
import { Addresses } from './addresses';

class PaySheet extends Component {
  render() {
    return (
      <Animated.View style={styles.ryi}>
        <LinearGradient
          colors={['#0070BA', '#02578F']}
          style={styles.gradientView}
        />
        <Ryi userConsentHandler={this.userConsentHandler.bind(this)} />
        <Addresses />
      </Animated.View>
    );
  }
  userConsentHandler() {
    // check to see if there is a passed in handler
    if (this.props.userConsentHandler) this.props.userConsentHandler();
  }
}

export { PaySheet };
