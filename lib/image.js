/** Class represents a view */
import { Component } from './component';

class Image extends Component {
  tag(instance) {
    let image = instance || document.createElement('img');

    if (instance) {
      return image;
    }

    let source = this.props.source;
    image.src = '/images/' + source.uri + '.png';

    return image;
  }
}

export { Image };
