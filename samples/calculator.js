import {
  Component,
  Render,
  View,
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
} from '../index';

import { Styles } from './styles/calculator';

const operations = {
  '+': (oldValue, newValue) => {
    return oldValue * 1 + newValue * 1;
  },
  '-': (oldValue, newValue) => {
    return oldValue * 1 - newValue * 1;
  },
  x: (oldValue, newValue) => {
    return oldValue * newValue;
  },
  '/': (oldValue, newValue) => {
    return oldValue / newValue;
  },
};

class SyrCalculator extends Component {
  constructor() {
    super();
    this.state.displayAreaValue = '0';
    this.state.calculations = [];
  }
  render() {
    return (
      <View style={Styles.mainView}>
        <Text style={Styles.displayArea}>{this.state.displayAreaValue}</Text>
        <View style={Styles.buttons}>
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
              this.onPressHandler(4);
            }}
            style={Styles.numButton(4)}
          >
            4
          </Button>
          <Button
            onPress={() => {
              this.onPressHandler(5);
            }}
            style={Styles.numButton(5)}
          >
            5
          </Button>
          <Button
            onPress={() => {
              this.onPressHandler(6);
            }}
            style={Styles.numButton(6)}
          >
            6
          </Button>
          <Button
            onPress={() => {
              this.onPressHandler(7);
            }}
            style={Styles.numButton(7)}
          >
            7
          </Button>
          <Button
            onPress={() => {
              this.onPressHandler(8);
            }}
            style={Styles.numButton(8)}
          >
            8
          </Button>
          <Button
            onPress={() => {
              this.onPressHandler(9);
            }}
            style={Styles.numButton(9)}
          >
            9
          </Button>
        </View>
        <Button
          onPress={() => {
            this.onPressHandler('+');
          }}
          style={Styles.plus}
        >
          +
        </Button>
      </View>
    );
  }
  calculate() {
    let runningValue = 0;
    this.state.calculations.forEach((element, index) => {
      if (isNaN(element * 1)) {
        let prev = this.state.calculations[index - 1];
        let next = this.state.calculations[index + 1];

        if (prev && next) {
          prev = index > 0 ? runningValue : prev;
          runningValue = operations[element](prev, next);
        }
      }
    });
    return runningValue;
  }
  onPressHandler(btn) {
    let displayAreaValue;

    if (this.state.clearNextEntry) {
      this.state.clearNextEntry = false;
      this.state.displayAreaValue = '';
    }

    if (operations[btn]) {
      if (this.state.displayAreaValue.length > 0) {
        this.state.calculations.push(this.state.displayAreaValue);
      }
      this.state.calculations.push(btn);
      this.state.clearNextEntry = true;
      displayAreaValue = this.state.displayAreaValue;
      this.calculate();
    } else {
      displayAreaValue =
        this.state.displayAreaValue == '0' ? '' : this.state.displayAreaValue;
      displayAreaValue = displayAreaValue + '' + btn;
    }

    this.setState({
      displayAreaValue: displayAreaValue,
    });
  }
}

Render(SyrCalculator);
