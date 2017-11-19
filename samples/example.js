import {
  Component,
  Render,
  View,
  Animated,
  Button,
  Text,
  Image,
  EventEmitter,
  ScrollView,
} from '../index';

class MyComponent extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View></View>
    );
  }
  componentDidMount() {
  }
}

Render(MyComponent);
