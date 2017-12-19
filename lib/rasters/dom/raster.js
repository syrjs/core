import { Styler } from './styler';
import { Animator } from './animator';

let _instances = {};

class raster {
  parseAST(ast) {
    if (ast.update) {
    } else {
      this.build(ast);
    }
  }
  setupAnimation(ast) {
    Animator.animate(ast);
  }
  build(ast) {
    let instance = this.createComponent(ast);
    if (instance) {
      document.body.appendChild(instance);
      SyrEvents.emit({
        type: 'componentDidMount',
        guid: ast.guid,
      });
      if(ast.children) {
      this.buildChidren(ast, instance);
    }
    }
  }
  buildChidren(component, parent) {
    component.children.forEach(element => {
      let instance = this.createComponent(element);
      parent.appendChild(instance);

      if (element.children) {
        this.buildChidren(element, instance);
      }
    });
  }
  createComponent(component) {
    let tag = component.instance.tag();
    let instance;
    if (typeof tag === 'object') {
      instance = tag;
    } else {
      instance = document.createElement(tag);
    }
    instance.id = component.guid;
    _instances[instance.id] = instance;
    //@TODO check the rasterManager why attributes is returned as undefined.
    let styles = component.instance.attributes ?  component.instance.attributes.style : {};
    if (styles) {
      Styler.styleElement(instance, styles);
    }

    // todo , get these out of the raster
    if (
      component.elementName === 'Button' ||
      component.elementName === 'Text'
    ) {
      instance.innerText = component.instance.value;
    }

    if (component.elementName === 'Image') {
      // todo, make this more flexible
      let source = component.instance.attributes.source;
      instance.src = '/images/' + source.uri + '.png';
    }

    return instance;
  }
}

const Raster = new raster();

export { Raster };
