import { Events } from '../lib/events';

class animations {
  //using Web Animations API for now....will include a polyfill for unsupported browsers.
  //this provides a clean structure for all the animations....doing rotate for the demo.
  animateInterpolate(message) {
    let animationValues = message.animation;
    let keyframes = [];
    if(animationValues.animatedProperty) {
    switch(true) {
      case /opacity/.test(animationValues.animatedProperty): keyframes = [
                                    {opacity: animationValues.value},
                                    {opacity: animationValues.toValue}
                                  ];
                      break;
      case /rotate|rotate[XYZ]/.test(animationValues.animatedProperty) : keyframes = [
                                                            {transform: `${animationValues.animatedProperty}(${animationValues.value}deg)`},
                                                            {transform: `${animationValues.animatedProperty}(${animationValues.toValue}deg)`}
                                                          ]
                                             break;
      //will need to include other cases for height,width, x, y transformations
    }
  } else { //default to z animations A.K.A rotate
    keyframes = [
                  {transform: `rotateZ(${animationValues.value}deg)`},
                  {transform: `rotateZ(${animationValues.toValue}deg)`}
                ]
  }

    let animation = document.getElementById(message.guid)
    .animate(keyframes, {
          duration: animationValues.duration,
          iterations: 1,
        });
    animation.onfinish = () => {
      Events.emit({ type: 'animationComplete', guid: message.guid, animation: message.animation})
    }
  }

  animateComponentXY(message) {
    let animationValues = message.animation;
    let animation = document.getElementById(message.guid)
    .animate([
                {transform: `translateX(${animationValues.x}px) translateY(${animationValues.y}px)`},
                {transform: `translateX(${animationValues.x2}px) translateY(${animationValues.y2}px)`},
      ], {
          duration: animationValues.duration,
          iterations: 1,
        });
    animation.onfinish = () => {
      console.log('Animation Complete')
      Events.emit({ type: 'animationComplete', guid: message.guid, animation: message.animation})
    }
  }

  animate(message) {
      (message.animation.value !== undefined)? this.animateInterpolate(message) : this.animateComponentXY(message);
  }

}

const Animations = new animations();

export { Animations };
