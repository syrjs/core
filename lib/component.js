import { Events } from './events';
class Component {
  constructor() {
    this.guid = guid();
    Events.register(this);
  }
  render() {}
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export { Component };
