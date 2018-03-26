import { View, Component, Render, TouchableOpacity, StackView } from '../index';

// class MyTouchable extends Component {
//   render() {
//     return (
//       <View style={this.style}>
//         <TouchableOpacity name={this.props.name} onPress={()=>this.handlePress()} style={{width:200, height:100}}>
//           <View style={{width:100, height:100, backgroundColor:this.props.color}}></View>
//         </TouchableOpacity>
//       </View>
//     )
//   }
//   handlePress() {
//     console.log('clicked', this.props.color);
//   }
// }

// class MyComponent extends Component {
//   render(){
//     return <View style={{width:400, height:300}}>
//         <MyTouchable name="first" color="#00ff00" style={{top: 10, width:200, height:100}}/>
//         <MyTouchable name="second" color="#ff0000" style={{top: 120, width:200, height:100}}/>
//     </View>
//   }
// }

class OtherClass extends Component {
  constructor() {
    super();
    this.state.color = '#000000';
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onPressHandler();
        }}
        style={{ height: 50, width: 110, top: this.props.top }}
      >
        <AnOtherClass color={this.state.color} left={0} />
        <AnOtherClass color={this.state.color} left={55} />
      </TouchableOpacity>
    );
  }
  onPressHandler() {
    console.log('yoooooo', this.props.color, this.uuid);
    this.setState({
      color: this.props.color,
    });
  }
}
class AnOtherClass extends Component {
  render() {
    return (
      <View
        style={{
          height: 50,
          width: 50,
          backgroundColor: this.props.color,
          left: this.props.left,
        }}
      />
    );
  }
}
class example extends Component {
  render() {
    return (
      <StackView axis="vertical" style={{ height: 'auto', width: 300 }}>
        <OtherClass color="#ff00ff" style={{ height: 50 }} />
        <OtherClass color="#00ff00" style={{ height: 55 }} />
      </StackView>
    );
  }
}

Render(example);
