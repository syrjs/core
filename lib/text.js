/** Class represents a view */
import { Component } from './component';

class Text extends Component {
  tag() {
    let span = document.createElement('span');
    span.innerText = this.value;
    return span;
  }
}

export { Text };
