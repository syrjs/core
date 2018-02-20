/** Class manages the consumption and use of rasters */
import { Events } from './events';
import { Animated } from './animated';
import { create } from 'domain';

class RasterManager {}

// who is currently rendering
let _raster;

// cache
let _cache = {};

// set the raster to be used (dom, or wkwebview)
RasterManager.setRaster = (raster) => {
  _raster = raster;
};

// returns the current raster
RasterManager.getRaster = () => {
  return _raster;
};

RasterManager.render = (component, target) => {
  // rudementary rendering
  if (typeof component == 'function') {
    // render through raster
    _raster.render(initializeComponent(component), target);
  } else {
    _raster.render(updateComponent(component), target);
  }
};

RasterManager.render.getInstance = (uuid) => {
  // get an instance out of the cache
  return _cache[uuid];
};

const prepareProps = (component) => {
  component.instance.props = component.attributes;

  if (component.attributes.style) {
    component.instance.style = component.attributes.style;
    delete component.attributes.style;
  }

  if (component.attributes.onPress) {
    component.instance.onPress = component.attributes.onPress;
    delete component.attributes.onPress;
  }

  return component;
}

const prepareAnimations = (component) => {
  // check for animations and set them up
  if (
    component.instance &&
    component.instance.style &&
    component.instance.style.transform
  ) {
    component.instance.style.transform.forEach(animation => {
      if (animation.constructor.name == 'Object') {
        // animations are bound to a property
        for (var property in animation) {
          if (animation.hasOwnProperty(property)) {
            // do stuff
            animation[property].animatedProperty = property;
            Animated.AnimationTargets[animation[property].guid] = component.uuid;
          }
        }
      } else {
        Animated.AnimationTargets[animation.guid] = component.instance.uuid;
      }
    });
  }
}

/**
 * Inflates AST , calls render and constructs objects
 * @param {object} ast
 */
const createComponent = (ast, fenceid) => {

  if (typeof ast.elementName == 'function') {
    // construct a new instance
    ast.instance = new ast.elementName(ast.attributes);
    ast.instance.guid = ast.guid;
    ast.instance.uuid = ast.uuid;

    prepareProps(ast);

    // if there is a key present , add it to the uuid to ensure the ids are unique
    ast.instance.uuid = ast.instance.props.key ? `${ast.instance.uuid}-${ast.instance.props.key}` : ast.instance.uuid;

    ast.elementName = ast.instance.constructor.name;

    // cache the instance
    _cache[ast.instance.uuid || ast.guid] = ast;

    // get the childrens trees
    if (ast.children && ast.children.length <= 0 && ast.instance.render) {
      fenceid = ast.instance.uuid;
      ast.children = [ast.instance.render()];
    }
  }

  // check for animations and set them up
  prepareAnimations(ast);

  // prepare ast children
  if (ast.children) {
    ast.children = flattenChildren(ast.children);

    ast.children.forEach(function (child, index) {
        if (typeof child !== 'string' && typeof child !== 'number') {
          // set the uuid on the ast
          if(fenceid) {
            child.uuid = fenceid + '-' + child.guid;
            child.fenceid = fenceid;
          } else {
            child.uuid = ast.uuid + '-' + child.guid;
          }

          // create the child instance
          child = createComponent(child, fenceid);
        }

        // correct some behavior for strings
        if (typeof child === 'string' || typeof child === 'number') {
          ast.instance.state = ast.instance.state || {};
          ast.instance.value = child;
          ast.children.splice(index, 1);
        } else {
          ast.children[index] = child;
        }
    });
  }

  // only register for events if we know a uuid
  if (ast.instance && ast.instance.uuid) {
    Events.register(ast.instance);
  }

  return ast;
};

const flattenChildren = children => {
  var flattenedChildren = []
  children.forEach(child => {
    if (Array.isArray(child)) {
      flattenedChildren = flattenedChildren.concat(flattenChildren(child))
    } else {
      flattenedChildren.push(child)
    }
  })
  return flattenedChildren;
}

const initializeComponent = (component) => {

  //initial props
  const initial_props = _raster.props()

  // hasn't been inflated yet
  let c = new component(initial_props);

  // top level components don't have uuids assigned, since no parent rel
  c.uuid = c.guid;

  // get the init props from the raster
  c.props = c.props || _raster.props();

  // inflate render
  let baseAST = c.render();
  baseAST.uuid = c.guid + '-' + baseAST.guid;

  let parseAST = createComponent(baseAST);

  // setup tree for tracking
  _cache[c.uuid] = c;

  // flat list of children
  c.children = [
    parseAST
  ];

  // set the base AST with ref to our top level component
  parseAST.instance.uuid = c.guid + '-' + parseAST.instance.guid;

  // register for events
  Events.register(c);
  Events.register(parseAST.instance);

  return c
}

const updateComponent = (component, rendered) => {

  function reflow(component, passedUpdates) {

    let updates = [];
    if(component.render) {
      // inflate
      updates = [component.render()];
      //console.log('i should inflate: ', component, updates);
    } else {

      if(component.instance) {
        // use tree
        //console.log('i have an instance ', component, passedUpdates)

        if(passedUpdates) {

          // console.log('passed updates', passedUpdates);

          if(passedUpdates.attributes.style) {
            component.instance.style = passedUpdates.attributes.style;
            //console.log('updating styles >>> ' + component.elementName + '' + JSON.stringify(passedUpdates.attributes.style))
            delete passedUpdates.attributes.style;
          }

          //console.log('setting props >>> ' + component.elementName + ' ' + JSON.stringify(component.instance.props) + ' --> ' + JSON.stringify(passedUpdates.attributes))
          component.instance.setProps(passedUpdates.attributes);

          if(typeof passedUpdates.children[0] === 'string') {
            if(component.instance.value !== passedUpdates.children[0]) {
              component.instance.value = passedUpdates.children[0];
              //console.log('updated string value >>> ' + component.elementName + ' ' + component.instance.value);
            };
            passedUpdates.children = [];
          }
        }


        if(component.instance.render) {
          updates = [component.instance.render()];
          //console.log('I can also render', component, updates);
        } else {
          updates = passedUpdates.children;
        }

      } else {
        // use tree
        //console.log('i do not have an instance: ', component)
      }
    }

    if(component.children) {
      updates = flattenChildren(updates);

      // console.log(JSON.stringify(component.uuid));

      updates.forEach((update, index) =>{
        let baseUUID = component.uuid + '-' + update.guid;
        let uuid = baseUUID;
        if(update.attributes.key) {
          uuid = uuid + '-' + update.attributes.key;
        }
        if(!_cache[uuid]) {
          update.uuid = baseUUID;
          component.children.splice(index, 0, createComponent(update));
          // console.log('create instance', index, component.children)
        }
      });

      component.children.forEach((child, index)=>{
        reflow(child, updates[index]);
      });
    }
  }

  // todo: insert and delete tree
  if(!component.instance) {
    component = _cache[component.uuid];
  }

  reflow(component);
  component.update = true;

  return component;
}

// return raster manager
export {
  RasterManager
};
