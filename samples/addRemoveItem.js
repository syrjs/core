import {
  Component,
  Render,
  View,
  StackViewl,
  Dimensions,
  Button,
  StackView,
} from '../index';

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
    console.log(this.props.key, " -- mounted");
  }
  componentWillUnmount() {
    console.log(this.props.key, " -- unmounted")
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
            height: 50,
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
            height: 50,
            backgroundColor: '#0f0f0f',
            top: 165,
            left: 100,
          }}
        >
          Remove Item
        </Button>
      </View>
    );
  }
  handleOnRemove() {
    this.componentCount = this.componentCount - 1;
    this.setState({
      components: getItems(this.componentCount),
    });
  }
  handleOnAdd() {
    this.componentCount = this.componentCount + 1;
    this.setState({
      components: getItems(this.componentCount),
    });
  }
  componentDidMount() {
    console.log('component did mount');
  }
}

Render(example);
