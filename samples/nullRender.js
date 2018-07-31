import { Component, Render, View, Button, PixelRatio } from '../index';

class example extends Component {
  constructor(props) {
    super(props);
    this.state.doRender = false;
  }
  render() {
    return null;
  }
  componentDidMount() {
    console.log('component did mount');
  }
  handleOnRemove() {
    this.setState({
      doRender: false,
    });
  }
  handleOnAdd() {
    this.setState({
      doRender: true,
    });
  }
}

Render(example);
