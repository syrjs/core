/** Class manages the consumption and use of rasters */
import { Events } from './events';
import { Animated } from './animated';
class RasterManager {}

// who is currently rendering
let _raster;

// inflated representation of the components JSX
let _inflated = {};

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

const createComponent = ast => {
  if (typeof ast.elementName == 'function') {
    ast.instance = new ast.elementName(ast.attributes);
    ast.elementName = ast.instance.constructor.name;
    if((ast.children && ast.children.length <=0) && ast.instance.render) {
      ast.children = [ast.instance.render()];
    }
  }

  // todo -- get rid of this button code here
  if (ast.elementName == 'Button' && ast.instance.props.onPress) {
    // bind button clicks to the parent view
    ast.instance.props.onPress = ast.instance.props.onPress.bind(ast);
    ast.instance.tag = _buttons * 1;
    _buttons = _buttons + 1;
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

      if (typeof child === 'string') {
        ast.instance.state = ast.instance.state || {};
        ast.instance.state.value = child + '';
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
    let baseAST = c.render();
    let parseAST = (_inflated[c.guid] = createComponent(baseAST));
    c.children = [
      {
        guid: parseAST.instance.guid,
        type: parseAST.elementName,
      },
    ];
    parseAST.instance.parent = c;
    _raster.render(parseAST);
  } else {
  }
};

// return raster manager
export { RasterManager };
