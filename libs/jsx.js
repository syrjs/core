"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  /* ==========================================================================
   * Utilities
   * ======================================================================= */

  var transformOnType = function transformOnType(transforms) {
    return function (node) {
      var transformer = transforms[node.type];
      if (transformer) {
        return transformer(node);
      }
      throw new Error(node.type + " could not be transformed");
    };
  };

  /* ==========================================================================
   * Initial configuration
   * ======================================================================= */

  var initConfig = function initConfig(path, state) {
    var _state$opts = state.opts,
        _state$opts$useNew = _state$opts.useNew,
        useNew = _state$opts$useNew === undefined ? false : _state$opts$useNew,
        constructorModule = _state$opts.module,
        constructorFunction = _state$opts.function,
        _state$opts$useVariab = _state$opts.useVariables,
        useVariables = _state$opts$useVariab === undefined ? false : _state$opts$useVariab;


    var variablesRegex = void 0,
        jsxObjectTransformer = void 0;

    if (useVariables === true) {
      // Use the default variables regular expression when true.
      variablesRegex = /^[A-Z]/;
    } else if ((0, _isString2.default)(useVariables)) {
      // If it’s a plain regular expression string.
      variablesRegex = new RegExp(useVariables);
    }

    var executeExpression = useNew ? t.newExpression : t.callExpression;
    var jsxObjectTransformerCreator = function jsxObjectTransformerCreator(expression) {
      return function (value) {
        return executeExpression(expression, [value]);
      };
    };

    if (constructorModule) {
      // If the constructor function will be retrieved from a module.
      var moduleName = path.scope.generateUidIdentifier(useNew ? 'JSXNode' : 'jsx');
      jsxObjectTransformer = jsxObjectTransformerCreator(moduleName);

      var importDeclaration = t.importDeclaration([t.importDefaultSpecifier(moduleName)], t.stringLiteral(constructorModule));

      // Add the import declration to the top of the file.
      path.findParent(function (p) {
        return p.isProgram();
      }).unshiftContainer('body', importDeclaration);
    } else if (constructorFunction) {
      // If the constructor function will be an in scope function.
      var expression = constructorFunction.split('.').map((0, _ary2.default)(t.identifier, 1)).reduce((0, _ary2.default)(t.memberExpression, 2));
      jsxObjectTransformer = jsxObjectTransformerCreator(expression);
    } else {
      // Otherwise, we won‘t be mapping.
      jsxObjectTransformer = _identity2.default;
    }

    return {
      variablesRegex: variablesRegex,
      jsxObjectTransformer: jsxObjectTransformer
    };
  };

  /* =========================================================================
   * Visitors
   * ======================================================================= */

  var visitJSXElement = function visitJSXElement(path, state) {
    if (!state.get('jsxConfig')) {
      state.set('jsxConfig', initConfig(path, state));
    }

    var _state$get = state.get('jsxConfig'),
        variablesRegex = _state$get.variablesRegex,
        jsxObjectTransformer = _state$get.jsxObjectTransformer;

    /* ==========================================================================
     * UniqueId generator
     * ======================================================================= */


    var guid = function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    /* ==========================================================================
     * Node Transformers
     * ======================================================================= */

    var JSXIdentifier = function JSXIdentifier(node) {
      return t.stringLiteral(node.name);
    };

    var JSXNamespacedName = function JSXNamespacedName(node) {
      return t.stringLiteral(node.namespace.name + ":" + node.name.name);
    };

    var _JSXMemberExpression = transformOnType({
      JSXIdentifier: function JSXIdentifier(node) {
        return t.identifier(node.name);
      },
      JSXMemberExpression: function JSXMemberExpression(node) {
        return t.memberExpression(_JSXMemberExpression(node.object), _JSXMemberExpression(node.property));
      }
    });

    var JSXElementName = transformOnType({
      JSXIdentifier: variablesRegex ? function (node) {
        return variablesRegex.test(node.name) ? t.identifier(node.name) : JSXIdentifier(node);
      } : JSXIdentifier,
      JSXNamespacedName: JSXNamespacedName,
      JSXMemberExpression: _JSXMemberExpression
    });

    var JSXExpressionContainer = function JSXExpressionContainer(node) {
      return node.expression;
    };

    var JSXAttributeName = transformOnType({ JSXIdentifier: JSXIdentifier, JSXNamespacedName: JSXNamespacedName, JSXMemberExpression: _JSXMemberExpression });

    var JSXAttributeValue = transformOnType({
      StringLiteral: function StringLiteral(node) {
        return node;
      },
      JSXExpressionContainer: JSXExpressionContainer
    });

    var JSXAttributes = function JSXAttributes(nodes) {
      var object = [];
      var objects = [];

      nodes.forEach(function (node) {
        switch (node.type) {
          case 'JSXAttribute':
            {
              if (!object) {
                object = [];
              }

              var attributeName = JSXAttributeName(node.name);
              var objectKey = _esutils2.default.keyword.isIdentifierNameES6(attributeName.value) ? t.identifier(attributeName.value) : attributeName;

              object.push(t.objectProperty(objectKey, JSXAttributeValue(node.value)));
              break;
            }
          case 'JSXSpreadAttribute':
            {
              if (object) {
                objects.push(t.objectExpression(object));
                object = null;
              }

              objects.push(node.argument);
              break;
            }
          default:
            throw new Error(node.type + " cannot be used as a JSX attribute");
        }
      });

      if (object && object.length > 0) {
        objects.push(t.objectExpression(object));
      }

      if (objects.length === 0) {
        return t.objectExpression([]);
      } else if (objects.length === 1) {
        return objects[0];
      }

      return t.callExpression(state.addHelper('extends'), objects);
    };

    var JSXText = function JSXText(node) {
      if (state.opts.noTrim) return t.stringLiteral(node.value);
      var value = node.value.replace(/\n\s*/g, '');
      return value === '' ? null : t.stringLiteral(value);
    };

    var JSXElement = function JSXElement(node) {
      return jsxObjectTransformer(t.objectExpression([t.objectProperty(t.identifier(nameProperty), JSXElementName(node.openingElement.name)), t.objectProperty(t.identifier(attributesProperty), JSXAttributes(node.openingElement.attributes)), t.objectProperty(t.identifier(childrenProperty), node.closingElement ? JSXChildren(node.children) : t.nullLiteral()), t.objectProperty(t.identifier(uniqueId), t.stringLiteral(guid()))]));
    };

    var JSXChild = transformOnType({ JSXText: JSXText, JSXElement: JSXElement, JSXExpressionContainer: JSXExpressionContainer });

    var JSXChildren = function JSXChildren(nodes) {
      return t.arrayExpression(nodes.map(JSXChild).filter(Boolean)
      // Normalize all of our string children into one big string. This can be
      // an optimization as we minimize the number of nodes created.
      // This step just turns `['1', '2']` into `['12']`.
      .reduce(function (children, child) {
        var lastChild = children.length > 0 ? children[children.length - 1] : null;

        // If this is a string literal, and the last child is a string literal, merge them.
        if (child.type === 'StringLiteral' && lastChild && lastChild.type === 'StringLiteral') {
          return [].concat(_toConsumableArray(children.slice(0, -1)), [t.stringLiteral(lastChild.value + child.value)]);
        }

        // Otherwise just append the child to our array normally.
        return [].concat(_toConsumableArray(children), [child]);
      }, []));
    };

    // Actually replace JSX with an object.
    path.replaceWith(JSXElement(path.node));
  };

  /* ==========================================================================
   * Plugin
   * ======================================================================= */

  return {
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      JSXElement: visitJSXElement
    }
  };
};

var _isString = require("lodash/isString");

var _isString2 = _interopRequireDefault(_isString);

var _identity = require("lodash/identity");

var _identity2 = _interopRequireDefault(_identity);

var _ary = require("lodash/ary");

var _ary2 = _interopRequireDefault(_ary);

var _esutils = require("esutils");

var _esutils2 = _interopRequireDefault(_esutils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

require("babel-core").transform("code", {
  presets: ["es2015"]
});


var nameProperty = 'elementName';
var attributesProperty = 'attributes';
var childrenProperty = 'children';
var uniqueId = 'guid';
