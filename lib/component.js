class Component {
  constructor() {
    this.props = this.render().attributes || {};
  }

  render() {}
}

export { Component };
