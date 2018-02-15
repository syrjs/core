// impliments a quick network stack to call around CORs browsers as the JavaScript VM
// this needs to either pass through and respect all of fetch
// or somehow be options
// also should handle XMLHTTPRequest
// posts and gets

// requires native modules
import { NativeModules } from './nativemodules';

// uses event emitter for async
import { EventEmitter } from './events';

// utils
import { Utils } from './utils';

class networking {
  constructor() {
    this.requests = {};

    // replace fetch
    // todo: replace XMLHttpRequest as well
    if (typeof window != 'undefined' && window.fetch) {
        // replace fetch
        this.oldFetch = window.fetch;
        window.fetch = (url, opts) => this.fetch(url, opts);
        const subscription = EventEmitter.addListener(
          'NetworkingCallback',
          (event) => this.requestHandler(event)
        );
    }
  }

  fetch(url, opts) {
    if (opts && opts.mode && opts.mode.toLowerCase() === 'bypass') {
      const guid = Utils.guid();
      const method = (opts.method && opts.method.toUpperCase()) || 'GET';
      const headers = {};

      for (var header of opts.headers.entries()) {
        headers[header[0]] = header[1];
      }

      const request = { method: method, guid: guid, url: url, body: opts.body, headers: headers };

      // call to native layer for fetch
      NativeModules.SyrNetworking.request(request);

      // make thenable
      return Promise.resolve({
        then: (cb) => {
          request.cb = cb;
          this.requests[guid] = request;
          return this;
        }
      });
    }

    // just hand back regular fetch object
    return this.oldFetch(url, opts)
  }

  requestHandler(event) {
    const body = event.body;

    if(!this.requests[body.guid]) {
      setTimeout(
        ()=>this.requestHandler(event)
      , 20); // make sure we have cb ready before we fire it
      return;
    }

    const req = this.requests[body.guid];

    const response = {
      status: body.responseCode,
      body: body.data,
      errors: body.platformError,
      json: function() {
        // if good response lets forward the data, else lets forward a friendly error message if available
        if ((this.status === 200) && this.body && this.body.length > 0) {
          // make thenable
          return Promise.resolve(JSON.parse(this.body));
        } else if (Object.keys(this.errors).length > 0 || (this.status !== 200)) {
          // catch & forward errors
          const errMessage = this.errors.message;
          errMessage.length > 0
            ? errMessage
            : 'message not available - check xcode/android studio debugging';
          return Promise.reject(errMessage);
        }

      }
    }

    req.cb(response);
    delete this.requests[body.guid];
  }
}

const Networking = new networking();
export { Networking };
