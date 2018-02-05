import {
  Component,
  Render,
  StackView,
  Dimensions,
  Animated,
  Text,
  Button,
  Image,
  TouchableOpacity,
  LinearGradient,
  PixelRatio,
  Platform,
  NativeModules,
  View
} from '../index';

class example extends Component {
  render() {
    return (
      <StackView
      axis="vertical"
      style={{height:'auto', width:300}}>
        <Button onPress={()=>{this.onPressHandler('+')}} style={{height:50, width:100}}>button</Button>
        <TouchableOpacity onPress={()=>{this.onPressHandler('+')}} style={{height:50, width:100}}>
          <View style={{height:50, width:100, backgroundColor:'#ff00ff'}}></View>
        </TouchableOpacity>
      </StackView>
    );
  }
  onPressHandler(btn) {
    console.log('click');
  }
}

Render(example);
