import { Component, Render, View, Animated, Button } from '../index';

let style = {
  top: 0,
  left: 0,
  height: 450,
  width: 375,
  color: '#000000',
  backgroundColor: '#ff00ff',
};

let otherStyle = {
  top: 60,
  left: 0,
  height: 150,
  width: 375,
  color: '#000000',
  backgroundColor: '#fff000',
};

let otherOtherStyle = {
  top: 100,
  left: 0,
  height: 150,
  width: 375,
  color: '#000000',
  backgroundColor: '#fffff0',
};

class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      message: 'This is a Slide Up',
    };
    this.animation = new Animated.ValueXY({
      x: 0,
      y: 700,
    });
  }
  render() {
    return (
      <Animated.View style={style}>
        <Button>Click Me</Button>
        <View style={otherOtherStyle}>{this.state.message}</View>
      </Animated.View>
    );
  }
  componentWillUpdate() {
    console.log('component will update');
  }
  componentDidUpdate() {
    console.log('component did update');
  }
  componentDidMount() {
      // animate in after mounting
      Animated.timing(this, {
        toValue: { x: 0, y: 250 },
        duration: 500,
      }).start(()=>{

      setTimeout(()=>{
          // set style before altering state
          style.backgroundColor = "#ff000f";
          // setting state forces a re-render
          this.setState({
            message: 'Hi How Are You Doing?'
          });

          // animate away
          setTimeout(()=>{
            Animated.timing(this, {
              toValue: { x: 0, y: 700 },
              duration: 500,
            }).start();
          }, 1000)
        });
      });
  }
}

Render(MyComponent);
