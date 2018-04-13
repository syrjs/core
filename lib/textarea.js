
import { Component } from './component';

// input switch on native, input checkbox on web
class TextArea extends Component {
  tag(instance) {
    let textArea;

    if (instance) {
      textArea = instance;
    } else {
      textArea = document.createElement('textArea');
      textArea.type = 'submit';
    }

    return textArea;
  }
}

export { TextArea };
