import { Events } from '../events';
import { Animations } from '../../web/Animations';

const document = global.document || {
  body: {
    addEventListener: () => {},
  },
};

if (!global.document) {
  global.document = document;
}

//not sure where we are using this.
const styleMap = {
  height: 'height',
  width: 'width',
  left: 'left',
  right: 'right',
};

let handlers = {};

function lifeCycle(state, ast) {}

function parseStyle(style) {
  //Adding flexbox specification to styles. Since React-Native has flexbox as default.
  let ret = ['display: flex', 'position: absolute'];
  for (let prop in style) {
    let value = style[prop];
    if (typeof value === 'number') {
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

function hashCode(str) {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function parseAST(ast) {
  var retChildren = [];
  // parse children, before setting up this element (we will funnel all the way down)
  // call top down, build bottom up
  if (ast.children) {
    for (let i = 0; i < ast.children.length; i++) {
      //The children of Children are returned in an array. Check for it and recursively parse it.
      if (Array.isArray(ast.children[i])) {
        ast.children[i].forEach(function(innerChild) {
          retChildren.push(parseAST(innerChild));
        });
      } else {
        retChildren.push(parseAST(ast.children[i]));
      }
    }
  }

  let style = parseStyle((ast.attributes && ast.attributes.style) || {});
  let ret;
  if (ast.elementName && typeof ast.elementName == 'string') {
    // parse the string against a set of primative html elements
    console.log();
    let open = `<${ast.instance.tag()}`;

    open =
      open +
      (style.length > 0 ? ' style="' + style + '"' : '') +
      (ast.attributes.source
        ? ' src=' // + require(`../../images/${ast.attributes.source.uri}.png`) nuteretd for now, should be using webpack loader to find these.
        : '') +
      'id=' +
      ast.instance.guid + //verify if this is ok..
      '>';
    ret =
      open +
      (ast.content || '') +
      retChildren.join('') +
      (ast.instance.state ? ast.instance.state.value : '') +
      `</${ast.instance.tag()}>`;

    // str = str.slice(0, -1);
    // wire a click handler
    if (ast.attributes && ast.attributes.onclick) {
      const hash = hashCode(ret);
      handlers[hash] = {
        handler: ast.attributes.onclick,
        instance: ast,
      };

      ret =
        open.slice(0, -1) +
        ' data-hash="' +
        hash +
        '">' +
        (ast.content || '') +
        retChildren.join('') +
        (ast.instance.state ? ast.instance.state.value : '') +
        htmlMap[ast.elementName].close;
    }
  } else if (typeof ast.elementName !== 'object') {
    // if its something other than an object, and the element name isn't a string to match
    // just return it as an item in the ast tree
    ret = ast;
  } else {
    ret = retChildren;
  }

  return ret;
}

class domraster {
  constructor() {
    this.type = 'dom';
  }

  render(component) {
    // render a view
    document.body.innerHTML = parseAST(component);
    Events.emit({ type: 'componentDidMount', guid: component.instance.guid });
  }

  sendMessage(type, message) {
    if (type == 'animation') {
      Animations.animate(message);
    }
  }

  dimensions() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  props() {
    return {}
  }
}

const DOMRaster = new domraster();
export { DOMRaster };
