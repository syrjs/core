import { Events } from './events';
import { Render } from '../index';
import { Utils } from './utils';

class Component {
  constructor(props) {
    // generate a unique id for this rendering
    this.guid = Utils.guid();
    // setup empty props
    this.props = props;
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
