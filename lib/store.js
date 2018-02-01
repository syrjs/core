import { Component } from '../index';

class syrStore {
  constructor() {
    this.subscription;
    this.initialState = {};
  }
  createFunctionalComponent(originalComponent) {
    class outerComponent extends Component {
      constructor() {
        super();
        this._originalComponent = originalComponent;
        this.state = this.initialState;
        SyrStore.subscribe((payload) => this.handleStoreUpdates(payload));
      }
      render() {
        return (
          <this._originalComponent data={this.state} />
      )
      }
      handleStoreUpdates(newState) {
        this.setState(newState);
      }
    }
    return outerComponent;
  }
  setInitialState(initialState) {
    this.initialState = initialState;
  }
  subscribe(cb) {
    this.subscription = cb;
  }
  dispatch(payload) {
    this.subscriptions(payload)
  }
}
const SyrStore = new syrStore()
export { SyrStore };
