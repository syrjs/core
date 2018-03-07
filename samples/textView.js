import { Component, Render, View, Dimensions, Animated } from '../index';

class MyComponent extends Component {
  render() {
    return (
      <View style={{ height: 400, width: 300, backgroundColor: '#ffffff' }}>
        <Text style={{ height: 50, width: 300 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio.
        </Text>
        <Text
          style={{
            top: 55,
            height: 100,
            width: 300,
            lineBreak: 'normal',
            maxLines: 2,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio.
        </Text>
        <Text
          style={{
            top: 160,
            height: 100,
            width: 300,
            lineBreak: 'loose',
            maxLines: 2,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio.
        </Text>
        <Text
          style={{
            top: 265,
            height: 100,
            width: 300,
            lineBreak: 'normal',
            maxLines: 3,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio.
        </Text>
      </View>
    );
  }
}

Render(MyComponent);
