import { Dimensions } from '../index.js';
let styles = {
  mainView: {
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    color: '#000000',
    backgroundColor: '#404040',
    position: 'absolute',
  },
  secondaryView: {
    height: 125,
    width: 125,
    top: Dimensions.get('window').height / 2 - 62.5,
    left: Dimensions.get('window').width / 2 - 62.5,
    borderTopColor: '#ffffff',
    backgroundColor: '#BEBEBE',
    position: 'absolute',
    borderWidth: 6,
    borderRadius: 62.5,
  },
  text: {
    height: 50,
    width: 270,
    left: Dimensions.get('window').width / 2 - 135,
    top: Dimensions.get('window').height / 2 + 65,
    color: '#ffffff',
    position: 'absolute',
    fontSize: 24,
  },
  button: {
    top: 0,
    left: 0,
    height: 40,
    width: 300,
    backgroundColor: '#00ff0f',
  },
  image: {
    width: 40,
    height: 50,
    left: 40,
    top: 33,
  },
  spinner: {
    height: 120,
    width: 120,
    top: Dimensions.get('window').height / 2 - 60,
    left: Dimensions.get('window').width / 2 - 60,
    backgroundColor: '#404040',
    position: 'absolute',
    borderRadius: 62.5,
  },
};

export { styles };
