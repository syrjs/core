/** Class represents a view */
import { Component } from './component';

class LinearGradient extends Component {
  tag() {
    let tag = document.createElement('div');
    tag.style.background = `linear-gradient(0deg, ${
      this.attributes.colors[0]
    }, ${this.attributes.colors[1]})`;
    return tag;
  }
}

export { LinearGradient };
