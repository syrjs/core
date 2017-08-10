import { Component, Render, RasterManager } from '../index';
const assert = require('assert');

describe('Component', function() {
  describe('Base Component', function() {
    it('should render', function() {
      class MyComponent extends Component {
        render() {
          return <div>Hello World</div>;
        }
      }

      let mycomponent = new MyComponent();
      assert.deepEqual(mycomponent.render(), {
        elementName: 'div',
        attributes: {},
        children: ['Hello World'],
      });
    });
  });
});

describe('Raster', function() {
  describe('Raster Core', function() {
    it('Return the Current Raster', function() {
      assert.equal(RasterManager.getRaster().type, 'dom');
    });
  });
  describe('Raster Render', function() {
    it('should render', function() {
      class MyComponent extends Component {
        render() {
          return <div>Hello World</div>;
        }
      }

      document.body.innerHTML = '';
      Render(MyComponent);

      assert.equal(document.body.innerHTML, '<div style="">Hello World</div>');
    });
  });
});
