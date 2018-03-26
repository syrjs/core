import { Component, Render, View, StackView } from '../index';

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
    this.state.components = getItems(1);
  }
  render() {
    console.log('uuid', this.uuid);
    return (
      <StackView
        axis="vertical"
        style={{ width: 100, height: 300, backgroundColor: '#ff00ff' }}
      >
        {this.state.components}
      </StackView>
    );
  }
  componentDidMount() {
    console.log('setting state');

    this.setState({
      components: getItems(5),
    });
  }
}

Render(example);
