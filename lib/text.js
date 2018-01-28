/** Class represents a view */
import { Component } from './component';

class Text extends Component {
  tag(instance) {
    let span = instance || document.createElement('span');
    span.textContent = this.value;
    return span;
  }
}

export { Text };
