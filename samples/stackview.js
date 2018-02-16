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

class OtherClass extends Component {
  constructor(){
    super();
    this.state.color = '#ff00ff'
  }
  render() {
    let self = this;
    return (
      <TouchableOpacity onPress={ () => {
        console.log('My key', this.props.key, this.uuid);
        this.setState({
          color: '#000000'
        }, () => {
          console.log('Changed State :', this.state)
        })
    }} style={{height:50, width:100}}>
          <View style={{height:50, width:100, backgroundColor: this.state.color}}></View>
      </TouchableOpacity>
    )
  }
}



class example extends Component {
  constructor() {
    super();
    this.state.array= [1,2,3];
  }
  componentDidMount() {
    this.setState({
      array: [1,2,3,4]
    })
  }
  render() {
    return (
      <StackView
      axis="vertical"
      style={{height:'auto', width:300}}
      spacing="100"
      >
      {this.returnClass()}
      </StackView>
    );
  }

  returnClass() {
    return this.state.array.map((a) => {
      return  <OtherClass key={a}></OtherClass>
    })
  }
  onPressHandler(btn) {
    console.log('click');
  }
}

Render(example);
