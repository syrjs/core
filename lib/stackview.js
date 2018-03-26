/** Class represents a view */
import { Component } from './component';

class StackView extends Component {
  tag(instance) {
    let tag = instance || document.createElement('div');
    let axis = this.getAxis(this.props);
    tag.style['display'] = 'flex';
    tag.style['flex-direction'] = axis;
    //defaulting for now. Can also be passed in as props
    tag.style['align-items'] = 'center';
    tag.style['justify-content'] = 'space-around';
    return tag;
  }
  getAxis(props) {
    let interpolation = {
      vertical: 'column',
      horizontal: 'row',
    };
    if (this.props.axis) {
      return interpolation[this.props.axis];
    }
    return '';
  }
}

export { StackView };
