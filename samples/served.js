import { Component, RasterManager as React } from '../index';

class myView extends Component {
  render() {
    return (
      <div>
        Currently Rendering With {RasterManager.currentRasterType()}
      </div>
    );
  }
}

React.render(myView);
