import { Component, Render, RasterManager, StackView } from '../index';
const assert = require('assert');
const initHTML = `<!DOCTYPE html><body></body></html>`;

//including JSDOM to test browser rendering.
require('./testsetup').testDom(initHTML);

describe('StackView', function() {
  class ScrollViewTest extends Component {
    render() {
      return (
        <StackView axis="horizontal" style={{ height: 50, width: 100 }}>
          Hello World
        </StackView>
      );
    }
  }

  Render(ScrollViewTest);
  const element = document.querySelector('div');

  it('should have predefined styles', function() {
    assert.equal(element.style['display'], 'flex');
    assert.equal(element.style['flex-direction'], 'row');
    assert.equal(element.style['align-items'], 'center');
    assert.equal(element.style['justify-content'], 'space-around');
  });

  it('should have user-defined orientation (vertical/horizontal)', function() {
    assert.equal(element.style['flex-direction'], 'row');
  });

  it('should have user-defined styles (height & width)', function() {
    assert.equal(element.style['height'], '50px');
    assert.equal(element.style['width'], '100px');
  });
});
