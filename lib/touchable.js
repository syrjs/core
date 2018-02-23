/** Class represents a view */
import { Component } from './component';

class TouchableOpacity extends Component {
  tag(instance) {
    let div = instance || document.createElement('div');
    if (!instance) {
      div.onclick = () => {
        SyrEvents.emit({
          type: 'onPress',
          guid: this.uuid,
        });
      };
    }
    return div;
  }
}

export { TouchableOpacity };
