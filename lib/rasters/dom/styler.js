// normalize keys i.e. borderWidth -> border-width
function normalizeKey(key) {
  // @TODO finish me!
}

class styler {
  styleElement(element, style) {
    //@TODO taking this out for now....This causes styling issues
    element.style['position'] = 'absolute';

    for (let key in style) {
      // if (style.hasOwnProperty(key)) {
      let webKey = key
        .split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase();
      let value =
        typeof style[key] === 'number' ? style[key] + 'px' : style[key];
      element.style[webKey] = value;
      // }
    }

    element.style.overflow = 'hidden';
  }
}

const Styler = new styler();

export { Styler };
