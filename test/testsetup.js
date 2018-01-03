//including JSDOM to test browser rendering.
exports.testDom = function() {
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM(`<!DOCTYPE html><body></body></html>`).window.document;
}

//https://stackoverflow.com/questions/18543047/mocha-monitor-application-output
//method to capture console.logs in mocha tests.
exports.captureStream = function(stream){
  var oldWrite = stream.write;
  var buf = '';
  stream.write = function(chunk, encoding, callback){
    buf += chunk.toString(); // chunk is a String or Buffer
    oldWrite.apply(stream, arguments);
  }

  return {
    unhook: function unhook(){
     stream.write = oldWrite;
    },
    captured: function(){
      return buf;
    }
  };
}
