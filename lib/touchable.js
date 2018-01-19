/** Class represents a view */
import { Component } from './component';

class TouchableOpacity extends Component {
  tag() {
    let div = document.createElement('div');
    div.onclick = () => {
      SyrEvents.emit({
        type: 'onPress',
        guid: this.guid,
      });
    };
    return div;
  }
}

export { TouchableOpacity };
