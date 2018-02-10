/** Class manages the consumption and use of rasters */
import { Events } from './events';
import { Animated } from './animated';

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
const createComponent = ast => {
  
  if (typeof ast.elementName == 'function') {
    // construct a new instance
    ast.instance = new ast.elementName(ast.attributes);
    ast.instance.guid = ast.guid;
    ast.instance.uuid = ast.uuid;

    prepareProps(ast);

    ast.elementName = ast.instance.constructor.name;
    _cache[ast.instance.uuid || ast.guid] = ast;

    // get the childrens trees
    if (ast.children && ast.children.length <= 0 && ast.instance.render) {
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
        child.uuid = ast.instance.guid + '-' + child.guid;
      }

      // create the child instance
      child = createComponent(child);

      // correct some behavior for strings
      if (typeof child === 'string' || typeof child === 'number') {
        ast.instance.state = ast.instance.state || {};
        ast.instance.value = child;
        ast.children.splice(index, 1);
      } else {
        child.instance.parent = ast.instance;
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

  // hasn't been inflated yet
  let c = new component();

  // top level components don't have uuids assigned, since no parent rel
  c.uuid = c.guid;

  // get the init props from the raster
  c.props = _raster.props();

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

const updateComponent = (component) => {
  // update path
  // look for calculated values {attributes, string children}
  // send the updates accordingly
  function crawl(component) {
    let update = component.render();
    let cached = _cache[component.guid + '-' + update.guid];

    if (typeof update.children[0] == 'string') {
      cached.instance.value = update.children[0];
      update.children = [];
    }

    if (update.attributes.style) {
      cached.instance.style = update.attributes.style;
      delete update.attributes.style;
    }

    // update props
    cached.instance.setProps(update.attributes);

    if (update.children) {
      update.children.forEach(child => {

        if (typeof child == 'object') {

          let cachedChild = _cache[update.guid + '-' + child.guid]

          if (child.attributes && child.attributes.style) {
            cachedChild.instance.style = child.attributes.style;
            delete child.attributes.style;
          }

          // backwards compat for now, remove after cleanup
          cachedChild.instance.setProps(child.attributes);
          crawl(cachedChild.instance);
        }

      });
    }

    return component;
  }

  // todo: insert and delete tree
  let updatedComponent = crawl(component);
  updatedComponent.update = true;
  return updatedComponent;
}

// return raster manager
export {
  RasterManager
};