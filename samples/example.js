import { Component, Render, View, Text, Animated } from '@syr/core';

import { styles } from './styles';

require('./images/piggy.png');

class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      spinCount: 0,
    };
    this.spinPiggyAnimation = new Animated.Value(0);
    styles.image.transform = [{ rotatey: this.spinPiggyAnimation }];
  }

  componentDidMount() {
    this.spinPiggy();
  }

  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>{`Spin Count: ${this.state.spinCount}`}</Text>
        <Animated.Image style={styles.image} source={{ uri: 'piggy' }} />
      </View>
    );
  }

  spinPiggy() {
    Animated.timing(this.spinPiggyAnimation, {
      toValue: 360,
      duration: 1000,
    }).start(() => {
      this.spinPiggy();
      this.setState({
        spinCount: this.state.spinCount + 1,
      });
    });
  }
}

Render(MyComponent);
