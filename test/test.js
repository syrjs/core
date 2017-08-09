let assert = require('assert');
import { Component, Render } from '../index';

describe('Raster CLI', function() {
  describe('Base Component', function() {
    it('should render its base content', function() {
        class MyComponent extends Component {
          render() {
            return <div>Hello World</div>
          }
        }

        let mycomponent = new MyComponent();
        assert.deepEqual(mycomponent.render() , { elementName: 'div', attributes: {}, children: [ 'Hello World' ] })
    });
  });
});
