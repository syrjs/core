const htmlMap = {
  button: { open: '<button>', close: '</button>' },
  div: { open: '<div>', close: '</div>' },
  span: { open: '<span>', close: '</span>' },
};

const styleMap = {
  height: 'height',
  width: 'width',
  left: 'left',
  right: 'right',
};

function parseStyle(style) {
  let ret = [];
  for (let prop in style) {
    let value = style[prop];
    if (
      prop.indexOf('height') > -1 ||
      prop.indexOf('width') > -1 ||
      prop.indexOf('left') > -1 ||
      prop.indexOf('top') > -1
    ) {
      value = value + 'px';
    }

    // convert camel case to lower with hyphen css names
    prop = prop.replace(/([A-Z])/g, function(g) {
      return '-' + g[0].toLowerCase();
    });

    ret.push(prop + ':' + value);
  }
  return ret.join(';');
}

function parseAST(ast) {
  var retChildren = [];
  // parse children, before setting up this element (we will funnel all the way down)
  // call top down, build bottom up
  if (ast.children) {
    for (let i = 0; i < ast.children.length; i++) {
      retChildren.push(parseAST(ast.children[i]));
    }
  }

  let style = parseStyle((ast.attributes && ast.attributes.style) || {});
  let ret;

  if (ast.elementName && typeof ast.elementName == 'string') {
    // parse the string against a set of primative html elements
    let open = htmlMap[ast.elementName].open.substring(
      0,
      htmlMap[ast.elementName].open.length - 1
    );
    open = open + ' style="' + style + '">';
    ret =
      open +
      (ast.content || '') +
      retChildren.join('') +
      htmlMap[ast.elementName].close;
  } else if (typeof ast.elementName !== 'object') {
    // if its something other than an object, and the element name isn't a string to match
    // just return it as an item in the ast tree
    ret = ast;
  } else {
    ret = retChildren;
  }

  return ret;
}
class DOMRaster {
  constructor() {
    this.type = 'dom';
  }

  render(component) {
    // render a view
    return parseAST(component);
  }
}

module.exports = new DOMRaster();
