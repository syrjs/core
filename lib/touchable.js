/** Class represents a view */
import { Component } from './component';

class TouchableOpacity extends Component {
  tag() {
    // when run through the DOM, what element should this use
    return 'div';
  }
}

export { TouchableOpacity };
