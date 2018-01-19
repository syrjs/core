/** Class represents a view */
import { Component } from './component';

class Image extends Component {
  tag(instance) {
    let image = instance || document.createElement('img');
    let source = this.attributes.source;
    image.src = '/images/' + source.uri + '.png';
    return image;
  }
}

export { Image };
