/** Class represents a view */
import { Component } from './component';

class Button extends Component {
  tag() {
    let button = document.createElement('button');
    button.innerText = this.value;
    button.guid = this.guid;
    button.onclick = () => {
      SyrEvents.emit({ type: 'onPress', guid: this.guid });
    };
    return button;
  }
}

export { Button };
