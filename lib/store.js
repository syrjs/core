import { Component } from '../index';

class syrStore {
  constructor() {
    this.subscription;
<<<<<<< HEAD
    this.state = {};
=======
    this.initialState = {};
>>>>>>> e195a6d4fc3abb5f30f6b9cc0db5963c8aa8d5cc
  }

  createFunctionalComponent(originalComponent) {
    let _that = this;
    class outerComponent extends Component {
      constructor() {
        super();
        this._originalComponent = originalComponent;
<<<<<<< HEAD
        this.state = _that.state;
=======
        this.state = _that.initialState;
>>>>>>> e195a6d4fc3abb5f30f6b9cc0db5963c8aa8d5cc
        _that.subscribe((payload) => this.handleStoreUpdates(payload));
      }
      render() {
        return (
<<<<<<< HEAD
          <this._originalComponent props={this.state} />
=======
          <this._originalComponent data={this.state} />
>>>>>>> e195a6d4fc3abb5f30f6b9cc0db5963c8aa8d5cc
        )
      }

      handleStoreUpdates(newState) {
<<<<<<< HEAD
        let newProps = Object.assign({}, this.props, newState);
        this.props = newProps;
        _that.state = newProps;
        this.setState(newProps);
=======
        this.setState(newState);
>>>>>>> e195a6d4fc3abb5f30f6b9cc0db5963c8aa8d5cc
      }

    }

    return outerComponent;
  }

  setInitialState(initialState) {
<<<<<<< HEAD
    this.state = initialState;
  }

  getState() {
    return this.state;
=======
    this.initialState = initialState;
>>>>>>> e195a6d4fc3abb5f30f6b9cc0db5963c8aa8d5cc
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
