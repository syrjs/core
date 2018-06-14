import { Component, EventEmitter } from '../index';

class syrStore {
  constructor() {
    this.subscription;
    this.state = {};
  }

  createFunctionalComponent(originalComponent) {
    let _that = this;
    class outerComponent extends Component {
      constructor(props) {
        super(props);
        this._originalComponent = originalComponent;
        this.state = Object.assign({}, _that.state, props);
        _that.state = this.state;
        _that.subscribe(payload => this.handleStoreUpdates(payload));
      }
      render() {
        return <this._originalComponent data={this.state} />;
      }

      handleStoreUpdates(newState) {
        let newProps = Object.assign({}, this.props, newState);
        this.setState(newProps, () => {
          _that.state = this.state;
        });
      }
    }

    return outerComponent;
  }

  setInitialState(initialState) {
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  subscribe(cb) {
    this.subscription = cb;
  }

  dispatch(payload) {
    this.subscription(payload);
  }
}
const SyrStore = new syrStore();
export { SyrStore };
