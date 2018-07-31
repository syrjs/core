import {
  Component,
  Render,
  View,
  StackView,
  Dimensions,
  Button,
  PixelRatio,
  Text,
} from '../index';

class DisText extends Component {
  constructor(props) {
    super(props);
    this.state.showing = false;
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
    if (!this.props.showing) {
      return <Text style={style}>showing</Text>;
    } else {
      return <Text style={style}>not showing</Text>;
    }
  }
}

class MyView extends Component {
  render() {
    return (
      <View
        style={{
          width: 50,
          height: 50,
          top: this.props.key * 55,
          backgroundColor: '#000000',
        }}
      />
    );
  }
  componentDidMount() {
    console.log(this.props.key, ' -- mounted');
  }
  componentWillUnmount() {
    console.log(this.props.key, ' -- unmounted');
  }
}

function getItems(n) {
  let components = [];
  for (let i = 0; i <= n - 1; i++) {
    components.push(<MyView key={i} />);
  }
  return components;
}

class example extends Component {
  constructor(props) {
    super(props);
    this.componentCount = 0;
    this.state.components = getItems(0);
    this.state.showing = false;
  }
  render() {
    // console.log('uuid', this.uuid);
    return (
      <View
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          backgroundColor: '#09aea4',
        }}
      >
        <View style={{ height: 700, width: 100 }}>{this.state.components}</View>
        <Button
          onPress={() => this.handleOnAdd()}
          style={{
            width: 200,
            height: 150,
            color: '#ffffff',
            backgroundColor: '#0f0f0f',
            top: 100,
            left: 100,
          }}
        >
          Add Item
        </Button>
        <Button
          onPress={() => this.handleOnRemove()}
          style={{
            width: 200,
            height: 150,
            color: '#ffffff',
            backgroundColor: '#0f0f0f',
            top: 265,
            left: 100,
          }}
        >
          Remove Item
        </Button>
        <DisText showing={this.state.showing} />
      </View>
    );
  }
  handleOnRemove() {
    this.componentCount = this.componentCount - 1;
    this.setState({
      components: getItems(this.componentCount),
      showing: false,
    });
  }
  handleOnAdd() {
    this.componentCount = this.componentCount + 1;
    this.setState({
      components: getItems(this.componentCount),
      showing: true,
    });
  }
  componentDidMount() {
    console.log('component did mount');
  }
}

Render(example);
