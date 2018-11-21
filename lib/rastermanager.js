/** Class manages the consumption and use of rasters */
import { Events } from './events';
import { Animated } from './animated';
import { create } from 'domain';

class RasterManager {}

// who is currently rendering
let _raster;

// cache
let _cache = {};

// set the raster to be used (dom, or wkwebview)
RasterManager.setRaster = raster => {
  _raster = raster;
};

// returns the current raster
RasterManager.getRaster = () => {
  return _raster;
};

RasterManager.render = (component, target) => {
  // rudementary rendering
  if (typeof component == 'function') {
    // render through raster
    _raster.render(initializeComponent(component), target);
  } else {
    _raster.render(updateComponent(component), target);
  }
};

RasterManager.render.getInstance = uuid => {
  // get an instance out of the cache
  return _cache[uuid];
};

const prepareProps = component => {
  component.instance.props = component.attributes;

  if (component.attributes.style) {
    component.instance.style = component.attributes.style;
    delete component.attributes.style;
  }

  if (component.attributes.onPress) {
    component.instance.onPress = component.attributes.onPress;
    delete component.attributes.onPress;
  }

  return component;
};

const prepareAnimations = component => {
  // check for animations and set them up
  if (
    component.instance &&
    component.instance.style &&
    component.instance.style.transform
  ) {
    component.instance.style.transform.forEach(animation => {
      if (animation.constructor.name == 'Object') {
        // animations are bound to a property
        for (var property in animation) {
          if (animation.hasOwnProperty(property)) {
            // do stuff
            animation[property].animatedProperty = property;
            Animated.AnimationTargets[animation[property].guid] =
              component.uuid;
          }
        }
      } else {
        Animated.AnimationTargets[animation.guid] = component.instance.uuid;
      }
    });
  }
};

/**
 * Inflates AST , calls render and constructs objects
 * @param {object} ast
 */
const createComponent = (ast, fenceid) => {
  if (typeof ast.elementName == 'function') {
    // construct a new instance
    ast.instance = new ast.elementName(ast.attributes);
    ast.instance.guid = ast.guid;
    ast.instance.uuid = ast.uuid;
    prepareProps(ast);

    // if there is a key present , add it to the uuid to ensure the ids are unique
    ast.instance.uuid = ast.instance.props.key
      ? `${ast.instance.uuid}-${ast.instance.props.key}`
      : ast.instance.uuid;

    ast.elementName = ast.instance.constructor.name;
    // cache the instance
    _cache[ast.instance.uuid || ast.guid] = ast;

    // get the childrens trees
    if (ast.children && ast.children.length <= 0 && ast.instance.render) {
      fenceid = ast.instance.uuid;
      ast.children = [ast.instance.render()];
    }
  }

  // check for animations and set them up
  prepareAnimations(ast);

  let nullChildIndexs = [];
  // prepare ast children
  if (ast.children.length > 0) {
    ast.children = flattenChildren(ast.children);

    ast.children.forEach(function(child, index) {
      if (child) {
        if (typeof child !== 'string' && typeof child !== 'number') {
          // set the uuid on the ast
          if (fenceid) {
            child.uuid = fenceid + '-' + child.guid;
            child.fenceid = fenceid;
          } else {
            child.uuid = ast.uuid + '-' + child.guid;
            child.fenceid = ast.uuid;
          }
          // create the child instance
          child = createComponent(child, fenceid);
        }

        // correct some behavior for strings
        if (typeof child === 'string' || typeof child === 'number') {
          ast.instance.state = ast.instance.state || {};
          ast.instance.value = child;
          ast.children.splice(index, 1);
        } else {
          ast.children[index] = child;
        }
      } else {
        // the child is null, remove it from the tree
        nullChildIndexs.push(index);
      }
    });
  }

  // remove nulls from the render tree
  nullChildIndexs.forEach(removeIndex => {
    ast.children.splice(removeIndex, 1);
  });

  // only register for events if we know a uuid
  if (ast.instance && ast.instance.uuid) {
    Events.register(ast.instance);
  }

  return ast;
};

const flattenChildren = children => {
  var flattenedChildren = [];
  children.forEach(child => {
    if (Array.isArray(child)) {
      flattenedChildren = flattenedChildren.concat(flattenChildren(child));
    } else {
      flattenedChildren.push(child);
    }
  });
  return flattenedChildren;
};

