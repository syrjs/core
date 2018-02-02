import { Component } from '../index';

class syrStore {
  constructor() {
    this.subscription;
    this.initialState = {};
  }

  createFunctionalComponent(originalComponent) {
    let _that = this;
    class outerComponent extends Component {
      constructor() {
        super();
        this._originalComponent = originalComponent;
        this.state = _that.initialState;
        _that.subscribe((payload) => this.handleStoreUpdates(payload));
      }
      render() {
        return (
          <this._originalComponent props={this.state} />
        )
      }

      handleStoreUpdates(newState) {
        let newProps = Object.assign({}, this.props, newState);
        this.props = newProps;
        this.setState(newProps);
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
    this.subscription(payload)
  }
}
const SyrStore = new syrStore()
export { SyrStore };
