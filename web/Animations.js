import { Events } from '../lib/events';

class animations {
  animate(message) {
      let animationValues = message.animation;
      //using Web Animations API for now....will include a polyfill for unsupported browsers.
      //this provides a clean structure for all the animations....doing rotate for the demo.
      console.log(message.animation.animatedProperty);
      let keyframes = [];
      if(message.animation.animatedProperty) {
      switch(message.animation.animatedProperty) {
        case 'opacity': keyframes = [
                                    {opacity: animationValues.value},
                                    {opacity: animationValues.toValue}
                                    ];
                                    break;
        //will need to include other cases for height,width, x, y transformations
      }
    } else {
      keyframes = [
          {transform: `rotate(${animationValues.value}deg)`},
            {transform: `rotate(${animationValues.toValue}deg)`}
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

}

const Animations = new animations();

export { Animations };
