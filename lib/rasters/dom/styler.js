class styler {
  styleElement(element, style) {
    element.style['position'] = 'absolute';

    for (let key in style) {
      // work around for borders
      let borderColor;
      let borderWidth;

      // set borderWidth
      // @TODO we need to account for CSS style cascades, i.e. if they place borderWidth after borderLeft it shouldnt overwrite borderLeft
      if (key === 'borderWidth') {
        let value = style[key];

        if (typeof value === 'number' && value > 0) {
          element.style['border-width'] = `${value}px`;
          element.style['border-style'] = 'solid'; // we only do solid for now
        }
      }

      // set borderColor
      if (key === 'borderColor') {
        borderColor = style[key];
      } else {
        borderColor = '#000000'; // default to black
      }

      let borderLeftWidth;
      let borderRightWidth;
      let borderTopWidth;
      let borderBottomWidth;

      if (key === 'borderLeftWidth') {
        let value = style[key];

        if (typeof value === 'number' && value > 0) {
          element.style['border-left-width'] = `${value}px`;
          element.style['border-left-style'] = 'solid'; // we only do solid for now
        }
      }

      if (key === 'borderRightWidth') {
        let value = style[key];

        if (typeof value === 'number' && value > 0) {
          element.style['border-right-width'] = `${value}px`;
          element.style['border-right-style'] = 'solid'; // we only do solid for now
        }
      }

      if (key === 'borderTopWidth') {
        let value = style[key];

        if (typeof value === 'number' && value > 0) {
          element.style['border-top-width'] = `${value}px`;
          element.style['border-top-style'] = 'solid'; // we only do solid for now
        }
      }

      if (key === 'borderBottomWidth') {
        let value = style[key];

        if (typeof value === 'number' && value > 0) {
          element.style['border-bottom-width'] = `${value}px`;
          element.style['border-bottom-style'] = 'solid'; // we only do solid for now
        }
      }

      if (style.hasOwnProperty(key)) {
        let value =
          typeof style[key] === 'number' ? style[key] + 'px' : style[key];
        element.style[key] = value;
      }
    }

    element.style.overflow = 'hidden';
  }
}

const Styler = new styler();

export { Styler };
