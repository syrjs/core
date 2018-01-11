import { Component, Render, View, Dimensions, Animated, Text, Button, Image, TouchableOpacity, LinearGradient } from '../index';

const styles = {
  stage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#eeeeee'
  },
  button: {
    height:150,
    top:Dimensions.get('window').height - 200,
    width:Dimensions.get('window').width - 200,
    left: (Dimensions.get('window').width/2) - (Dimensions.get('window').width - 200)/2,
    backgroundColor:"#0070ba", color: "#ffffff",
    borderRadius:15
  },
  text: {
    left: (Dimensions.get('window').width/2) - 500,
    top:(Dimensions.get('window').height/2) - 145, color: "#000000", fontSize:74
  }
};
class MyComponent extends Component {
  constructor() {
    super();
  }
  render() {
    return <View style={styles.stage}>
      <View style={{width:250,height:250,backgroundColor:"#ff00ff"}}></View>
      <Text style={styles.text}>
       Welcome to Syr Applications!
      </Text>
      <Button style={styles.button}>
        Syr Demo Button
      </Button>
     </View>;
  }
  componentDidMount() {

    console.log('componentDidMount');
  }
}

Render(MyComponent);
