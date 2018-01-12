/** Class represents a view */
import { Component } from './component';

class TouchableOpacity extends Component {
  tag() {
    let tag = document.createElement('div');
    tag.onclick = event => {
      SyrEvents.emit({
        type: 'onPress',
        guid: event.target.id,
      });
    };
    return tag;
  }
}

export { TouchableOpacity };
