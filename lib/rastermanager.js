/** Class manages the consumption and use of rasters */

class RasterManager {}

let _raster;

RasterManager.setRaster = raster => {
  _raster = raster;
};

RasterManager.getRaster = () => {
  return _raster;
};

const parseFunctionalChild = functionalChild => {
  functionalChild.elementName = new functionalChild.elementName();
  // pass down props
  functionalChild.elementName.props = functionalChild.attributes;
  if(functionalChild.children !== null) {
    functionalChild.children.forEach(function(innerChild) {
      if(typeof innerChild.elementName === 'function') {
          parseFunctionalChild(innerChild);
      }
    })
  } else {
  functionalChild.elementName.props.children = functionalChild.children;
  functionalChild.children = functionalChild.elementName.render ?
  [functionalChild.elementName.render()] : functionalChild.children;
}
}

const parseTree = ast => {
  if (ast.children) {
    ast.children.forEach(function(element) {
      if (typeof element.elementName === 'function') {
        parseFunctionalChild(element)
      }
    }, this);
  }
  return ast;
};

RasterManager.render = component => {
  let c = new component();
  let baseAST = c.render();
  let parseAST = parseTree(baseAST);
  let html = _raster.render(parseAST);
  document.body.innerHTML = html;
};

RasterManager.currentRasterType = () => {
  return _raster.type;
};

export { RasterManager };
