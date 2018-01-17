import { RasterManager } from './rastermanager';

class nativemodules {
  constructor() {
    if (typeof window !== 'undefined') {
      var queryStringKeyValue = window.location.search
        .replace('?', '')
        .split('&');
      if (queryStringKeyValue != '') {
        for (let i = 0; i < queryStringKeyValue.length; i++) {
          let className = queryStringKeyValue[i]
            .split('=')[0]
            .replace(queryStringKeyValue[i].split('=')[1], '');
          let classObj = this[className] || {};
          let method = queryStringKeyValue[i]
            .split('=')[1]
            .replace('__syr_export__', '')
            .split(':')[0];
          classObj[method] = function() {
            var selector = queryStringKeyValue[i].split('=')[1];
            var nsClass = queryStringKeyValue[i]
              .split('=')[0]
              .replace(queryStringKeyValue[i].split('=')[1], '');
            // post ast to native raster
            // todo abstract this away from window
            window.webkit.messageHandlers['SyrNative'].postMessage({
              type: 'cmd',
              class: nsClass,
              selector: selector,
              args: JSON.stringify(arguments),
            });
          };
          this[className] = classObj;
        }
      }
    }
  }
}

const NativeModules = new nativemodules();
export { NativeModules };
