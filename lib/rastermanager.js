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
  if (ast.children) {
    ast.children.forEach(function(element) {
      if (typeof element.elementName == 'function') {
        element.elementName = new element.elementName();
        // pass down props
        element.elementName.props = element.attributes;
        // get next render level
        element.children = [element.elementName.render()];
      }
    }, this);
  }
  return ast;
};

RasterManager.render = component => {
  let c = new component();
  let baseAST = c.render();
  let parseAST = parseTree(baseAST);

  console.log(baseAST);

  let html = _raster.render(parseAST);
  document.body.innerHTML = html;
};

RasterManager.currentRasterType = () => {
  return _raster.type;
};

export { RasterManager };
