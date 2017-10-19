import { Component } from './component';
import { View } from './view';
import { RasterManager } from './rastermanager';
import { Utils } from './utils';
class AnimatedView extends View {}

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

    RasterManager.getRaster().sendMessage('animation', component);

    component.animation.x = opts.toValue.x;
    component.animation.y = opts.toValue.y;

    // notify the native layer to setup for animations
    console.log('start timing animations', component);
    return this;
  }
  start() {}
}

let Animated = new animated();
export { Animated };
