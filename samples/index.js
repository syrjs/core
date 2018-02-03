import {
  Component,
  Render,
  View,
  Dimensions,
  Animated,
  Text,
  Button,
  Image,
  TouchableOpacity,
  LinearGradient,
  PixelRatio,
  Platform,
  NativeModules
} from '../index';


class Rectangle extends Component {
  constructor() {
    super()
    this.state.backgroundColor = '#ffffff';
  }
  render() {
    return (
      <View style={{
        top: this.attributes.top,
        width: 100,
        height: 50,
        backgroundColor: this.state.backgroundColor
      }}>
     <Text style={{width:100, height:50, fontSize: 12, color:'#000000'}}>Hello World</Text>
    </View>
    )
  }
  componentDidMount() {
    console.log('rectangle mounted with:', this.attributes.color);
    this.setState({
        backgroundColor:'#ff0000'
    })
    // if(this.attributes.color == 'red') {
    //
    // }
    // if(this.attributes.color == 'blue') {
    //   this.setState({
    //     backgroundColor:'#0000ff'
    //   })
    // }
    // if(this.attributes.color == 'green') {
    //   this.setState({
    //     backgroundColor:'#00ff00'
    //   })
    // }
  }
}


class Square extends Component {
  render() {
    return (
      <View style={{
        width: 200,
        height: 200,
        backgroundColor: '#ff00ff'
      }}>
        <Rectangle color="red" top="0"></Rectangle>
        <Rectangle color="blue" top="60"></Rectangle>
        <Rectangle color="green" top="120"></Rectangle>
      </View>
    )
  }
  componentDidMount() {
    console.log('square mounted!');
  }
}

class SyrExample extends Component {
  render() {
    return (
      <View style={{
        width: 200,
        height: 200,
        backgroundColor: '#000000'
      }}>
        <Square></Square>
      </View>
    );
  }
  componentDidMount() {
    console.log('syrExample', this.uuid, this.guid);
  }
}

Render(SyrExample);
