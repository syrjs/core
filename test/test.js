import { Component, Render, RasterManager, View } from '../index';
const assert = require('assert');

describe('Component', function() {
  describe('Base Component', function() {
    it('should render', function() {
      class MyComponent extends Component {
        render() {
          return <View>Hello World</View>;
        }
      }

      const mycomponent = new MyComponent();
      const rendering = mycomponent.render();

      assert.equal(typeof rendering.elementName, 'function');
      assert.equal(typeof rendering.attributes, 'object');
      assert.equal(rendering.children instanceof Array, true);
      assert.equal(typeof rendering.guid, 'string');
    });
  });
});
