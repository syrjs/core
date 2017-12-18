class events {
  emit(message) {
    SyrEvents.emit(message);
  }
}

let Events = new events();

export { Events };
