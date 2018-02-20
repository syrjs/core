import { Styler } from './styler';
import { Animator } from './animator';

class raster {
  parseAST(ast, target) {
      this.build(ast, target);
  }
  setupAnimation(ast) {
    Animator.animate(ast);
  }
  build(ast, target) {

    let instance = this.createComponent(ast);
    console.log('WEb', ast)

    let renderTarget = target ? target : document.body;
    renderTarget =
      renderTarget instanceof HTMLElement
        ? renderTarget
        : document.getElementById(renderTarget);
    if (instance) {
      if(!ast.update) {
        renderTarget.appendChild(instance);
        SyrEvents.emit({
          type: 'componentDidMount',
          guid: ast.instance.uuid
        });
      } else {
        instance = renderTarget;
      }
      if (ast.children) {
        this.buildChidren(ast, instance, ast.update);
      }
    } else {
      this.build(ast.children[0]);
    }
  }
  buildChidren(component, parent, isUpdate) {
    console.log('Children >>>', component, parent)
    component.children.forEach(element => {
      let component;
      if (element.instance && element.instance.tag) {
        component = element;
      } else if (element.children) {
        component = element.children[0];
      }
      let instance = this.createComponent(component) || parent;
      if(instance) {
      if (!isUpdate) {
        parent.appendChild(instance);
        SyrEvents.emit({
          type: 'componentDidMount',
          guid: element.instance.uuid,
        });
      }
    }
      if (component.children) {
        this.buildChidren(component, instance);
      }
    });
  }
  createComponent(component) {
    console.log('Component >>', component)
    let instance;

    if(component.instance){
    let tag = component.instance.tag ? component.instance.tag(instance) : 'div';

    if (typeof tag === 'object' && instance == null) {
      instance = tag;
    } else if(instance == null) {
      instance = document.createElement(tag);
    }

    instance.id = component.instance.uuid;

    if (component.instance.props.className) {
      instance.className = component.instance.props.className;
    }

    let styles = component.instance.style
      ? component.instance.style
      : null;

    if (styles) {
      Styler.styleElement(instance, styles);
    }
  }

    return instance;
  }
}

const Raster = new raster();

export { Raster };
