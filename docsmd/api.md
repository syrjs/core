# SyrSDK API

This API guide is morphing over time. Please check back often, and feel free to update from the Syr repo and send a PR if you notice something that isn't right.

## Components

### A Component

SyrSDK uses the familiar React JavaScript pattern for creating components. The basic component setup looks like this.

```javascript
import { Component } from 'syr';

class MyComponent extends Component {
  constructor() {
  }
  render() {
  }
}

```
### View

A `View` component is the basic component that renders to a surface (the `RootView`). This component can be rendered to a `SyrRootView`.

```javascript
import { View } from 'syr';

render(){
  return <View></View>
}
```

It can also own components, that will render to the surface as a child. Such as another `View`.

```javascript
import { View } from 'syr';

render(){
  return <View>
      <View></View>
  </View>
}
```

Because a View does not have any dimensions by default, it will render at X,Y:0,0 and Height,Width:0,0. To change this you can attach a style.

```javascript
import { View } from 'syr';

render(){
  return <View style={{
    height: 100,
    width: 100,
    left: 50,
    top: 50
  }}></View>
}
```

### TextView

A text view MUST OWN text. We're following this rule from React Native and sticking with it. Text that is not inside a TextView node, will become a `value` property on nodes that own them. So if you need Text that displays, then you need to ensure it's wrapped inside a `TextView`

```javascript
import { TextView } from 'syr';

render(){
  return <TextView></TextView>
}
```

### Animated.View

An animated view lets the bridge know about any special conditions that need to be setup ahead of time for the animation. Currently this stub exists for Syntax compatibility. In SyrSDK any component that is derived from an animatable is, able to have an animation applied. UIView, Button, Image.

```javascript
import { Animated } from 'syr';

render(){
  return <Animated.View></Animated.View>
}
```

### Image

A component for displaying an Image. It is self terminated as it can not hold any children.

```javascript
import { Image } from 'syr';

render(){
  return <Image source={{uri:"file_name"}} style={{ height:150, width:300 }}/>
}
```
### Button

A clickable component. Returns an onPress event.

```javascript
import { Button } from 'syr';

render(){
  return <Button onPress={this.onPress} style={{ height:150, width:300 }}>Press Me</Button>
}
onPress(){
  // the button was pressed!
}
```

### TouchableOpacity

An invisible clickable view. Use it to encapsulate components for which you want to receive a click handler.

```
<TouchableOpacity onPress={()=>this.handleBackPress()} style={styles.iconContainer}>
  <Image
    style={styles.icon}
    source={{ uri: 'icon' }}
  />
</TouchableOpacity>
```


### ScrollView

A component that introduces scrolling around content inside. We calculate the max Y and max X, and set the content of the scroll view.

```
<ScrollView style={styles.scrollView}>
  <View style={styles.view}></View>
</ScrollView>
```

### StackView
<sup style="color:red;">watch out! this is under heavy development!</sup>
StackView allows a developers to align and space out content. In lieu of having React-Native's Yoga (Flexbox), we leverage built in layout controls.

```
 <StackView
            axis="vertical"
            style={style}>
 </StackView>
```

## Styling a component
<sup style="color:red;">watch out! this is under heavy development!</sup>

Styling a component is much like basic `React-Native`. Create a JavaScript literal that describes the layout properties that you would like to affect.

```javascript
let style = {
  height: 50,
  width: 100
}
```

You then bind the style to the rendering node.

```javascript
render() {
  return <View style={style}></View>
}
```

### height

Set the height of a frame.

```javascript
let style = {
  height: 50
}
```

### width

Set the width of a frame.

```javascript
let style = {
  width: 100
}
```

### left

Set the origin left for a frame.

```javascript
let style = {
  left: 50
}
```

### top

Set the origin top of a frame.

```javascript
let style = {
  top: 50
}
```

## Rendering

SyrSDK uses the concept of a `raster`. It tries to detect the environment it's in, based on the availability of the `SyrNative` bridge. Rendering to the `RootView` surface is as easy as creating the component, and handing it to the raster.

We recommend, that you use a top level component for an entry. And use this as top level logic for your application. Once handed to the Raster, it will become an instance, and it's logic and program will run starting with it's `constructor`, and then the `lifeCycle` events.

```javascript
import { Component, Render } from 'syr';

class MyApp extends Component {
  render() {
    return <View></View>
  }
}

Render(MyComponent);

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
    // fires immediately before rendering when new props or state are being received
  }

  shouldComponentUpdate() {
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
[self sendEventWithName:@"FooParty" body:@{@"name": eventName}];
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

Syr lets you create native modules that can bridge across the native to web spectrum. They are capable of providing renderable (Views, Text, Buttons), and having methods callable from JavaScript.

Syr Native Modules are always used in the `Class` invocation method. What this means is that if you want to store instanced information (some value) on your class `Natively` you need to use the `sharedDelegate` pattern.

### Building your first class

`MyNativeModule.h`
```objc
#import "SyrComponent.h"

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
