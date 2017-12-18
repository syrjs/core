import { Styler } from './styler';

let _instances = {};

class raster {
  parseAST(ast) {
    if(ast.update) {

    } else {
      this.build(ast);
    }
  }
  setupAnimation(ast){
    console.log('animation', ast);
  }
  build(ast) {
    let instance = this.createComponent(ast);
    if(instance) {
      document.body.appendChild(instance);
      this.buildChidren(ast, instance);
    }
  }
  buildChidren(component, parent) {
    component.children.forEach(element => {
      let instance = this.createComponent(element);
      parent.appendChild(instance);

      if(element.children) {
        this.buildChidren(element, instance);
      }
    });
  }
  createComponent(component) {
    let tag = component.instance.tag();
    let instance = document.createElement(tag);
    instance.id = component.guid;
    _instances[instance.id] = instance;

    let styles = component.instance.attributes.style;
    if(styles) {
      Styler.styleElement(instance, styles)
    }

    return instance;
  }
}
  
const Raster = new raster();

export { Raster };