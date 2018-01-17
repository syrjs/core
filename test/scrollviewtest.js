import { Component, Render, RasterManager, ScrollView } from '../index';
const assert = require('assert');
const initHTML = `<!DOCTYPE html><body></body></html>`;

//including JSDOM to test browser rendering.
require('./testsetup').testDom(initHTML);

describe('ScrollView', function() {
  class ScrollViewTest extends Component {
    render() {
      return (
        <ScrollView style={{ height: 50, width: 100 }}>Hello World</ScrollView>
      );
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
