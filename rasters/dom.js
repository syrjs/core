const htmlMap = {
  'Button': {open: '<button>', close: '</button>'},
  'Container': {open: '<div>', close: '</div>'},
  'Text': {open: '<span>', close: '</span>'}
}

const styleMap = {
  'height': 'height',
  'width': 'width',
  'left': 'left',
  'right': 'right'
}

function parseStyle (style) {
  let ret = []
  for (let prop in style) {
    let value = style[prop]
    if (prop.indexOf('height') > -1 || prop.indexOf('width') > -1 || prop.indexOf('left') > -1 || prop.indexOf('top') > -1) {
      value = value + 'px'
    }
    ret.push(prop + ':' + value)
  }
  return ret.join(';')
}

function parseAST (ast) {
  var retChildren = []
  if (ast.children) {
    for (let i = 0; i < ast.children.length; i++) {
      retChildren.push(parseAST(ast.children[i]))
    }
  }

  let style = parseStyle(ast.style || {})
  let open = htmlMap[ast.type].open.substring(0, htmlMap[ast.type].open.length - 1);
  open = open + ' style="' + style + '">'
  let ret = open + (ast.content || '') + retChildren.join('') + htmlMap[ast.type].close
  return ret
}

class DOMRaster {
  render (component) {
    // component will hand it's AST to the raster
    let ast = component.getAST()

    // render a view
    return parseAST(ast)
  }
}

module.exports = new DOMRaster()
