/** Class represents a view */
import { Component } from './component';

class Button extends Component {
  tag(instance) {
    let button = instance || document.createElement('button');

    if(!instance) {
      button.guid = this.guid;
      button.onclick = () => {
        SyrEvents.emit({ type: 'onPress', guid: this.guid });
      };
    }

    button.innerText = this.value;
    return button;
  }
}

export { Button };
