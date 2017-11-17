import { Dimensions } from '../index.js';
let styles = {
  stage: {
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#404040'
  },
  scrimView: {
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  gradientView: {
    top:0,
    left:0,
    width: Dimensions.get('window').width,
    height:75,
    backgroundColor:'#000000'
  },
  mainView: {
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    color: '#000000',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryView: {
    height: 125,
    width: 125,
    borderColor: '#BEBEBE',
    borderStyle: 'solid',
    position: 'absolute',
    borderTopColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3.5,
    borderRadius: 65,
  },
  text: {
    color: '#ffffff',
    top: Dimensions.get('window').height / 2 + 50,
    position: 'absolute',
    border: 2,
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
  },
  spinner: {
    height: 120,
    width: 120,
    position: 'absolute',
    borderRadius: 62.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ryi: {
    top: Dimensions.get('window').height - (Dimensions.get('window').height / 2),
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width,
    backgroundColor: '#ffffff'
  }
};

export { styles };
