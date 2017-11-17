import { Component } from './component';
import { View } from './view';
import { RasterManager } from './rastermanager';
import { Utils } from './utils';

let callbacks = {};

class AnimatedView extends View {
  animationComplete(event) {
    // todo - clean this up
    let animation = this.animation || this.parent.animation;
    if (animation instanceof Animated.ValueXY) {
      // ensure the animation state for current x, y is set
      animation.x = animation.x2;
      animation.y = animation.y2;

      // update style state
      this.props.style.left = animation.x2;
      this.props.style.top = animation.y2;
    }

    let callback = callbacks[event.animation.guid];
    if (callback) callback(event);
  }
}

class animated extends Component {
  constructor() {
    super();
    this.View = AnimatedView;
    this.AnimationTargets = {};
  }
  ValueXY(opts) {
    this.x = opts.x;
    this.y = opts.y;
    this.setValue = newopts => {
      this.x = newopts.x;
      this.y = newopts.y;
    };
    this.guid = Utils.guid();
  }
  Value(value) {
    this.value = value;
    this.guid = Utils.guid();
    this.setValue = newValue => {
      this.value = newValue;
    };
  }
  timing(animation, opts) {
    // convention so that these are not set
    // before componentDidMount
    if (animation instanceof Animated.ValueXY) {
      animation.x2 = opts.toValue.x;
      animation.y2 = opts.toValue.y;
    } else if (animation instanceof Animated.Value) {
      animation.toValue = opts.toValue;
    }

    animation.duration = opts.duration; // ms
    this.animation = animation;

    return this;
  }
  start(callback) {
    let animation = this.animation;
    callbacks[animation.guid] = callback;
    console.log(animation);
    RasterManager.getRaster().sendMessage('animation', {
      guid: this.AnimationTargets[animation.guid],
      animation: animation,
    });
  }
}

const Animated = new animated();

export { Animated };