const initializeComponent = component => {
  // initial props
  const initial_props = _raster.props();

  // hasn't been inflated yet
  let c = new component(initial_props);

  // top level components don't have uuids assigned, since no parent rel
  c.uuid = c.fenceid = c.guid;

  // get the init props from the raster
  c.props = c.props || _raster.props();

  // inflate render
  let baseAST = c.render();

  // if there is nothing to render, then skip rendering the tree
  if (baseAST !== null) {
    baseAST.fenceid = c.uuid;
    baseAST.uuid = c.guid + '-' + baseAST.guid;
    let parseAST = createComponent(baseAST);
    // flat list of children
    c.children = [parseAST];
    // set the base AST with ref to our top level component
    parseAST.instance.uuid = c.guid + '-' + parseAST.instance.guid;
    Events.register(parseAST.instance);
  }

  // setup tree for tracking
  _cache[c.uuid] = c;

  // register for events
  Events.register(c);

  return c;
};

const updateComponent = (component, rendered) => {
  function reflow(component, passedUpdates) {
    let updates = [];
    let shouldComponentUpdate = true;
    let previousProps = (component.instance && component.instance.props) || {};

    if (component.render) {
      // inflate
      updates = [component.render()];
      // console.log('i should inflate: ', component, updates);
    } else {
      if (component.instance) {
        // use tree
        // console.log('i have an instance ', component, passedUpdates)

        if (passedUpdates) {
          // console.log('passed updates', passedUpdates);

          // console.log('setting props >>> ' + component.elementName + ' ' + JSON.stringify(component.instance.props) + ' --> ' + JSON.stringify(passedUpdates.attributes))
          component.instance.setProps(passedUpdates.attributes);

          if (component.instance.shouldComponentUpdate) {
            shouldComponentUpdate = component.instance.shouldComponentUpdate.call(
              this,
              passedUpdates.attributes,
              component.instance.state
            );
          }

          // --- component update start ---

          if (shouldComponentUpdate) {
            if (passedUpdates.attributes.style) {
              component.instance.style = passedUpdates.attributes.style;
              // console.log('updating styles >>> ' + component.elementName + '' + JSON.stringify(passedUpdates.attributes.style))
              delete passedUpdates.attributes.style;
            }

            if (typeof passedUpdates.children[0] === 'string') {
              if (component.instance.value !== passedUpdates.children[0]) {
                component.instance.value = passedUpdates.children[0];
                // console.log('updated string value >>> ' + component.elementName + ' ' + component.instance.value);
              }
              passedUpdates.children = [];
            }
          }

          // --- component update end ---
        }

        if (shouldComponentUpdate == false) {
          updates = [];
        } else if (component.instance.render && shouldComponentUpdate == true) {
          updates = [component.instance.render()];
          // console.log('I can also render', updates);
        } else {
          updates = passedUpdates.children;
        }
      } else {
        // use tree
        // console.log('i do not have an instance: ', component)
      }
    }

    if (updates.length > 0) {
      updates = flattenChildren(updates);

      // get a fence id from the components children
      let fenceid =
        (component.children[0] && component.children[0].fenceid) ||
        component.uuid;
      let updateIDs = {};

      // reconcile updates
      // flag those that are not currently in the tree
      updates.forEach((update, index) => {
        // update could be null
        if (update) {
          let uuid = fenceid + '-' + update.guid;

          // if there is a key on the item, add it for a unique guid
          if (update.attributes && update.attributes.key) {
            uuid = uuid + '-' + update.attributes.key;
          }

          // check the cache
          if (typeof _cache[uuid] == 'undefined') {
            // key is added during create component
            // not clean :shrug: - derek
            update.uuid = fenceid + '-' + update.guid;
            let newComponent = createComponent(update);

            // cache the new component
            _cache[newComponent.instance.uuid] = newComponent;

            // insert into the child array at the current update index
            component.children.splice(index, 0, newComponent);
          } else {
            // update the component
            reflow(_cache[uuid], update);
          }

          // cache the update id's to verify if we need to unmount
          updateIDs[uuid] = update;
        }
      });

      // loop through the child array backwards so we can operate on it
      for (let i = component.children.length - 1; i >= 0; --i) {
        let child = component.children[i];
        let index = i;

        // if the component is not int he update tree
        // mark for removal
        if (!updateIDs[child.instance.uuid]) {
          child.unmount = true;
          // and remove from cache
          delete _cache[child.instance.uuid];
        } else if (child.unmount) {
          // if we're reconciling a tree previously built,
          // remove any unmounts from the tree we marked last time
          component.children.splice(index, 1);
        }
      }
    }

    if (component.instance && component.instance.componentDidUpdate) {
      shouldComponentUpdate = component.instance.componentDidUpdate.call(
        this,
        previousProps
      );
    }
  }

  // console.time("ui reconciled");
  // todo: insert and delete tree
  if (!component.instance) {
    component = _cache[component.uuid];
  }

  reflow(component);
  component.update = true;

  // console.timeEnd("ui reconciled");
  return component;
};

// return raster manager
export { RasterManager };
