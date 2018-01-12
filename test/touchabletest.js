import { Component, Render, RasterManager, TouchableOpacity } from '../index';
const assert = require('assert');
const initHTML = `<!DOCTYPE html><body></body></html>`;

//including JSDOM to test browser rendering.
require('./testsetup').testDom(initHTML);

const captureStream = require('./testsetup').captureStream;

describe('TouchableOpacity', function() {
  class TouchableTest extends Component {
    render() {
      return (
        <TouchableOpacity
          onPress={() => console.log('Touchable OnClick works')}
        >
          Hello World
        </TouchableOpacity>
      );
    }
  }

  Render(TouchableTest);
  const element = document.querySelector('div');

  it('should have onclick', function() {
    assert.equal(typeof element.onclick, 'function');
  });

  let hook;
  beforeEach(function() {
    hook = captureStream(process.stdout);
  });
  afterEach(function() {
    hook.unhook();
  });

  it('should execute onclick and execute the given function. (in this case a console.log)', function() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('click', false, true);
    element.dispatchEvent(event);
    assert.equal(hook.captured(), 'Touchable OnClick works\n');
  });
});
