import { Component, Render, View, StackViewl, Dimensions, Button } from '../index';

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
    console.log(this.props.key);
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
    this.state.componentCount = 1;
    this.state.components = getItems(1);
  }
  render() {
    console.log('uuid', this.uuid);
    return (
      <View style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height, backgroundColor:'#09aea4'}}>
        <Button onPress={()=>this.handleOnAdd()} style={{width:200, height: 50, backgroundColor:'#0f0f0f', top:100, left: 100}}>Add Item</Button>
        <Button onPress={()=>this.handleOnRemove()} style={{width:200, height: 50, backgroundColor:'#0f0f0f', top:165, left: 100}}>Remove Item</Button>

        {this.state.components}
      </View>
    );
  }
  handleOnRemove() {
    console.log('remove item');
    this.state.componentCount = this.state.componentCount - 1;
    this.setState({
      components: getItems(this.state.componentCount)
    })
  }
  handleOnAdd() {
    console.log('add item');
    this.state.componentCount = this.state.componentCount + 1;
    this.setState({
      components: getItems(this.state.componentCount)
    })
  }
  componentDidMount() {
    console.log('component did mount');
  }
}

Render(example);
