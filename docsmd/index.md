[![Build Status](https://travis-ci.org/dmikey/syr.svg?branch=master)](https://travis-ci.org/dmikey/syr)
[![NPM Version](https://img.shields.io/npm/v/syr.svg)](https://npmjs.org/package/syr)
[![Coverage Status](https://coveralls.io/repos/github/dmikey/syr/badge.svg?branch=master)](https://coveralls.io/github/dmikey/syr?branch=master)


### Features

* Lightweight (under 300kb! on iOS)
* Cross Platform (iOS, Android, Web)
* Familiar API (React-Native)
* Components (get started right away!)
* JavaScript (no need to write native code!)
* Portable! (Building an SDK? We've got you covered!)

### Syr Apps are Native Apps!

Applications you build with Syr, ARE Native Apps. We expose the best of the Native Platform, allowing you to build experiences with JavaScript and a Familiar API.

```
import { Component, Image, ScrollView, Text } from 'syr';

class myComponent extends Component {
  render() {
    return (
      <ScrollView style={{width: 320, height:200}}>
        <Image
          source={{uri: 'https://i.chzbgr.com/full/7345954048/h7E2C65F9/'}}
          style={{width: 320, height:180}}
        />
        <Text style={{width: 320, height:300}}>
          On iOS, a Syr ScrollView uses a native UIScrollView.
          On Android, it uses a native ScrollView.

          On iOS, a Syr Image uses a native UIImageView.
          On Android, it uses a native ImageView.

          Syr wraps the fundamental native components, giving you
          the performance of a native app, plus the clean design of JavaScript and a Familiar API.
        </Text>
      </ScrollView>
    );
  }
}
```

### How does this compare

Syr renders User Interfaces natively. It runs application logic you have written in JavaScript inside a 'web' environment. When components are ready to be drawn to the screen, Syr draws them using Native UI Elements on each platform. Syr apps, ARE Native Apps!

We've followed the JavaScript trends, and have distilled a minimal API to accomplish brilliant experiences, with the smallest footprint possible. If you've found other Web to Native Frameworks heavy, give Syr a try!

### Playing Catchup

Syr is still young, we're playing catchup with others that are operating in this space. If you want to help, contributions are always welcome!