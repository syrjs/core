/** Class manages the consumption and use of rasters */
import { Events } from './events';
import { Animated } from './animated';
class RasterManager {}

// who is currently rendering
let _raster;

// inflated representation of the components JSX
let _inflated = {};

let _instances = {};

// button tag count
let _buttons = 0;

// set the raster to be used (dom, or wkwebview)
RasterManager.setRaster = raster => {
  _raster = raster;
};

// returns the current raster
RasterManager.getRaster = () => {
  return _raster;
};

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
    ast.instance.attributes = ast.attributes;
    ast.elementName = ast.instance.constructor.name;
    _instances[ast.instance.uuid || ast.guid] = ast;

    // pass down props to the child after construction
    if (ast.attributes && ast.attributes.props) {
      ast.instance.props = ast.attributes.props;
    }

    // get the childrens trees
    if (ast.children && ast.children.length <= 0 && ast.instance.render) {
      ast.children = [ast.instance.render()];
    }
  }

  // check for animations and set them up
  if (
    ast.attributes &&
    ast.attributes.style &&
    ast.attributes.style.transform
  ) {
    ast.attributes.style.transform.forEach(animation => {
      if (animation.constructor.name == 'Object') {
        // animations are bound to a property
        for (var property in animation) {
          if (animation.hasOwnProperty(property)) {
            // do stuff
            animation[property].animatedProperty = property;
            console.log(ast.uuid);
            Animated.AnimationTargets[animation[property].guid] = ast.uuid;
          }
        }
      } else {
        console.log(ast, ast.instance.uuid);
        Animated.AnimationTargets[animation.guid] = ast.instance.uuid;
      }
    });
  }

  // prepare ast children
  if (ast.children) {
    ast.instance.children = [];
    ast.children = flattenChildren(ast.children);
    ast.children.forEach(function(child, index) {

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
        ast.instance.children.push({
          uuid: child.instance.uuid,
          type: child.elementName,
        });
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

RasterManager.render = (component, target) => {
  // rudementary rendering
  if (typeof component == 'function') {
    // hasn't been inflated yet
    let c = new component();

    // top level components don't have uuids assigned, since no parent rel
    c.uuid = c.guid;

    // get the init props from the raster
    c.props = _raster.props();

    // inflate render
    let baseAST = c.render();
    baseAST.uuid = c.guid + '-' + baseAST.guid;
    let parseAST = (_inflated[c.uuid] = createComponent(baseAST));

    // setup tree for tracking
    _instances[c.uuid] = c;

    // flat list of children
    c.children = [
      {
        uuid: parseAST.instance.uuid || parseAST.instance.guid,
        type: parseAST.elementName,
      },
    ];

    // setup parent
    parseAST.instance.parent = c;

    // set the base AST with ref to our top level component
    parseAST.instance.uuid = c.guid + '-' + parseAST.instance.guid;

    // register for events
    Events.register(c);
    Events.register(parseAST.instance);

    // link rendered instances to instance tree
    link(parseAST);

    // render through raster
    _raster.render(parseAST, target);
  } else {

    // update path
    // look for calculated values {attributes, string children}
    // send the updates accordingly
    function crawl(changeStack, parentID) {

      let current = _instances[parentID + '-' + changeStack.guid];

      if (current && current.instance) {
        current.instance.attributes = changeStack.attributes;
        current.attributes = changeStack.attributes;
      }

      _instances[parentID + '-' + changeStack.guid] = current;

      changeStack.children && changeStack.children.forEach(change => {

        let currentChild = _instances[changeStack.guid + '-' + change.guid];

        if (
          (change.elementName && change.elementName.name === 'Text') ||
          (change.elementName && change.elementName.name === 'Button')
        ) {
          currentChild.instance.value = change.children[0];
          currentChild.children = [];
        }

        if (currentChild && currentChild.instance) {
          currentChild.instance.attributes = {};
        }

        if (change && change.children && change.children.length > 0) {
          crawl(change.children, change.guid);
        }

        _instances[changeStack.guid + '-' + change.guid] = currentChild;
      });

      return current;
    }

    // todo: insert and delete tree
    let updateAST = crawl(component.render(), component.guid);
    updateAST.update = true;
    _raster.render(updateAST, target);
  }
};

// links tree instances
function link(component) {
  component.children.forEach((child, index) => {
    component.children[index] = _instances[child.uuid];
    if(child.children) {
      link(child);
    }
  });
}

RasterManager.render.getInstance = uuid => {
  // get an instance out of the cache
  return _instances[uuid];
};

// return raster manager
export { RasterManager };
