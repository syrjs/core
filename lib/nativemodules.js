import { RasterManager } from './rastermanager';
import { RasterUtils } from './rasters/rasterutils';
import { Platform } from './platform';

class nativemodules {
  constructor() {
    if (typeof window !== 'undefined') {
      if (RasterUtils.props.exported_methods) {
        let methods = JSON.parse(RasterUtils.props.exported_methods);
        methods.forEach(exportedMethod => {
          //  ClassName_Method  *ios Method is Signature
          let split = exportedMethod.split('_');

          // Destructure clazz, method, and the rest are paramTypes
          let [clazz, method, ...paramTypes] = exportedMethod.split('_');
          let exportClassName = clazz;
          let exportMethodName = method;
          paramTypes.pop();
          // differences
          // normalize NativeModules.ClassName.MethodName()
          if (Platform.OS === 'android') {
            // FooMethod in java is com.myspace.app.something.FooMethod
            exportClassName = clazz.split('.');
            exportClassName = exportClassName[exportClassName.length - 1];
          } else if (Platform.OS === 'ios') {
            // FooMethod in objc is FooMethod:N-Foo:
            exportMethodName = method.split(':');
            exportMethodName = exportMethodName[0];
          }

          // NativeModules.FooClass
          this[exportClassName] = this[exportClassName] || {};

          // NativeModules.FooClass.FooMethod
          this[exportClassName][exportMethodName] = function() {
            let _clazz = clazz;
            let _method = method;

            // FooMethod is called
            RasterManager.getRaster().sendMessage('cmd', {
              clazz: _clazz,
              method: _method,
              paramTypes: paramTypes,
              args: JSON.stringify(arguments),
            });
          };
        });
      }
    }
  }
}

const NativeModules = new nativemodules();
export { NativeModules };
