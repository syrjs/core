import { Events } from './events';
import { Render } from '../index';
class Component {
  constructor() {
    // generate a unique id for this rendering
    this.guid = guid();
    // setup empty props
    this.props = this.props || {};

    // set state
    this.setState = (state) => {
        this.state = merge(this.state, state);
        Render(this);
    }
  }
}

// utility function to merge
function merge(obj1,obj2){
  var obj3 = {};
  for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
  for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
  return obj3;
}

// utility function to produce guid
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

// export component
export { Component };
