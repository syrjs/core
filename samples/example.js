import { Component, Render, View, Dimensions, Animated, Text, Button, Image } from '../index';

const styles = {
  square: {
    width: 300,
    height: 300,
    backgroundColor: '#f000f0',
    top: 200,
    left: 300,
    borderRadius: 30,
  },
};
class MyComponent extends Component {
  constructor() {
    super();
  }
  render() {
    return <View style={styles.square}>
      <Text style={{left: 10, top:30}}>Off to the Races?!</Text>
      <Text style={{left: 10, top:15}}>Two of These!</Text>
    </View>;
  }
  componentDidMount() {
    console.log('Yup I Did');
  }
}

Render(MyComponent);
