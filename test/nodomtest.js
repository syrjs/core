import { NoDOM } from '../lib/rasters/nodom';

const assert = require('assert');

describe('NoDOM', function() {
  describe('render', function() {
    it('pass a message to render', function() {
      NoDOM.recieveMessage = (type, message) => {
        assert.deepEqual(message, { foo: 'bar' });
      };
      NoDOM.render({
        foo: 'bar',
      });
    });
  });
  describe('dimensions', function() {
    it('pass back dimensions provided', function() {
      NoDOM.dimensionValues = {
        height: 100,
        width: 100,
        scale: 100,
      };
      assert.deepEqual(NoDOM.dimensions(), {
        height: 100,
        width: 100,
        scale: 100,
      });
    });
  });
});
