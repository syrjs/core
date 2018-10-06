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
    const duration = animationValues.duration;
    const property = animationValues.animatedProperty;
    let fromValue = animationValues.value;
    let toValue = animationValues.toValue;
    let transform;
    if (property) {
      switch (true) {
        case /opacity/.test(property): {
          transform = null;
          break;
        }
        case /height/.test(property): {
          transform = `translateY(${toValue}px)`;
          break;
        }
        case /width/.test(property): {
          transform = `translateX(${toValue}px)`;
          break;
        }
        case /rotate|rotate[XYZ]/.test(property): {
            let value = toValue;

          	let fullRotation = (value % 360) == 0 ? true : false;

            // match axis to get current rotation angle
            let re = /(rotateZ)(\(.*(?:deg\)))/g;
            let degrees = element.style.webkitTransform.match(re);
            if(degrees && degrees.length > 0) {
            	degrees = parseInt(degrees[0].replace( /^\D+/ig, ''));
            }

            // get the value of the next rotation from current value
            value = value + degrees;
          transform = `${property}(${value}deg)`;
          break;
        }
      }
    }

    let handler =  ()=>{
      // remove handler
      element.removeEventListener(`transitionend`, handler);
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
    element.addEventListener(`transitionend`, handler, false);

    // animate
   	element.style.transition = `all ${duration/1000 || 1}s`;
    element.style.transitionTimingFunction = "linear";
    if(transform) {
      element.style.transform = transform;
    } else {
      element.style.opacity = toValue;
    }
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
    const duration = `all ${animationValues.duration/1000 || 1}s`;


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
      element.style.transition = duration;
      element.style.transitionTimingFunction = "linear";
      element.style.transform = `translate(${destinationX}px, ${destinationY}px)`;

  }

  animate(message) {
    message.animation.value !== undefined
      ? this.animateInterpolate(message)
      : this.animateComponentXY(message);
  }
}



const Animator = new animator();

export { Animator };
