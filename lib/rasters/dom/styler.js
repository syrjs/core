class styler {
  styleElement(element, style) {
    for (var key in style) {
      if (style.hasOwnProperty(key)) {
          let value = typeof style[key] === 'number' ? style[key]+'px': style[key];
          element.style[key] = value;
      }
    }
  }
}

const Styler = new styler();

export {Styler};