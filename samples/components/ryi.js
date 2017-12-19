import {
  Component,
  View,
  Animated,
  Button,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from '../../index';

// styles for checkout
import { styles } from '../styles';

class Ryi extends Component {
  render() {
    return (
      <Animated.View style={styles.reviewPage}>
        <Image style={styles.ppLogo} source={{ uri: 'pp_logo_white' }} />
        <Text style={styles.greetingText}>Hi Christopher</Text>
        <Text style={styles.notYouText}>Not You?</Text>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: 'icon_profile_phantom_black' }}
          />
        </View>
        <Button
          onPress={this.userConsentHandler.bind(this)}
          style={styles.userConsentButton}
        >
          Continue
        </Button>
      </Animated.View>
    );
  }
  userConsentHandler() {
    // check to see if there is a passed in handler
    if (this.props.userConsentHandler) this.props.userConsentHandler();
  }
}

export { Ryi };
