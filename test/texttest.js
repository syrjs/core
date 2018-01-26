import { Component, Render, RasterManager, Text } from '../index';
const assert = require('assert');
const initHTML = `<!DOCTYPE html><body></body></html>`;

// including JSDOM to test browser rendering.
require('./testsetup').testDom(initHTML);

describe('Text View', function() {
  class TextTest extends Component {
    render() {
      return <Text style={{ height: 50, width: 100 }}>Hello World</Text>;
    }
  }

  Render(TextTest);
  //since the text view is rendered in a span.
  const element = document.querySelector('span');

  it('should render text with the given styles', function() {
    assert.equal(element.style['height'], '50px');
    assert.equal(element.style['width'], '100px');
    assert.equal(element.textContent, 'Hello World');
  });
});
