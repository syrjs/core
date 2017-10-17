class events {
  constructor() {
    this.register = (component) => {
      console.log('register this component:', component);
    };

    window.SyrEvents = window.SyrEvents || this;
  }
}

const Events = new events();

export { Events };