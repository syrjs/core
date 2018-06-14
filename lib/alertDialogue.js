import { NativeModules } from './nativemodules';
import { EventEmitter } from './events';

class alertDialogue {
  constructor() {
    this.subscriptions = {};
    EventEmitter.addListener('alertDialogue', title => {
      this.subscriptions[title.body]();
    });
  }
  alert(title, message, actions) {
    console.log(NativeModules.SyrAlertDialogue);
    actions.forEach(action => {
      this.subscriptions[action.title] = action.onPress;
    });
    NativeModules.SyrAlertDialogue.alert(title, message, actions);
  }
}

const AlertDialogue = new alertDialogue();
export { AlertDialogue as Alert };
