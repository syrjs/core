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
    if(typeof window != 'undefined' && window.fetch) {
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

    if(opts && opts.mode.toLowerCase() === 'bypass') {
      const guid = Utils.guid();
      const request = {
        method: 'get',
        guid: guid,
        url: url
      };
  
      // call to native layer for fetch
      NativeModules.SyrNetworking.get(request);
      return {
        then: (cb)=>{
          request.cb = cb;
          this.requests[guid] = request;
          return this;
        }
      }
    }

    // just hand back regular fetch object
    return this.oldFetch(url, opts)
  }
  requestHandler(event) {
    const body = event.body;
    const req = this.requests[body.guid];
    const response = {
      status: body.responseCode,
      body: body.data,
      json: ()=> {
        return JSON.parse(body.data);
      }
    }
    req.cb(response);
    delete this.requests[body.guid];
  }
}

const Networking = new networking();
export { Networking };