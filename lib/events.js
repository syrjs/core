class events {
  constructor() {
    this.components = {};
    this.componentsByTag = {};

    this.register = component => {
      // register a component for eventing
      if (component.tag >= 0) {
        this.componentsByTag[component.tag] = component;
      }
      if (component.guid) this.components[component.guid] = component;
    };

    this.emit = event => {
      console.log(event);
      if (event.type == 'buttonPressed') {
        this.componentsByTag[event.tag].props.onPress(event);
        return;
      }
      if (event.type == 'event') {
        EventEmitter.emit(event);
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

class eventemitter {
  constructor() {
    this.subscriptions = {};
  }
  emit(message) {
    let subscriptions = this.subscriptions[message.name];
    if (subscriptions && subscriptions.length > 0) {
      for (let i = 0; i < subscriptions.length; i++) {
        subscriptions[i](message);
      }
    }
  }
  addListener(eventname, callback) {
    let subscriptions = this.subscriptions[eventname] || [];
    let index = subscriptions.push(callback);
    this.subscriptions[eventname] = subscriptions;
    console.log(this.subscriptions);
    return eventname + '_' + index;
  }
  //todo add removeListener
}

// create an instance before exporting
const Events = new events();
const EventEmitter = new eventemitter();

export { Events, EventEmitter };
