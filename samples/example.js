import { Component, Render, View, Dimensions, Animated, Text, Button, Image, TouchableOpacity, LinearGradient } from '../index';

console.log(Dimensions.get('window'));
const styles = {
  square: {
    width: Dimensions.get('window').width,
    height: 300,
    backgroundColor: '#f000f0',
    top: 200,
    left: 0,
    borderRadius: 30,
  },
};
class MyComponent extends Component {
  constructor() {
    super();
  }
  render() {
    return <View style={styles.square}>
      <LinearGradient style={{width:500,height:220}}/>
      <Text style={{left: 0, top:245, color: "#00ffff", fontSize:74, fontWeight:"bold"}}>Two of These!</Text>
      <Button onPress={()=>this.onPress()} style={{left:50,backgroundColor: '#000000', color:"#ffffff", width:200, height:200, borderRadius:30}}>Foo Bar Moar</Button>
      <TouchableOpacity onPress={()=>this.onImagePress()} style={{top:150,left:(300/2)-(75/2), height:75, width:75}}><Image style={{height:75, width:75}}/></TouchableOpacity>
    </View>;
  }
  onImagePress() {
    console.log('Image was pressed!');
  }
  onPress() {
    console.log('I was pressed!');
  }
  componentDidMount() {

    console.log('Yup I Did 2');
  }
}

Render(MyComponent);
