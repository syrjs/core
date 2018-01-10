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
      <Text style={{left: 0, top:245}}>Two of These!</Text>
      <Button>Foo Bar Moar</Button>
      <Image style={{top:150,left:(300/2)-(75/2), height:75, width:75}}/>
    </View>;
  }
  componentDidMount() {
    console.log('Yup I Did');
  }
}

Render(MyComponent);
