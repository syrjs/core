import { Component } from './component';
import { View } from './view';
import { Image } from './image';
import { Text } from './text';
import { RasterManager } from './rastermanager';
import { Utils } from './utils';

let callbacks = {};

/**
 * Animated
 */
const animationComplete = function animationComplete(event) {
  let eventAnimation = event.animation;

  // android sends these over stringified on the bridge
  if (typeof eventAnimation == 'string') {
    eventAnimation = JSON.parse(event.animation).animation;
  }

  let callback = callbacks[eventAnimation.guid];
  if (callback) callback(event);
};

class AnimatedView extends View {
  animationComplete(event) {
    animationComplete.call(this, event);
  }
}

class AnimatedImage extends Image {
  animationComplete(event) {
    animationComplete.call(this, event);
  }
}

class AnimatedText extends Text {
  animationComplete(event) {
    animationComplete.call(this, event);
  }
}

/**
 * Animated Class. Sets up and prepares animations to be transported over the bridge
 */
class animated extends Component {
  constructor() {
    super();
    this.View = AnimatedView;
    this.Image = AnimatedImage;
    this.text = AnimatedText;
    this.AnimationTargets = {};
  }

  /**
   * Transform type of XY Value. Sets up an animation on the raster.
   * @param {object} opts
   */
  ValueXY(opts) {
    this.x = opts.x;
    this.y = opts.y;
    this.setValue = newopts => {
      this.x = newopts.x;
      this.y = newopts.y;
    };
    this.guid = Utils.guid();
  }
  /**
   * Sets up a interpolation animation from one value to another over a duration
   * @param {int} value
   */
  Value(value) {
    this.value = value;
    this.setValue = newValue => {
      this.value = newValue;
    };
    this.guid = Utils.guid();
  }
  /**
   * Setups an Animation from the that is ready to send to the bridge.
   * @param {object} animation
   * @param {object} opts
   */
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
  /**
   * Chained to Animated.timing().start() , sends an `animation` event to the Native Layer
   */
  start(callback) {
    let animation = this.animation;
    callbacks[animation.guid] = callback;

    let cached = RasterManager.render.getInstance(
      this.AnimationTargets[animation.guid]
    );

    if (typeof animation.x2 == 'number' || typeof animation.y2 == 'number') {
      cached.state = cached.state || {};
      cached.state.y = animation.y2;
      cached.state.x = animation.x2;
    }

    RasterManager.getRaster().sendMessage('animation', {
      guid: this.AnimationTargets[animation.guid],
      animation: animation,
    });
  }
}

const Animated = new animated();

export { Animated };
