import { Component, Render, RasterManager, Text } from '../index';
const assert = require('assert');
const initHTML = `<!DOCTYPE html><body><div id="root"></div></body></html>`;

// including JSDOM to test browser rendering.
require('./testsetup').testDom(initHTML);
const HTMLSpanElement = window.HTMLSpanElement;

describe('Render Target', function() {
  class RenderTargetTest extends Component {
    render() {
      return (
        <Text className="foo" style={{ height: 50, width: 100 }}>
          Hello World
        </Text>
      );
    }
  }

  Render(RenderTargetTest, 'root');
  const element = document.getElementById('root').children[0];

  it('should render the given element as a child to the target', function() {
    assert.equal(element.style['height'], '50px');
    assert.equal(element.style['width'], '100px');
    assert.equal(element.textContent, 'Hello World');
  });
});
describe('Render className', function() {
  class RenderClassNameTest extends Component {
    render() {
      return (
        <Text className="foo" style={{ height: 50, width: 100 }}>
          Hello World
        </Text>
      );
    }
  }

  Render(RenderClassNameTest);
  //selecting the element with the given className
  const element = document.querySelector('.foo');

  it('should render the given element with the given class', function() {
    assert.equal(element instanceof HTMLElement, true);
    assert.equal(element instanceof HTMLSpanElement, true);
    assert.equal(element.textContent, 'Hello World');
  });
});
