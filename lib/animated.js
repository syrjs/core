import { Component } from './component';
import { View } from './view';
import { RasterManager } from './rastermanager';
import { Utils } from './utils';

let callbacks = {};
class AnimatedView extends View {
  animationComplete(event) {
    let animation = this.animation || this.parent.animation;
    if (animation instanceof Animated.ValueXY) {
      // ensure the animation state for current x, y is set
      animation.x = animation.x2;
      animation.y = animation.y2;

      // update style state
      this.props.style.left = animation.x2;
      this.props.style.top = animation.y2;
    }

    let callback = callbacks[animation.guid];
    if (callback) callback(event);
  }
}

class animated extends Component {
  constructor() {
    super();
    this.View = AnimatedView;
  }
  ValueXY(opts) {
    this.x = opts.x;
    this.y = opts.y;
    this.guid = Utils.guid();
  }
  Value() {}
  timing(component, opts) {
    // convention so that these are not set
    // before componentDidMount
    component.animation.x2 = opts.toValue.x;
    component.animation.y2 = opts.toValue.y;
    component.animation.duration = opts.duration; // ms

    this.animation = component;

    return this;
  }
  start(callback) {
    let component = this.animation;
    callbacks[component.animation.guid] = callback;
    RasterManager.getRaster().sendMessage('animation', component);
  }
}

let Animated = new animated();
export { Animated };
