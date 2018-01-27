class animator {
  //using Web Animations API for now....will include a polyfill for unsupported browsers.
  //this provides a clean structure for all the animations....doing rotate for the demo.
  animateInterpolate(message) {
    let animationValues = message.animation;
    let keyframes = [];
    if (animationValues.animatedProperty) {
      switch (true) {
        case /opacity/.test(animationValues.animatedProperty):
          keyframes = [
            { opacity: animationValues.value },
            { opacity: animationValues.toValue },
          ];
          break;
        case /rotate|rotate[XYZ]/.test(animationValues.animatedProperty):
          keyframes = [
            {
              transform: `${animationValues.animatedProperty}(${
                animationValues.value
              }deg)`,
            },
            {
              transform: `${animationValues.animatedProperty}(${
                animationValues.toValue
              }deg)`,
            },
          ];
          break;
        //will need to include other cases for height,width, x, y transformations
      }
    } else {
      //default to z animations A.K.A rotate
      keyframes = [
        { transform: `rotateZ(${animationValues.value}deg)` },
        { transform: `rotateZ(${animationValues.toValue}deg)` },
      ];
    }

    let animation = document.getElementById(message.guid).animate(keyframes, {
      duration: animationValues.duration,
      iterations: 1,
    });
    animation.onfinish = () => {
      SyrEvents.emit({
        type: 'animationComplete',
        guid: message.guid,
        animation: message.animation,
      });
    };
  }

  animateComponentXY(message) {
    const animationValues = message.animation;

    const x = animationValues.x || 0;
    const x2 = animationValues.x2 || 0;
    const y = animationValues.y || 0;
    const y2 = animationValues.y2 || 0;

    let destinationY = (y > y2) ? y2 - y : y2 + y;
    let destinationX = (x > x2) ? x2 - y : x2 + x;


    const element = document.getElementById(message.guid);

    const animation = element.animate(
      [
        { transform: `translateX(${x}px) translateY(${y}px)` },
        { transform: `translateX(${x2}px) translateY(${destinationY}px)` },
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
