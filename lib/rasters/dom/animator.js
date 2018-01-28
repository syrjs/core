class animator {
  //using Web Animations API for now....will include a polyfill for unsupported browsers.
  //this provides a clean structure for all the animations....doing rotate for the demo.
  animateInterpolate(message) {
    const element = document.getElementById(message.guid);
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
          toValue = toValue !== 0 ? `${toValue}px` : 0;
          keyframes = [{ height: fromValue }, { height: toValue }];
          break;
        }
        case /width/.test(property): {
          fromValue = element.style.width;
          console.log(fromValue)
          toValue = toValue !== 0 ? `${toValue}px` : 0;
          keyframes = [{ width: fromValue }, { width: toValue }];
          break;
        }
        case /rotate|rotate[XYZ]/.test(property):
          {
            keyframes = [
              {
                transform: `${property}(${fromValue}deg)`,
              },
              {
                transform: `${property}(${toValue}deg)`,
              },
            ];
          }
          break;
        //will need to include other cases for height,width, x, y transformations
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
      iterations: 1,
    });
    animation.onfinish = () => {
      if (property == 'height' || property == 'width') {
        console.log(toValue)
        element.style[property] = toValue;
      }
      SyrEvents.emit({
        type: 'animationComplete',
        guid: message.guid,
        animation: message.animation,
      });
    };
  }

  animateComponentXY(message) {
    const animationValues = message.animation;

    const x = `${animationValues.x}px` || 0;
    const x2 = `${animationValues.x2}px` || 0;
    const y = `${animationValues.y}px` || 0;
    const y2 = `${animationValues.y2}px` || 0;

    // let destinationY = (y > y2) ? y2 - y : y2 + y;
    // let destinationX = (x > x2) ? x2 - y : x2 + x;

    const element = document.getElementById(message.guid);

    const animation = element.animate(
      [
        { transform: `translateX(${x}) translateY(${y})` },
        { transform: `translateX(${x2}) translateY(${y2})` },
      ],
      {
        duration: animationValues.duration,
        iterations: 1,
      }
    );

    animation.onfinish = () => {
      //setting the final postion of the element as the final XnY from the animation.
      element.style['top'] = y2 + 'px';
      element.style['left'] = x2 + 'px';
      SyrEvents.emit({
        type: 'animationComplete',
        guid: message.guid,
        animation: message.animation,
      });
    };
  }

  animate(message) {
    message.animation.value !== undefined
      ? this.animateInterpolate(message)
      : this.animateComponentXY(message);
  }
}

const Animator = new animator();

export { Animator };
