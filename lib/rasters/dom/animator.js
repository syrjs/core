class animator {
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
      fill: 'forwards',
      iterations: 1,
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

  animateComponentXY(message) {
    const animationValues = message.animation;

    const x = `${animationValues.x}px`;
    const x2 = `${animationValues.x2}px`;
    const y = `${animationValues.y}px`;
    const y2 = `${animationValues.y2}px`;

    const element = document.getElementById(message.guid);

    const animation = element.animate(
      [
        { transform: `translateX(${x}) translateY(${y})` },
        { transform: `translateX(${x2}) translateY(${y2})` },
      ],
      {
        duration: animationValues.duration,
        fill: 'forwards',
        iterations: 1,
      }
    );

    animation.onfinish = () => {
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
