class animator {
  constructor() {
    this._animatedInstances = {};
  }

  animateInterpolate(message) {
    let element;
    if (this._animatedInstances[message.guid]) {
      element = this._animatedInstances[message.guid];
    } else {
      element = document.getElementById(message.guid);
      this._animatedInstances[message.guid] = element;
    }
    const animationValues = message.animation;
    const property = animationValues.animatedProperty;
    let fromValue = animationValues.value;
    let toValue = animationValues.toValue;
    let keyframes = [];
    if (property) {
      switch (true) {
        case /opacity/.test(property): {
          keyframes = [{ opacity: fromValue }, { opacity: toValue }];
          break;
        }
        case /height/.test(property): {
          fromValue = element.style.height;
          toValue = `${toValue}px`;
          keyframes = [{ height: fromValue }, { height: toValue }];
          break;
        }
        case /width/.test(property): {
          fromValue = element.style.width;
          toValue = `${toValue}px`;
          keyframes = [{ width: fromValue }, { width: toValue }];
          break;
        }
        case /rotate|rotate[XYZ]/.test(property): {
          console.log('ROTATE', message)
          keyframes = [
            {
              transform: `${property}(${fromValue}deg)`,
            },
            {
              transform: `${property}(${toValue}deg)`,
            },
          ];
          break;
        }
      }
    } else {
      //default to z animations A.K.A rotate
      keyframes = [
        { transform: `rotateZ(${fromValue}deg)` },
        { transform: `rotateZ(${toValue}deg)` },
      ];
    }

    let animation = element.animate(keyframes, {
      duration: animationValues.duration,
      fill: 'both',
      composite: 'add',
    });
    animation.onfinish = () => {
      //@TODO Looking for alternatives to remove this.
      if (property == 'height' || property == 'width') {
        element.style[property] = toValue;
      }
      SyrEvents.emit({
        type: 'animationComplete',
        guid: message.guid,
        animation: message.animation,
      });
    };
  }

  rotate(value, duration, axis, cb) {
	let fullRotation = (value % 360) == 0 ? true : false;
  let element = document.getElementById('element');

  // match axis to get current rotation angle
  let re = /(rotateZ)(\(.*(?:deg\)))/g;
  let degrees = element.style.webkitTransform.match(re);
  if(degrees && degrees.length > 0) {
  	degrees = parseInt(degrees[0].replace( /^\D+/ig, ''));
  }

  // get the value of the next rotation from current value
  value = value + degrees;

 	// set the call back
  let handler =  ()=>{
    // remove handler
    element.removeEventListener("transitionend", handler);
    // callback
    setTimeout(()=>cb(),0);
  };
	// add call back
  element.addEventListener("transitionend", handler, false);

  // animate
 	element.style.transition = `all ${duration/1000}s`;
  element.style.transitionTimingFunction = "linear";
	element.style.transform = `rotate${axis}(${value}deg)`;
}

  animateComponentXY(message) {
    let element;
    if (this._animatedInstances[message.guid]) {
      element = this._animatedInstances[message.guid];
    } else {
      element = document.getElementById(message.guid);
      this._animatedInstances[message.guid] = element;
    }

    const animationValues = message.animation;

    const x = animationValues.x || 0;
    const x2 = animationValues.x2 || 0;
    const y = animationValues.y || 0;
    const y2 = animationValues.y2 || 0;

    let destinationY = y > y2 ? y2 - y : y2 + y;
    let destinationX = x > x2 ? x2 - y : x2 + x;

         // set the call back
      let handler =  ()=>{
        // remove handler
        element.removeEventListener("transitionend", handler);
        // callback
        setTimeout(()=>{
          SyrEvents.emit({
            type: 'animationComplete',
            guid: message.guid,
            animation: message.animation,
          });
        },0);
      };
        // add call back
      element.addEventListener("transitionend", handler, false);

      // animate
         element.style.transition = `all 2s`;
      element.style.transitionTimingFunction = "linear";
        element.style.transform = `translate(${destinationX}px, ${destinationY}px)`;

  }

  animate(message) {
    console.log(message)
    message.animation.value !== undefined
      ? this.animateInterpolate(message)
      : this.animateComponentXY(message);
  }
}



const Animator = new animator();

export { Animator };
