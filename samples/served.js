import { Component, RasterManager } from '../index';

class myView extends Component {
  render() {
    return (
      <div>
        Currently Rendering With {RasterManager.currentRasterType()}
      </div>
    );
  }
}

RasterManager.render(myView);
