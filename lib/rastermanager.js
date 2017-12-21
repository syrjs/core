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
    ast.instance = new ast.elementName(ast.attributes);
    ast.instance.guid = ast.guid;
    ast.elementName = ast.instance.constructor.name;

    _instances[ast.instance.guid] = ast;

    if (ast.children && ast.children.length <= 0 && ast.instance.render) {
      ast.children = [ast.instance.render()];
    }
  }

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
            Animated.AnimationTargets[animation[property].guid] =
              ast.instance.guid;
          }
        }
      } else {
        Animated.AnimationTargets[animation.guid] = ast.instance.guid;
      }
    });
  }

  if (ast.children) {
    ast.instance.children = [];
    ast.children.forEach(function(child, index) {
      child = createComponent(child);

      if (typeof child === 'string' || typeof child === 'number') {
        ast.instance.state = ast.instance.state || {};
        ast.instance.value = child;
        ast.children.splice(index, 1);
      } else {
        child.instance.parent = ast.instance;
        ast.instance.children.push({
          guid: child.instance.guid,
          type: child.elementName,
        });
      }
    });
  }

  if (ast.instance) Events.register(ast.instance);
  return ast;
};

RasterManager.render = component => {
  // rudementary rendering
  if (typeof component == 'function') {
    // hasn't been inflated yet
    let c = new component();

    // this needs to be managed better
    c.componentWillRecieveProps
      ? c.componentWillRecieveProps(_raster.props())
      : 0;
    c.props = _raster.props();

    // inflate render
    let baseAST = c.render();
    let parseAST = (_inflated[c.guid] = createComponent(baseAST));

    // setup tree for tracking
    _instances[c.guid] = c;
    c.children = [
      {
        guid: parseAST.instance.guid,
        type: parseAST.elementName,
      },
    ];
    parseAST.instance.parent = c;

    // render through raster
    _raster.render(parseAST);
  } else {
    // update path
    // look for calculated values {attributes, string children}
    // send the updates accordingly

    function crawl(changeStack) {
      changeStack.children.forEach(change => {
        let current = _instances[change.guid];

        if (change.elementName && change.elementName.name === 'Text') {
          current.instance.value = change.children[0];
          change.children = [];
        }

        if (current && current.instance) {
          current.instance.attributes = change.attributes;
        }

        if (change && change.children && change.children.length > 0) {
          crawl(change);
        }
      });
    }

    let updateAST = _instances[component.guid].children[0];
    // todo: insert and delete tree
    crawl(component.render(), updateAST);
    updateAST.update = true;

    _raster.render(updateAST);
  }
};

RasterManager.render.getInstance = guid => {
  // get an instance out of the cache
  return _instances[guid];
};

// return raster manager
export { RasterManager };
