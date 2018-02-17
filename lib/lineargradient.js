/** Class represents a view */
import { Component } from './component';

class LinearGradient extends Component {
  tag(instance) {
    let tag = instance || document.createElement('div');
    //console.log(this.attributes);

    tag.style.background = `linear-gradient(0deg, ${
      this.attributes.colors[0]
    }, ${this.attributes.colors[1]})`;
    return tag;
  }
}

export { LinearGradient };
