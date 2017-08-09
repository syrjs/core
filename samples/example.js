import { Component, Render } from '../index';

class MyComponent extends Component {
  render() {
    return <div foo="bar">Hello World</div>;
  }
}

Render(MyComponent);
