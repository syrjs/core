import { Events } from './events';
import { Render } from '../index';
import { Utils } from './utils';

class Component {
  constructor(attributes) {
    // generate a unique id for this rendering
    this.guid = Utils.guid();

    this.attributes = attributes;

    // init state
    this.state = {};

    // setup empty props
    // should this be done outside the constructor?
    // right now open to interference needs to pass props to super(props)
    if(attributes && attributes.props) {
      if (this.componentWillRecieveProps) {
        this.componentWillRecieveProps.call(this, attributes.props);
      }
      this.props = attributes.props;
    }

    let pushProps = (instance, props) => {
      // todo condense this function
      // push props to children that have bound them
      instance.children.forEach(child => {
        if(!child.instance) {
          // get the instance
          let cached = Render.getInstance(child.guid);
          if(cached.instance.props) {
            // notify and set props
            if (cached.instance.componentWillRecieveProps) {
              cached.instance.componentWillRecieveProps.call(cached.instance, props);
            }
            cached.instance.props = props;
          }

          if(cached.children) {
            pushProps(cached, props);
          }
        } else {
            // update the child instances
            if(child.instance && child.instance.props) {
              // notify child of incoming props
              if (child.instance.componentWillRecieveProps) {
                child.instance.componentWillRecieveProps.call(child.instance, props);
              }
              // set the props
              child.instance.props = props;
            }

            if(child.children) {
              pushProps(child, props);
            }
        }
      });
    }

    // set props
    this.setProps = (props, cb) => {

      props = merge(this.props, props);

      // set props of this component
      if (this.componentWillRecieveProps) {
        this.componentWillRecieveProps.call(this, props);
      }
      this.props = props;

      pushProps(this, props);

      // fire callback for setProps if one was passed
      if (cb) {
        cb();
      }
    };

    // set state
    this.setState = (state, cb) => {
      this.state = merge(this.state, state);

      // send updated AST to raster
      Render(this);

      if (cb) {
        cb();
      }
    };
  }
}

// utility function to deep clone/merge
function merge(a, b) {
  const c = Object.assign({}, a, b);
  return c;
}

// export component
export { Component };
