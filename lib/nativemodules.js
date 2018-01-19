import { RasterManager } from './rastermanager';
import { RasterUtils } from './rasters/rasterutils';
import { Platform } from './platform';

class nativemodules {
  constructor() {
    if (typeof window !== 'undefined') {
      let methods = JSON.parse(RasterUtils.props.exported_methods);
      methods.forEach(exportedMethod => {

        let split = exportedMethod.split('_');
        let clazz = split[0];
        let method = split[1];

        if(Platform.OS === 'android') {
          clazz = clazz.split('.');
          clazz = clazz[clazz.length-1];

        }

        this[clazz] = this[clazz] || {};
        this[clazz][method] = function() {
            console.log('Native Method Called!', RasterManager);
        }
      });
    }
  }
}

const NativeModules = new nativemodules();
export { NativeModules };
