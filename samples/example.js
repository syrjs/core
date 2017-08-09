import { Component, React } from '../index';

class MyComponent extends Component {
    render() {
      return (
        <div foo="bar">Hello World</div>
      )
    }
}

React.render(MyComponent);
