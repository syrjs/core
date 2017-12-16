import { Utils } from './utils';

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

    const lifeCycles = [
      'componentDidMount',
      'componentWillUnmount',
      'componentWillUpdate',
      'componentDidUpdate',
      'componentWillReceiveProps',
    ];

    this.emit = event => {

      console.log('event', event);

      if (event.type == 'buttonPressed') {
        this.componentsByTag[event.tag].attributes.onPress(event);
        return;
      }
      if (event.type == 'event') {
        EventEmitter.emit(event);
        return;
      }

      // emit an event to a component
      let component = this.components[event.guid];
      if (lifeCycles.indexOf(event.type) > -1) {
        // use lifecycle handler
        handleLifeCycle(event, component);
      } else {
        // bubble synthetic event though stack
        bubbleEvent(event, component);
      }
    };

    const fireLifeCycle = Utils.debounce(function(notifiers) {
      let queue = lifeCycleQueue;
      for (let index = 0; index < queue.length; ++index) {
        let id = queue[index];
        bubbleEvent(notifiers[id].event, notifiers[id].component);
      }
      lifeCycleQueue = [];
    }, 60);

    let lifeCycleNotifiers = {};
    let lifeCycleQueue = [];
    function handleLifeCycle(event, component) {
      // todo: early exit logic, if we've crawled a parent already
      // then lets not crawl it again.
      let walk = (event, component) => {
        let handler =
          component[event.type] ||
          (component.props && component.props[event.type]);

        if (!handler && component.parent) {
          // stack life cycle components differently based on tree
          // and number of them that fire across the tree
          handleLifeCycle(event, component.parent);
        } else if (handler) {
          // if the component is currently already awaiting notification queue
          // then notify
          if (!lifeCycleNotifiers[component.guid]) {
            lifeCycleQueue.unshift(component.guid);
            lifeCycleNotifiers[component.guid] = {
              component: component,
              event: event,
            };
          }
        }
      };

      walk(event, component);
      fireLifeCycle(lifeCycleNotifiers);
    }

    function bubbleEvent(event, component) {
      // bubble events up through components
      let handler =
        component[event.type] ||
        (component.props && component.props[event.type]);
      let handled = handler && handler.call(component, event);
      if (!handled && component.parent) {
        // if the component is currently already awaiting notification queue
        // then notifyates
        if (lifeCycleQueue.indexOf(component.parent.guid) > -1) {
          bubbleEvent(event, component.parent);
        }
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
