import { Component, Render, View, Animated } from '../index';

let style = {
  top: 50,
  left: 50,
  height: 200,
  width: 200,
  color: '#ffffff',
  backgroundColor: '#00fff0',
};

let otherstyle = {
  color: '#333333',
  backgroundColor: '#ffffff',
};

class MyComponent extends Component {
  render() {
    return (
      <View style={style}>
        Hi
      </View>
    );
  }
  componentDidMount() {
    console.log('component mounted');
    setTimeout(()=>{
        console.log('render again', MyComponent);
    }, 1000);
  }
}

Render(MyComponent);