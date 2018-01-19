import { RasterManager } from './rastermanager';
import { RasterUtils } from './rasters/rasterutils';
import { Platform } from './platform';

class nativemodules {
  constructor() {
    if (typeof window !== 'undefined') {
      if(RasterUtils.props.exported_methods){
console.log(RasterUtils.props.exported_methods);
          let methods = JSON.parse(RasterUtils.props.exported_methods);
          methods.forEach(exportedMethod => {

            let split = exportedMethod.split('_');
            let [clazz, method, ...paramTypes] = exportedMethod.split('_');
            let exportClassName = clazz;
            let exportMethodName = method;
            paramTypes.pop()

            if(Platform.OS === 'android') {
              exportClassName = clazz.split('.');
              exportClassName = exportClassName[exportClassName.length-1];
            } else if(Platform.OS === 'ios') {
              exportMethodName = method.split(':');
              exportMethodName = exportMethodName[0];
            }

            this[exportClassName] = this[clazz] || {};
            this[exportClassName][exportMethodName] = function() {
              let _clazz = clazz;
              let _method = method;

              console.log('Native Method Called! ', _clazz, _method);
              RasterManager.getRaster().sendMessage('cmd',{
                  clazz: _clazz,
                  method: _method,
                  paramTypes: paramTypes,
                  args: JSON.stringify(arguments),
                });
            }
          });

      }
    }
  }
}

const NativeModules = new nativemodules();
export { NativeModules };
