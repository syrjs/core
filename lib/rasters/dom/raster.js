import { Styler } from './styler';
import { Animator } from './animator';

let _instances = {};

class raster {
  parseAST(ast, target) {
      this.build(ast, target);
  }
  setupAnimation(ast) {
    Animator.animate(ast);
  }
  build(ast, target) {
    let instance = this.createComponent(ast);
    let renderTarget = target ? target : document.body;
    renderTarget =
      renderTarget instanceof HTMLElement
        ? renderTarget
        : document.getElementById(renderTarget);
    if (instance) {
      renderTarget.appendChild(instance);
      SyrEvents.emit({
        type: 'componentDidMount',
        guid: ast.guid,
      });
      if (ast.children) {
        this.buildChidren(ast, instance);
      }
    }
  }
  buildChidren(component, parent) {
    component.children.forEach(element => {
      let component;
      if (element.instance.tag) {
        component = element;
      } else if (element.children) {
        component = element.children[0];
      }
      let instance = this.createComponent(component);
      parent.appendChild(instance);
      if (component.children) {
        this.buildChidren(component, instance);
      }
    });
  }
  createComponent(component) {
    let instance = _instances[component.guid];

    let tag = component.instance.tag ? component.instance.tag(instance) : 'div';

    if (typeof tag === 'object' && instance == null) {
      instance = tag;
    } else if(instance == null) {
      instance = document.createElement(tag);
    }
    
    instance.id = component.guid;
    _instances[instance.id] = instance;

    if (component.attributes.className) {
      instance.className = component.attributes.className;
    }

    let styles = component.instance.attributes
      ? component.instance.attributes.style
      : {};

    if (styles) {
      Styler.styleElement(instance, styles);
    }

    return instance;
  }
}

const Raster = new raster();

export { Raster };
