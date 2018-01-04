class styler {
  styleElement(element, style) {
    element.style['position'] = 'absolute';
    for (var key in style) {
      if (style.hasOwnProperty(key)) {
        let value =
          typeof style[key] === 'number' ? style[key] + 'px' : style[key];
        element.style[key] = value;
      }
    }
  }
}

const Styler = new styler();

export { Styler };
