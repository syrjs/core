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

class Animated {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

class MyView extends Component {
  render() {
    return (
      <div>
        <MyComponent foo="Halllo World" />
        <Animated style={{ opacity: 1}}>
          <MyComponent foo="Halllo World" />
          <div style={{ backgroundColor: 'pink', color: 'grey' }}>
          <div> First Event21212 </div>
          <div>Another event!!</div>
        </div>
        <MyComponent foo="Halllo World" />
        </Animated>
        <button
          onclick={this.changeButtonText}
          style={{ backgroundColor: '#000000', color: '#ffffff' }}
        >
          Press Me
        </button>
      </div>
    );
  }

  changeButtonText(e) {
    e.target.innerText = 'New World';
  }
}

Render(MyView);
