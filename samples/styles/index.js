import { Dimensions } from '../../index';
let styles = {
  stage: {
    top: Dimensions.get('window').height,
    left: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#404040',
  },
  scrimView: {
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  gradientView: {
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: 75,
    backgroundColor: '#f7f9fa',
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
  spinnerBackground: {
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
  scrimMessage: {
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
  imageLock: {
    width: 40,
    height: 50,
    left: 40,
    top: 33,
  },
  spinnerMask: {
    height: 120,
    width: 120,
    top: Dimensions.get('window').height / 2 - 60,
    left: Dimensions.get('window').width / 2 - 60,
    backgroundColor: '#404040',
    position: 'absolute',
    borderRadius: 62.5,
  },
  ryi: {
    top: Dimensions.get('window').height, // start off screen
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width,
    backgroundColor: '#ffffff',
  },
  closeButton: {
    top: 36,
    left: Dimensions.get('window').width - 48,
    width: 24,
    height: 24,
  },
  ppLogo: {
    top: 24,
    left: 24,
    width: 100,
    height: 24,
  },
  profileImageContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    left: Dimensions.get('window').width - 66,
    top: 18,
    width: 42,
    height: 42,
    borderColor: '#d3d3d3',
    borderWidth: 1,
  },
  profileImage: {
    height: 36,
    width: 36,
    left: 2.5,
    top: 2,
  },
  greetingText: {
    left: Dimensions.get('window').width - 230,
    top: 24,
    width: 150,
    height: 15,
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'right',
  },
  notYouText: {
    left: Dimensions.get('window').width - 230,
    top: 42,
    width: 150,
    height: 15,
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'right',
  },
  userConsentButton: {
    width: Dimensions.get('window').width - 48,
    height: 65,
    left: 24,
    top: Dimensions.get('window').height / 2 - 100,
    borderRadius: 6,
    backgroundColor: '#0070ba',
    color: '#fffffff',
    fontSize: 16, //todo: add font-weight
  },
  reviewPage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
  },
  walletPage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
    left: Dimensions.get('window').width,
  },
  backIcon: {
    width: 16,
    height: 25,
    left: 12,
    top: 24,
  },
  walletHeaderText: {
    height: 75,
    width: 150,
    left: Dimensions.get('window').width / 2 - 75,
    color: '#ffffff',
    textAlign: 'center',
  },
};

export { styles };