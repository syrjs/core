import { Events } from './events';
import { Render } from '../index';
import { Utils } from './utils';
class Component {
  constructor() {
    // generate a unique id for this rendering
    this.guid = Utils.guid();
    // setup empty props
    this.props = this.props || {};
    // set state
    this.setState = state => {
      this.state = merge(this.state, state);
      Render(this);
    };
  }
}

// utility function to merge
function merge(obj1, obj2) {
  var obj3 = {};
  for (var attrname in obj1) {
    obj3[attrname] = obj1[attrname];
  }
  for (var attrname in obj2) {
    obj3[attrname] = obj2[attrname];
  }
  return obj3;
}

// export component
export { Component };
