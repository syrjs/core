import { Component } from './component';

// input switch on native, input checkbox on web
class Switch extends Component {
  tag(instance) {
    let iSwitch;

    if (instance) {
      iSwitch = instance;
    } else {
      iSwitch = document.createElement('input');
      iSwitch.type = 'checkbox';
    }

    return iSwitch;
  }
}

export { Switch };
