/** Class represents a view */
import { Component } from './component';

class StackView extends Component {
  tag() {
    let tag = document.createElement('div');
    tag.style['display'] = 'flex';
    tag.style['flex-direction'] = this.attributes.axis;
     //defaulting for now. Can also be passed in as props
    tag.style['align-items'] = 'center';
    tag.style['justify-content'] = 'space-around';
    return tag;
  }
}

export { StackView };
