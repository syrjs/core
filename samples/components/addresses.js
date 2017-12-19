import {
  Component,
  Animated,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from '../../index';

// styles for checkout
import { styles } from '../styles';

// native checkout component
class Addresses extends Component {
  render() {
    // render UI
    return (
      <Animated.View style={styles.walletPage}>
        <Image style={styles.backIcon} source={{ uri: 'icon_back_white' }} />
        <Text style={styles.walletHeaderText}>Addresses</Text>
        <ScrollView
          style={{
            top: 75,
            left: 12,
            width: Dimensions.get('window').width - 24,
            height: 950,
            backgroundColor: '#000000',
          }}
        >
          <Text style={{ width: 300, height: 75 }}>Addresses</Text>
          <Text style={{ top: 50, width: 300, height: 75 }}>Addresses</Text>
          <Text style={{ top: 100, width: 300, height: 75 }}>sada</Text>
          <Text style={{ top: 150, width: 300, height: 75 }}>asdasd</Text>
          <Text style={{ top: 200, width: 300, height: 75 }}>asdasd</Text>
          <Text style={{ top: 250, width: 300, height: 75 }}>asdas</Text>
          <Text style={{ top: 300, width: 300, height: 75 }}>asdas</Text>
        </ScrollView>
      </Animated.View>
    );
  }
}

export { Addresses };
