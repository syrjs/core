import { Component, Render, RasterManager, StackView } from '../index';
const assert = require('assert');

//including JSDOM to test browser rendering.
require('./testsetup').testDom();

describe('StackView', function() {
  class ScrollViewTest extends Component {
    render() {
      return <StackView style={{height: 50, width: 100}}>Hello World</StackView>;
    }
  }

  Render(ScrollViewTest);
  const element = document.querySelector('div');

  it('should have predefined styles', function() {
    assert.equal(element.style['overflow-x'], 'hidden');
    assert.equal(element.style['overflow-y'], 'scroll');
    assert.equal(element.style['white-space'], 'nowrap');
  });

  it('should have user-defined styles (height & width)', function() {
    assert.equal(element.style['height'], '50px');
    assert.equal(element.style['width'], '100px');
  });

});
