import { Component, Render, RasterManager, View, Text } from '../index';
const assert = require('assert');

describe('JSX', function() {
  describe('Comments', function() {
    it('should not include comments in children', function() {
      class MyComponent extends Component {
        render() {
          return (
            <View>
              {/*These are comments*/}
              <View />
              {/*These are comments*/}
              <Text> Hello </Text>
              {/*These are comments*/}
            </View>
          );
        }
      }

      const mycomponent = new MyComponent();
      const rendering = mycomponent.render();

      assert.equal(typeof rendering.elementName, 'function');
      assert.equal(typeof rendering.attributes, 'object');
      assert.equal(rendering.children instanceof Array, true);
      assert.equal(rendering.children.length, 2);
      assert.equal(typeof rendering.guid, 'string');
    });
  });
});
