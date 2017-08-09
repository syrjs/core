import { Component, Render } from '../index';

let style = {
  height: 100,
  width: 100,
  color: '#ffffff',
  backgroundColor: '#330033',
};

class MyComponent extends Component {
  render() {
    return <div style={style}>Hello World</div>;
  }
}

Render(MyComponent);
