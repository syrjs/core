import { NativeModules } from './nativemodules';

// if(!Platform.isWeb) {
  let AlertDialogue = NativeModules.AlertDialogue;
  export { AlertDialogue };
// }
