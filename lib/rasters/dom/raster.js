import { Styler } from './styler';
import { Animator } from './animator';

let _instances = {};

class raster {
  parseAST(ast, target) {
    if (!ast.update) {
      this.build(ast, target, () => {
        console.log('uuid', ast.uuid);
        SyrEvents.emit({
          type: 'componentDidMount',
          guid: ast.uuid,
        });
      });
    } else {
      this.update(ast, target);
    }
  }
  setupAnimation(ast) {
    Animator.animate(ast);
  }
  build(ast, target, cb) {
    let instance = this.createComponent(ast);
    let renderTarget = target ? target : document.body;
    renderTarget =
      renderTarget instanceof HTMLElement
        ? renderTarget
        : document.getElementById(renderTarget);
    if (instance) {
      renderTarget.appendChild(instance);
      _instances[ast.instance.uuid] = instance;
      cb();
      if (ast.children) {
        this.buildChidren(ast, instance, ast.update);
      }
    } else {
      this.build(ast.children[0], target, cb);
    }
  }
  buildChidren(component, parent, isUpdate) {
    // console.log('Children >>>', component, parent)
    component.children.forEach(element => {
      let component;
      if (element.instance && element.instance.tag) {
        component = element;
      } else if (element.children) {
        component = element.children[0];
      }
      let instance = this.createComponent(component);
      if (instance) {
        parent.appendChild(instance);
        _instances[component.instance.uuid] = instance;
        SyrEvents.emit({
          type: 'componentDidMount',
          guid: component.instance.uuid,
        });
      }
      if (component.children) {
        this.buildChidren(component, instance);
      }
    });
  }
  update(ast, target) {
    if (ast.instance) {
      this.syncState(ast, target);
    } else {
      this.syncState(ast.children[0], target);
    }
  }
  createComponent(component) {
    let instance;
    if (component.instance && component.instance.tag) {
      instance = _instances[component.instance.uuid];
      let tag = component.instance.tag(instance);
      // console.log('TAG', tag)
      if (typeof tag === 'object' && instance == null) {
        instance = tag;
      } else if (instance == null) {
        instance = document.createElement(tag);
      }

      instance.id = component.instance.uuid;

      if (component.instance.props.className) {
        instance.className = component.instance.props.className;
      }

      let styles = component.instance.style ? component.instance.style : null;

      if (styles) {
        Styler.styleElement(instance, styles);
      }
    }

    return instance;
  }
  syncState(component, viewParent) {
    let uuid = component.instance.uuid;
    let renderTarget = viewParent;
    renderTarget =
      renderTarget instanceof HTMLElement
        ? renderTarget
        : document.getElementById(renderTarget);
    let cachedInstance = _instances[uuid];
    let unmount = component.unmount;
    //@TODO need to review this but keeping it for nnow.
    if (unmount) {
      if (cachedInstance) {
        delete _instances[uuid];
        SyrEvents.emit({
          type: 'componentWillUnMount',
          guid: uuid,
        });
        renderTarget.removeChild(document.getElementById(uuid));
      } else {
        let parent = document.getElementById(uuid);
        component.children.forEach(child => {
          let childUuid = child.instance.uuid;
          let childCachedInstance = _instances[childUuid];
          let unMountChildInstance = component.unmount;
          if (unMountChildInstance) {
            delete _inistances[childUuid];
            SyrEvents.emit({
              type: 'componentWillUnMount',
              guid: uuid,
            });
            parent.removeChild(document.getElementById(childUuid));
          }
        });
      }
    } else {
      if (cachedInstance) {
        // cachedInstance = this.createComponent(cachedInstance);
        cachedInstance = this.createComponent(component);
        viewParent = cachedInstance;
        // let styles = component.instance.style ? component.instance.style : null;
        // if (styles) {
        //   Styler.styleElement(cachedInstance, styles);
        // }
      } else {
        var newInstance = this.createComponent(component);
        if (newInstance) {
          viewParent.appendChild(newInstance);
          _instances[component.instance.uuid] = newInstance;
          SyrEvents.emit({
            type: 'componentDidMount',
            guid: component.instance.uuid,
          });
        }
      }
      if (component.children) {
        let key = component.attributes ? component.attributes.key : null;
        component.children.forEach(child => {
          if (key) {
            child.key = key;
          }
          this.syncState(child, viewParent);
        });
      }
    }
  }
}

const Raster = new raster();

export { Raster };
