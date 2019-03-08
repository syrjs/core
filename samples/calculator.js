import { Component, Render, View, Text, Button } from '../index';

import { Styles } from './styles/calculator';

const operators = {
  '+': (oldValue, newValue) => {
    return oldValue * 1 + newValue * 1;
  },
  '-': (oldValue, newValue) => {
    return oldValue * 1 - newValue * 1;
  },
  '*': (oldValue, newValue) => {
    return oldValue * newValue;
  },
  '/': (oldValue, newValue) => {
    if (newValue === 0) {
      return newValue; // avoid divide by zero
    }
    return oldValue / newValue;
  },
};

class SyrCalculator extends Component {
  constructor() {
    super();
    this.state = {
      displayAreaValue: '0',
      calculations: [],
      clear: false,
    };
  }

  render() {
    return (
      <View style={Styles.mainView}>
        <Text style={Styles.displayArea}>{this.state.displayAreaValue}</Text>
        <View style={Styles.buttonContainer}>
          <Button
            onPress={() => {
              this.onPressHandler(1);
            }}
            style={Styles.numButton(1)}
          >
            1
          </Button>
          <Button
            onPress={() => {
              this.onPressHandler(2);
            }}
            style={Styles.numButton(2)}
          >
            2
          </Button>
          <Button
            onPress={() => {
              this.onPressHandler(3);
            }}
            style={Styles.numButton(3)}
          >
            3
          </Button>
          <Button
            onPress={() => {
              this.onPressHandler('+');
            }}
            style={Styles.numButton(4)}
          >
            +
          </Button>
          <Button
            onPress={() => {
              this.onPressHandler(4);
            }}
            style={Styles.numButton(5)}
          >
            4
          </Button>
          <Button
            onPress={() => {
              this.onPressHandler(5);
            }}
            style={Styles.numButton(6)}
          >
            5
          </Button>
          <Button
            onPress={() => {
              this.onPressHandler(6);
            }}
            style={Styles.numButton(7)}
          >
            6
          </Button>
          <Button
            onPress={() => {
              this.onPressHandler('-');
            }}
            style={Styles.numButton(8)}
          >
            -
          </Button>

          <Button
            onPress={() => {
              this.onPressHandler(7);
            }}
            style={Styles.numButton(9)}
          >
            7
          </Button>
          <Button
            onPress={() => {
              this.onPressHandler(8);
            }}
            style={Styles.numButton(10)}
          >
            8
          </Button>
          <Button
            onPress={() => {
              this.onPressHandler(9);
            }}
            style={Styles.numButton(11)}
          >
            9
          </Button>
          <Button
            onPress={() => {
              this.onPressHandler('*');
            }}
            style={Styles.numButton(12)}
          >
            *
          </Button>

          <Button
            onPress={() => {
              this.onPressHandler(0);
            }}
            style={Styles.numButton(13)}
          >
            0
          </Button>

          <Button
            onPress={() => {
              this.processStack();
            }}
            style={Styles.numButton(14)}
          >
            =
          </Button>

          <Button
            onPress={() => {
              this.clearStack();
            }}
            style={Styles.numButton(15)}
          >
            AC
          </Button>

          <Button
            onPress={() => {
              this.onPressHandler('/');
            }}
            style={Styles.numButton(16)}
          >
            /
          </Button>
        </View>
      </View>
    );
  }

  calculate() {
    if (this.state.calculations.length === 4) {
      let [first, firstOprn, second, secondOprn] = this.state.calculations;
      let value = `${operators[firstOprn](first, second)}`;
      this.setState({
        displayAreaValue: value,
        calculations: [value, secondOprn],
      });
    }
  }

  clearStack() {
    return this.setState({
      displayAreaValue: `0`,
      calculations: [],
      clear: false,
    });
  }

  processStack() {
    let [firstValue, operator] = this.state.calculations;
    let value = `${operators[operator](
      firstValue,
      this.state.displayAreaValue
    )}`;
    return this.setState({
      calculations: [],
      displayAreaValue: value,
      clear: false,
    });
  }

  onPressHandler(btn) {
    if (operators[btn]) {
      this.calculate();
      this.state.calculations.push(this.state.displayAreaValue, btn);
      this.setState({
        displayAreaValue: this.state.displayAreaValue,
        clear: true,
      });
      this.calculate();
    } else {
      let value;
      if (this.state.clear) {
        value = `${btn * 1}`;
      } else {
        value = `${(this.state.displayAreaValue + btn) * 1}`;
      }

      this.setState({
        displayAreaValue: `${value}`,
        clear: false,
      });
    }
  }
}

Render(SyrCalculator);
