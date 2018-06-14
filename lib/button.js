/** Class represents a view */
import { Component } from './component';

class Button extends Component {
  tag(instance) {
    let button = instance || document.createElement('button');
    
    if (!instance) {
      button.uuid = this.uuid;
      button.onclick = () => {
        SyrEvents.emit({ type: 'onPress', guid: this.uuid });
      };
    }

    //@TODO: look into this. This was not allwing the buttons to register clicks!
    // // by default button is enabled unless explicitly disabled via props
    // if (this.props.enabled) {
    //   // yeah, I forced type coercion! ¯\_(ツ)_/¯
    //   button.disabled = !!this.props.enabled;
    // } else {
    //   button.disabled = false;
    // }

    button.textContent = this.value;
    return button;
  }
}

export { Button };
