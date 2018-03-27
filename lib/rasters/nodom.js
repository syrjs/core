class nodom {
  constructor() {
    this.type = 'nodom';
    this.dimensionValues = { width: 0, height: 0, scale: 0 };
  }

  render(component) {
    this.sendMessage('gui', component);
  }

  sendMessage(type, message) {
    if (this.recieveMessage) {
      this.recieveMessage(type, message);
    }
  }

  recieveMessage(type, message) {}

  dimensions() {
    return {
      // these should be set by injection
      width: this.dimensionValues.width || 0,
      height: this.dimensionValues.height || 0,
      scale: this.dimensionValues.scale || 0,
    };
  }

  props() {
    // these should be set by injection
    return this.propValues;
  }
}

const NoDOM = new nodom();
export { NoDOM };
