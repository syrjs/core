/** Class manages the consumption and use of rasters */

class RasterManager {}

let _raster;

RasterManager.setRaster = raster => {
  _raster = raster;
};

RasterManager.getRaster = () => {
  return _raster;
};

let render = ast => {
  if (typeof ast.elementName == 'function') {
    // construct element
    ast.elementName = new ast.elementName();

    // pass props to function
    ast.elementName.props = ast.attributes;

    // get children from ast tree
    ast.children = ast.elementName.render().children;
  } else {
  }

  document.body.innerHTML = _raster.render(ast);
};

RasterManager.render = component => {
  let c = new component();
  render(c.render());
};

RasterManager.currentRasterType = () => {
  return _raster.type;
};

export { RasterManager };
