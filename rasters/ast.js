class CLIRaster {
  render(component) {
    // component will hand it's AST to the raster
    let ast = component.getAST();

    // render a view
    return ast;
  }
}

module.exports = new CLIRaster();
