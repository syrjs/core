import { Events } from './events';
import { Render } from '../index';
import { Utils } from './utils';

class Component {
  constructor(attributes) {
    // generate a unique id for this rendering
    this.guid = Utils.guid();

    this.attributes = attributes;

    // setup empty props
    // should this be done outside the constructor?
    // right now open to interference needs to pass props to super(props)
    if(attributes && attributes.props) {
      if (this.componentWillRecieveProps) {
        this.componentWillRecieveProps.call(this, attributes.props);
      }
      this.props = attributes.props;
    }

    // set props
    this.setProps = (props, cb) => {
      if (this.componentWillRecieveProps) {
        this.componentWillRecieveProps.call(this, props);
      }

      if (cb) {
        cb();
      }
    };

    // set state
    this.setState = (state, cb) => {
      this.state = merge(this.state, state);

      Render(this);

      if (cb) {
        cb();
      }
    };
  }
}

// utility function to deep clone/merge
function merge(a, b) {
  const c = Object.assign({}, a, b);
  return c;
}

// export component
export { Component };
