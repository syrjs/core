/** Class manages the consumption and use of rasters */

class RasterManager {}

let _raster;

RasterManager.setRaster = raster => {
  _raster = raster;
};

RasterManager.getRaster = () => {
  return _raster;
};

const parseTree = ast => {

  if (typeof ast.elementName == 'function') {
    ast.instance = new ast.elementName();
    ast.elementName = ast.instance.constructor.name;
  }
  if (ast.children) {
    ast.children.forEach(function(element) {
      if (typeof element.elementName == 'function') {
        element.elementName = new element.elementName();
        // pass down props
        element.elementName.props = element.attributes;
        // get next render level
        element.children = [element.elementName.render()];
      } else {
        if(typeof element != 'string') {
          element.props = element.attributes; // this fails on textnodes
        }
      }
    }, this);
  }
  return ast;
};

RasterManager.render = component => {
  let c = new component();

  console.log(c);

  //let baseAST = c.render();
  let parseAST = parseTree(baseAST);

  _raster.render(parseAST);
};

RasterManager.currentRasterType = () => {
  return _raster.type;
};

export { RasterManager };
