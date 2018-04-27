import { Utils } from './utils';

let uuids = {};

class events {
  constructor() {
    this.components = {};

    this.register = component => {
      if (
        uuids[component.uuid] == '' &&
        this.components[component.uuid] !== component
      ) {
        console.warn(
          'event registered twice >>> ',
          this.components[component.uuid],
          component
        );
        return;
      }
      uuids[component.uuid] = '';
      if (component.uuid) this.components[component.uuid] = component;
    };

    const lifeCycles = [
      'componentDidMount',
      'componentWillUnmount',
      'componentWillUpdate',
      'componentDidUpdate',
      'componentWillReceiveProps',
    ];

    function handleEvent(event) {
      // single events
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
    }

    this.emit = event => {
      if (event instanceof Array) {
        event.forEach((event, index, array) => {
          handleEvent.call(this, event);
        });
      } else {
        handleEvent.call(this, event);
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
      // todo: early exit logic, if we've crawled a parent alreadycd
      // then lets not crawl it again.
      let walk = (event, component) => {
        let handler =
          component[event.type] ||
          (component.props && component.props[event.type]);
        if (handler) {
          // if the component is currently already awaiting notification queue
          // then notify
          let lifeCycleID = component.uuid + event.type;
          lifeCycleQueue.unshift(lifeCycleID);

          // only register if the lifecycleid isn't found, or the component in the notifier has changed
          if (
            !lifeCycleNotifiers[lifeCycleID] ||
            lifeCycleNotifiers[lifeCycleID].component !== component
          ) {
            lifeCycleNotifiers[lifeCycleID] = {
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
        (component.attributes && component.attributes[event.type]);
      console.log('Handler >>>>', handler);
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
    if (typeof window !== 'undefined') {
      window.SyrEvents = window.SyrEvents || this;
    } else {
      global.SyrEvents = global.SyrEvents || this;
    }
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
    return eventname + '_' + index;
  }
  //todo add removeListener
}

// create an instance before exporting
const Events = new events();
const EventEmitter = new eventemitter();

export { Events, EventEmitter };
