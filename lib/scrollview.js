/** Class represents a view */
import { Component } from './component';

class ScrollView extends Component {
  tag(instance) {
    let tag = instance || document.createElement('div');
    tag.style['overflow-x'] = 'hidden';
    tag.style['overflow-y'] = 'scroll';
    tag.style['white-space'] = 'nowrap';
    return tag;
  }
}

export { ScrollView };
