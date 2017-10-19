class events {
  constructor() {
    this.components = {};
    this.register = component => {
      // register a component for eventing
      this.components[component.guid] = component;
    };

    this.emit = event => {
      // emit an event to a component
      let component = this.components[event.guid];
      bubbleEvent(event, component);
    };

    function bubbleEvent(event, component) {
      // bubble events up through components
      let handler = component[event.type];
      let handled = handler && handler.call(component, event);
      if (!handled && component.parent) {
        bubbleEvent(event, component.parent);
      }
    }

    // export globally so the JS bridge can use it.
    window.SyrEvents = window.SyrEvents || this;
  }
}

// create an instance before exporting
const Events = new events();

export { Events };
