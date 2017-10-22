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

let createComponent = (ast)=>{
  if (typeof ast.elementName == 'function') {
    ast.instance = new ast.elementName();
    ast.elementName = ast.instance.constructor.name;

    // a bit ugly need to clean up, how we access these props on the
    // definition vs the instance
    ast.props = ast.instance.props = ast.attributes;
  }

  if (ast.elementName == 'HTMLImageElement') {
    ast.elementName = 'Image';
  }

  if (ast.elementName == 'Button') {
    // bind button clicks to the parent view
    ast.instance.props.onPress = ast.instance.props.onPress.bind(ast);
    ast.instance.tag = _buttons * 1;
    _buttons = _buttons + 1;
  }

  if(ast.props && ast.props.style && ast.props.style.transform) {
    ast.props.style.transform.forEach((animation)=>{
      Animated.AnimationTargets[animation.guid] = ast.instance.guid;
    })
  }

  if(ast.children){
    ast.instance.children = [];
    ast.children.forEach(function(child) {
      child = createComponent(child);

      if(typeof child === 'string') {
        ast.instance.state = ast.instance.state || {};
        ast.instance.state.value = child;
      } else {
        child.instance.parent = ast.instance;
        ast.instance.children.push({
          guid: child.instance.guid,
          type: child.elementName,
        });
      }
    });
  }

  if(ast.instance) Events.register(ast.instance);
  return ast;
};

RasterManager.render = component => {
  // rudementary rendering
  if (typeof component == 'function') {
    // hasn't been inflated yet
    let c = new component();
    let baseAST = c.render();
    let parseAST = (_inflated[c.guid] = createComponent(baseAST));
    c.children = [{ guid: parseAST.instance.guid, type: parseAST.elementName }];
    parseAST.instance.parent = c;
    _raster.render(parseAST);
  } else {
    // re-rendering, dont diff, just inflate and substitute for now
    // TODO - this isn't really elegant with events, and will leak
    // needs fixing
    let parseAST = parseTree(component.render());
    let cacheid =
      _inflated[component.guid].instance &&
      _inflated[component.guid].instance.guid + '';
    parseAST.instance.guid = cacheid;
    delete _inflated[component.guid];
    _inflated[component.guid] = parseAST;
    parseAST.update = true;
    _raster.render(parseAST);
  }
};

// return raster manager
export { RasterManager };
