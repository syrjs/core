import { EventEmitter } from './events';
import { RasterManager } from './rastermanager';
import { SyrStore } from './store'

const Render = RasterManager.render;

class resolver {
  constructor() {
    this.registeredComponents =[];
    EventEmitter.addListener('storeUpdate', payload => {
      this.registeredComponents.forEach((component) => {
        this.pushPropsToChildren(component, payload.data);
      })
    });
    this.pushPropsToChildren = this.pushPropsToChildren.bind(this);
  }

  register(component) {
    this.registeredComponents.push(component);
  }

  pushPropsToChildren(component, nextProps) {
    let instance = component.children
      ? component
      : Render.getInstance(component.uuid);
    // todo condense this function
    // push props to children that have bound them
    instance.children.forEach(child => {
      if (child.instance && Object.keys(child.instance.props).length > 0 && !child.instance.tag) {
        let propsToPush = {};
        let setState = false;
        if (child.instance.props.hasOwnProperty('data')) {
          propsToPush = {data: Object.assign({}, child.instance.props.data, nextProps)};
        }
        for(let attribute in child.instance.props) {
            if(nextProps.hasOwnProperty(attribute)) {
              propsToPush[attribute] = nextProps[attribute];
            }
        }
        if(child.instance.propTypes) {
          for(let prop in child.instance.propTypes) {
            if(nextProps.hasOwnProperty(prop) && child.instance.propTypes[prop] === 'state') {
              setState = true;
              break;
            }
          }
        }
        let finalChildProps = Object.assign(child.instance.props,propsToPush);
        child.instance.setProps(finalChildProps);
        if(setState){
          this.setState(child.instance);
        }
      }
      if (child.children) {
        this.pushPropsToChildren(child, nextProps);
      }
    });
  }

  setState(component, nextState) {
    console.log('Setting State >>>', component)
    component.setState(nextState);
  }
}

const Resolver = new resolver();
export { Resolver };
