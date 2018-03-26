/** Class represents a view */
import { Component } from './component';

class LinearGradient extends Component {
  tag(instance) {
    let tag = instance || document.createElement('div');
    tag.style.background = `linear-gradient(0deg, ${this.props.colors[0]}, ${
      this.props.colors[1]
    })`;
    return tag;
  }
}

export { LinearGradient };
