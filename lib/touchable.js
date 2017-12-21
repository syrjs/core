/** Class represents a view */
import { Component } from './component';

class TouchableOpacity extends Component {
  tag() {
    // when run through the DOM, what element should this use
    return 'div';
  }
  setProperties(guid) {
    document.getElementById(guid).addEventListener('click', () => {
      SyrEvents.emit({
        type: 'onPress',
        guid: guid,
      });
    });
  }
}

export { TouchableOpacity };
