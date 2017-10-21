class events {
  constructor() {
    this.components = {};
    this.componentsByTag = {};
    this.register = component => {
      if (component.elementName == 'Button') {
        this.componentsByTag[component.tag] = component;
      }
      // register a component for eventing
      this.components[component.guid] = component;
    };

    this.emit = event => {
      if (event.type == 'buttonPressed') {
        // ewww but working
        console.log(this.componentsByTag[0]);
        this.componentsByTag[event.tag].props.onPress(event);
        return;
      }
      // emit an event to a component
      let component = this.components[event.guid];
      bubbleEvent(event, component);
    };

    function sendEventToTag() {}

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
