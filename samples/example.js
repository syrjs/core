import { Component, Render, View, Dimensions, Animated, Text, Button, Image } from '../index';

const styles = {
  square: {
    width: 200,
    height: 100,
    backgroundColor: '#ff00ff',
    top: Dimensions.get('window').height / 2 - 50,
    left: Dimensions.get('window').width / 2 - 100,
    borderRadius: 30,
  },
};
class MyComponent extends Component {
  constructor() {
    super();
  }
  render() {
    return <View style={styles.square}>
      <Text>Hello World Test</Text>
    </View>;
  }
  componentDidMount() {
    console.log('component did mount');
  }
}

Render(MyComponent);
