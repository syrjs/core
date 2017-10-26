# SyrSDK API

## Components

### View

### TextView

### Animated.View

### Image

### Button


## Styling a component

### Styling your component from JavaScript

### Styling your component from Native

## Rendering

Syr components are built on the React Class pattern using ESNext. Using this pattern you can extend components and provide a render function that will present the inner set of components.

```javascript
import { Component } from 'syr';

class MyComponent extends Component {
  render() {
    return <View></View>
  }
}

export { MyComponent };

```

## LifeCycle

Syr supports Life Cycle events to help control the flow of the program. To take advantage of these add the following to javascript classes.

### Method stubs
```
import { Component } from 'syr';

class MyComponent extends Component {
  constructor() {
    // runs when object is created in javascript
  }
  render() {
    // when what this class should return as it's rendering tree
  }
  componentDidMount() {
    // this fires when component has been added to the rendering surface
  }
  componentWillUnmount() {
    // fires when component is removed from rendering surface
  }
  componentWillUpdate() {
    // fires before component will update, you can return false
    // to prevent an update
  }
  componentDidUpdate() {
    // component updated, runs after the component state was changed
  }
}

```

## Events

### Notifying JavaScript from Native
If you need to notify the JavaScript from the Native layer, you can send events, from your native component. The easiest way to get access to this event, is to subclass `SyrComponent.h`.

```objc
self sendEventWithName:@"FooParty" body:@{@"name": eventName}];
```

### Subscribing to Events from JavaScript
JavaScript can subscribe to the events that are being passed down from the native layer.

```javascript
import { NativeEventEmitter } from 'syr';


const subscription = NativeEventEmitter.addListener(
  'FooParty',
  (event) => console.log(event.name)
);

// unsubscribe when needed
subscription.remove();
```
## Animations

Syr has support for animations. With Syr animations you can run animations transitions in parallel, or sequence. Animations allow for the shift in x,y position and size. If you need a more complex animation you can use `Animated.Value` to bind a transform to the component.

### Slide
```javascript
import { Component, Render, Animated } from 'syr';

class MyComponent extends Component {
  constructor() {
    super();
    // slide animation
    this.slideAnimation = new Animated.XYValue({
      x: 0
      y: 0
    });
  }
  render() {
    return (
      <Animated.View style={{
        height: 100,
        width: 100,
        backgroundColor: '#ffffff',
        transform: [this.slideAnimation]
      }}>
      </Animated.View>
    );
  }
  componentDidMount() {
    Animated.timing(this.slideAnimation, {
      toValue: {
        x:100,
        y:100
      },
      duration: 5000
    }).start()
  }
}

Render(MyComponent);
```

### Rotation

```javascript
import { Component, Render, Animated } from 'syr';

class MyComponent extends Component {
  constructor() {
    super();
    // interpolation animation
    this.spinAnimation = new Animated.Value(0);
  }
  render() {
    return (
      <Animated.View style={{
        height: 100,
        width: 100,
        backgroundColor: '#ffffff',
        top: 50,
        left: 50,
        transform: [this.spinAnimation]
      }}>
      </Animated.View>
    );
  }
  spin() {
    //spin the object 360 degress. and repeat after 5 seconds
    Animated.timing(this.spinAnimation, {
      toValue: 360,
      duration: 5000
    }).start(()=>{
      this.spin();
    });
  }
  componentDidMount() {
    this.spin();
  }
}

Render(MyComponent);
```

## Creating Native Modules

Syr lets you create native modules that can bridge across the native to web spectrum. They are capable of providing renderables (Views, Text, Buttons), and having methods callable from JavaScript.

Syr Native Modules are always used in the `Class` invokation method. What this means is that if you want to store instanced information (some value) on your class `Natively` you need to use the `sharedDelegate` pattern.

### Building your first class

`MyNativeModule.h`
```objc
#import "MyNativeModule.h"

@interface MyNativeModule : SyrComponent
@end
```
`MyNativeModule.m`
```objc
#import "MyNativeModule.h"

@implementation MyNativeModule

// send this class to the JS bridge
SYR_EXPORT_MODULE();

// this is an objective C method that will get it's invokation from JS
SYR_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  // do something with Name and Location strings
}

// if you want to use this module in the JSX tree
// there are helper methods on the component to help with
// styling and more
+(NSObject*) render: (NSDictionary*) component {
  UIView *view = [[UIView alloc] init];
  return view;
}

@end

```

Accessing the native modules from javascript.

```javascript

import { NativeModules } from 'syr';

let MyNativeModule = NativeModules.MyNativeModule;

MyNativeModule.addEvent('building an app', 'at my desk');
```