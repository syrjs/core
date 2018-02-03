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

    // get the childrens trees
    if (ast.children && ast.children.length <= 0 && ast.instance.render) {
      ast.children = [ast.instance.render()];
    }

    // pass down props to the child after construction
    if (ast.attributes && ast.attributes.props) {
      ast.instance.props = ast.attributes.props;
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
            Animated.AnimationTargets[animation[property].guid] = ast.instance.uuid;
          }
        }
      } else {
        Animated.AnimationTargets[animation.guid] = ast.instance.uuid;
      }
    });
  }

  // prepare ast children
  if (ast.children) {
    ast.instance.children = [];
    ast.children.forEach(function(child, index) {

      // set the uuid on the ast
      child.uuid = ast.instance.guid + '-' + child.guid;

      // create the child instance
      child = createComponent(child);

      // correct some behavior for strings
      if (typeof child === 'string' || typeof child === 'number') {
        ast.instance.state = ast.instance.state || {};
        ast.instance.value = child;
        ast.children.splice(index, 1);
      } else {
        child.instance.parent = ast.instance;
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

RasterManager.render = (component, target) => {
  // rudementary rendering
  if (typeof component == 'function') {
    // hasn't been inflated yet
    let c = new component();

    c.uuid = c.guid;

    // this needs to be managed better
    c.componentWillRecieveProps
      ? c.componentWillRecieveProps(_raster.props())
      : 0;
    c.props = _raster.props();

    // inflate render
    let baseAST = c.render();
    let parseAST = (_inflated[c.uuid] = createComponent(baseAST));

    // setup tree for tracking
    _instances[c.uuid] = c;
    c.children = [
      {
        uuid: parseAST.instance.uuid,
        type: parseAST.elementName,
      },
    ];

    parseAST.instance.parent = c;
    parseAST.instance.uuid = c.guid + '-' + parseAST.instance.guid;

    // register for events
    Events.register(parseAST.instance);

    // render through raster
    _raster.render(parseAST, target);
  } else {
    // update path
    // look for calculated values {attributes, string children}
    // send the updates accordingly

    function crawl(changeStack, parentID) {

      console.log('parent id', parentID)

      let current = _instances[parentID + '-' + changeStack.guid];


      if (current && current.instance) {

        current.instance.attributes = changeStack.attributes;
        current.attributes = changeStack.attributes;
      }

      changeStack.children && changeStack.children.forEach(change => {
        let current = _instances[change.uuid];
        if (
          (change.elementName && change.elementName.name === 'Text') ||
          (change.elementName && change.elementName.name === 'Button')
        ) {
          current.instance.value = change.children[0];
          change.children = [];
        }

        if (current && current.instance) {
          current.instance.attributes = change.attributes;
        }

        if (change && change.children && change.children.length > 0) {
          crawl(change.children, change.guid);
        }
      });
    }

    // todo: insert and delete tree
    let updateAST = _inflated[component.uuid];

    if (updateAST === void(0)){
      updateAST = _instances[component.uuid];
    }

    crawl(component.render(), component.guid);

    updateAST.update = true;

    console.log(component.render(), updateAST);

    _raster.render(updateAST, target);
  }
};

RasterManager.render.getInstance = uuid => {
  console.log(_instances);
  // get an instance out of the cache
  return _instances[uuid];
};

// return raster manager
export { RasterManager };
