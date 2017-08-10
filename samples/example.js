import { Component, Render } from '../index';

let style = {
  height: 100,
  width: 100,
  color: '#ffffff',
  backgroundColor: '#00ff00',
};

let otherstyle = {
  color: '#333333',
  backgroundColor: '#ffffff',
};

class MyComponent extends Component {
  render() {
    return (
      <div style={style}>
        Hello World {this.props.foo}
        <div style={otherstyle}>Something Else</div>
      </div>
    );
  }
}

class MyView extends Component {
  render() {
    return (
      <div>
        <MyComponent foo="Halllo World" />
      </div>
    );
  }
}

Render(MyView);
