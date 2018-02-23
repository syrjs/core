import { Component, Render, View, Text, Button } from '../index';

let style = {
  backgroundColor: '#ffffff',
  height: 300,
  width: 300,
};

class ButtonThing extends Component {
  render() {
    console.log(this.uuid);
    return (
      <Button
        onPress={() => this.props.press()}
        style={{ width: 300, height: 150 }}
      >
        Click Me
      </Button>
    );
  }
}

class HelloWorld extends Component {
  render() {
    return (
      <Text
        style={{
          backgroundColor: '#00ff00',
          height: 100,
          width: 100,
        }}
      >
        {this.props.fooProp}
      </Text>
    );
  }
  componentWillReceiveProps(nextProps) {
    console.log('HelloWorld recieve props');
  }
}

class SyrExample extends Component {
  constructor() {
    super();
    this.state = { fooProp: '1st' };
  }
  render() {
    return (
      <View style={style}>
        <HelloWorld fooProp={this.state.fooProp} />
        <ButtonThing press={() => this.handleClick()} />
      </View>
    );
  }
  handleClick() {
    style.backgroundColor = '#ff00ff';
    this.setState({
      fooProp: '22220nd',
    });
    console.log('button click');
  }
  componentDidMount() {
    console.log('componentDidMount!');

    setTimeout(() => {
      style.backgroundColor = '#0000ff';

      this.setState({
        fooProp: '200nd',
      });
    }, 1000);
  }
}

Render(SyrExample);
