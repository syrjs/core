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
    return <View />;
  }
  componentDidMount() {}
}

Render(MyComponent);
