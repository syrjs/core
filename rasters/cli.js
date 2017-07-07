class CLIRaster {
  render (component) {
    // component will hand it's AST to the raster
    var ast = component.getAST();
  }
}

module.exports = new CLIRaster();