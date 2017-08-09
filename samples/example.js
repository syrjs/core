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
}
class MyComponent extends Component {
  render() {
    return <div style={style}>Hello World
        <div style={otherstyle}>
          Something Else
        </div>
    </div>;
  }
}

Render(MyComponent);
