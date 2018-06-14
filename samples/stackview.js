import {
  Component,
  Render,
  StackView,
  ScrollView,
  Dimensions,
  Animated,
  Text,
  Button,
  Image,
  TouchableOpacity,
  LinearGradient,
  PixelRatio,
  Platform,
  NativeModules,
  View,
} from '../index';

class OtherClass extends Component {
  constructor() {
    super();
    this.state = {
      color: '#ff00ff',
    };
  }
  onPressHandler(btn) {
    console.log('OtherClass');
    this.setState({
      color: '#0fe0ff',
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onPressHandler('+');
        }}
        style={{ height: 800, width: 500 }}
      >
        <View
          style={{ height: 800, width: 500, backgroundColor: this.state.color }}
        />
      </TouchableOpacity>
    );
  }
}

class AnOtherClass extends Component {
  constructor() {
    super();
    this.state = {
      color: '#ffff00',
    };
  }
  onPressHandler(btn) {
    console.log('OtherClass');
    this.setState({
      color: '#ef00ff',
    });
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onPressHandler('+');
        }}
        style={{ height: 500, width: 500 }}
      >
        <View
          style={{ height: 500, width: 500, backgroundColor: this.state.color }}
        />
      </TouchableOpacity>
    );
  }
}

class SomeOtherClass extends Component {
  constructor() {
    super();
    this.state = {
      color: '#0000ff',
      height: 600,
    };
  }
  onPressHandler(btn) {
    console.log('OtherClass');
    this.setState({
      color: '#0ff0ef',
      height: 300,
    });
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onPressHandler('+');
        }}
        style={{ height: this.state.height, width: 500 }}
      >
        <View
          style={{ height: 600, width: 500, backgroundColor: this.state.color }}
        />
      </TouchableOpacity>
    );
  }
}

class Address extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Siddharth',
    };
  }

  onPressHandler(btn) {
    console.log('OtherClass');
    this.setState({
      name: 'SOmeOTher random person',
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onPressHandler('+');
        }}
        style={{ height: 200, width: 500 }}
      >
        <Text
          style={{
            width: PixelRatio.getPixelSizeForLayoutSize(250),
            height: PixelRatio.getPixelSizeForLayoutSize(100),
            fontSize: PixelRatio.getPixelSizeForLayoutSize(20),
          }}
        >
          {`${this.state.name}`}
        </Text>
      </TouchableOpacity>
    );
  }
}

// <ScrollView
//   axis="vertical"
//     spacing={50}
// style={{ height: 1500, width: 500}}>
// <StackView
//   axis="vertical"
//   spacing={50}
//   style={{ height: 1900, width: 1000}}
// >
//   <OtherClass />
//   <AnOtherClass />
//   <SomeOtherClass />
// </StackView>
//   <OtherClass />
// </ScrollView>

class Example extends Component {
  constructor() {
    super();
    this.state.addr = [
      {
        addressId: '6913038672656597474',
        line1: '220 Kentdale Pl',
        line2: null,
      },
    ];
  }
  returnAddresses() {
    return this.state.addr.map((address, index) => {
      return <Address address={address} key={index} />;
    });
  }
  componentDidMount() {
    this.setState({
      addr: [
        {
          addressId: '6913038672656597474',
          line1: '220 Kentdale Pl',
          line2: null,
        },

        {
          addressId: '6913038672656597474',
          line1: '220 Kentdale Pl',
          line2: null,
        },
      ],
    });
  }
  render() {
    return (
      <StackView
        axis="vertical"
        style={{
          height: 400,
          width: 500,
        }}
      >
        {this.returnAddresses()}
      </StackView>
    );
  }
  onPressHandler(btn) {
    console.log('click');
  }
}

class SomeOtherClass2 extends Component {
  constructor() {
    super();
    this.state = {
      color: '#0000ff',
    };
  }
  onPressHandler(btn) {
    console.log('OtherClass');
    this.setState({
      color: '#0f00ef',
    });
  }
  render() {
    return <Example />;
  }
}

Render(SomeOtherClass2);
