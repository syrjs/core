/** Class represents a view */
import { Component } from './component';

class StackView extends Component {
  tag() {
    let tag = document.createElement('div');
    tag.style['display'] = 'flex';
    tag.style['flex-direction'] = this.attributes.direction; //the name of the prop can be changed
    tag.style['align-items'] = this.attributes.alignItems;
    tag.style['justify-content'] = this.attributes.justifyContent;
    return tag;
  }
}

export { StackView };
