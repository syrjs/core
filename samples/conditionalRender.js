import { Component, Render, Text, Dimensions, PixelRatio } from '../index';

class DisText extends Component {
  constructor(props) {
    super(props);
    this.state.showing = false;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showing: true,
      });
    }, 1000);
  }

  render() {
    const style = {
      left: Dimensions.get('window').width / 2,
      top: PixelRatio.getPixelSizeForLayoutSize(20),
      width: PixelRatio.getPixelSizeForLayoutSize(300),
      height: PixelRatio.getPixelSizeForLayoutSize(40),
      fontSize: PixelRatio.getPixelSizeForLayoutSize(20),
      color: '#000000',
    };
    if (!this.state.showing) {
      return <Text style={style}>showing</Text>;
    } else {
      return <Text style={style}>not showing</Text>;
    }
  }
}

Render(DisText);
