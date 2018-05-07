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
### Animated.View

An animated view lets the bridge know about any special conditions that need to be setup ahead of time for the animation. Currently this stub exists for Syntax compatibility. In SyrSDK any component that is derived from an animatable is, able to have an animation applied. UIView, Button, Image.

```javascript
import { Animated } from 'syr';

render(){
  return <Animated.View></Animated.View>
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

### LinearGradient

A `View` that has a linear gradient applied to the background. Currently supports all 8 ordinal directions.

```javascript
import { LinearGradient } from 'syr';

render() {
  return <LinearGradient colors={['#000000', '#FFFFFF']} direction = {"rightToLeft"} style={{ height:150, width:300 }}/>
}
```

### TouchableOpacity

An invisible clickable view. Use it to encapsulate components for which you want to receive a click handler.

```javascript
import { TouchableOpacity, Image } from 'syr';

render() {
  return <TouchableOpacity onPress={()=>this.handleBackPress()} style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={{ uri: 'icon' }}
          />
  </TouchableOpacity>
}
```


### ScrollView

A component that introduces scrolling around content inside. We calculate the max Y and max X, and set the content of the scroll view.

```javascript
import { ScrollView, View } from 'syr';

render() {
  return <ScrollView style={{height: 300, width: 300}}>
      <View style={{height: 500, width: 500}}></View>
  </ScrollView>
}
```

### StackView
<sup style="color:red;">☠️&nbsp;&nbsp;watch out! this is under heavy development!</sup>

StackView allows a developers to align and space out content. In lieu of having React-Native's Yoga (Flexbox), we leverage built in layout controls.

```javascript
import { StackView, View } from 'syr';

render() {
  return <StackView
            axis="vertical"
            style={style}>
    <View style={{height: 50, width: 50}}></View>
    <View style={{height: 50, width: 50}}></View>
    <View style={{height: 50, width: 50}}></View>
  </StackView>
}
```
### Haptic Feedback (hapticFeedbackType)

A prop passed into 'TouchableOpacity' and 'Button' to activate the haptic response on the device. Has a total of 6 feedback types:
- notificationWarning
- notificationSuccess
- notificationError
- impactLight
- impactMedium
- impactHeavy
- selection

```JavaScript
import { TouchableOpacity } from 'syr';
render() {
  return <TouchableOpacity
          hapticFeedbackType="notificationWarning"
          onPress={() => { console.log('Pressed') }}
          style={styles.touchable}
        />
}
OR

import { Button } from 'syr';
render() {
  return <Button
          hapticFeedbackType="notificationSuccess"
          onPress={() => { console.log('Pressed') }}
          style={styles.button}
        />
}
```

### Switch

A native Switch for boolean input control

This is a controlled component that takes an `onValueChange` callback. It is recommended to map the result of the `onValueChange` callback to the `value` prop (although it is no necessary).

Props (type, default) include: value (bool, false), tintColor (string, null), onTintColor (string, null), isDisabled (bool, false), style (syr styling object, null), and onValueChange (func, null). Value is the on/off state of the control, tintColor is the off color, onTintColor is the on color. isDisabled is whether the control is entirely disabled, style only accepts positioning {top, left, right, bottom} at the moment as control size will statically follow iOS/Android convention of 51 x 31 for now, onValueChange is the callback to be fired when the control is toggled.

```JavaScript
import { Switch } from 'syr';
render() {
  return <Switch
            onValueChange={() => console.log('hey I am changing!')}
            value={true} // it is suggested to map this to your component state
            tintColor={'#1e90ff'}
          />
}
```

### AlertDialogue

A native alert box that can be used to prompt messages and take feedback from the user.

Takes in three params, title: A string containing the 'Title' for the dialogue box, Message: A string containing the 'Message' for the dialogue box and actions: An array of objects containing information about the buttons to be displayed and the actions to be performed.

```JavaScript
import { AlertDialogue } from 'syr';
render() {
  return <TouchableOpacity
          onPress={() => {
            AlertDialogue.alert(
              'Logout', //This is the title for the alert dialogue box.
              'Are you sure you want to logout?', //this is the message to be displayed for the alert dialogue box
              //these are the buttons and their respective callbacks to be executed onPress
              [
                {
                  title: 'Yes',
                  onPress: () => logoutUser()
                },
                {
                  title: 'No'
                    onPress: () => doNotLogoutUser()
                }
              ]
            );
          }}
          style={styles.notYouContainer}
        >
}
```
### ContactsAPI
Currently iOS only. Current capabilities to return all contacts and to request permissions to get contact information. Data for the contacts returned currently is: First Name, Last Name, Birthday, Profile Picture, Phone Number.

```JavaScript
{import NativeModules} from 'syr';
//calls the requestPermissions functions at native layer
  NativeModules.SyrContactManager.requestContactPermissions();

//subscription for the requestContactPermissions, this event will be updated whenever User Accepts Rejects or the native layer throws an error. All of these things will be available in 'result'
const subscription = NativeEventEmitter.addListener(
  'contactRequestResult',
  (event) => console.log(event.result)
);

//asks the native layer to return all Contacts
fetchContacts() {
  NativeModules.SyrContactManager.fetchAllContacts();
}

//results will contain an array of users with the above mentioned contact information. It can also contain an error if an error was thrown at the native layer
const subscription = NativeEventEmitter.addListener(
  'contactResults',
  (event) => console.log(event.result)
);
```

## Styling a component
<sup style="color:red;">☠️&nbsp;&nbsp;watch out! this is under heavy development!</sup>

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

### color

Set the foreground color of a component. Normally text color. Accepts HEX and RGBA.

```javascript
let style = {
  color: '#FFFFFF'
}
```

### backgroundColor

Set the background color of a component. Accepts HEX and RGBA.

```javascript
let style = {
  backgroundColor: '#000000'
}
```

### borderRadius

Set the border radius of a component. Slight variations exist for curvature on each platform. Combine with PixelRatio to soften corners.

```javascript
let style = {
  borderRadius: 15
}
```

### borderWidth

Set the width of the border on a component.

```javascript
let style = {
  borderWidth: 3
}
```

### borderColor

Set the color of the border on a component. Accepts HEX and RGBA.

```javascript
let style = {
  borderColor: '#FF00FF'
}
```

### fontSize

Set the font size, normally only useful for `TextView`. Due to variations in screen sizes, we recommend using `PixelRatio` to obtain the DisplayPoint to PixelSize.

```javascript
let style = {
  fontSize: 24
}
```

### fontWeight

Set the font weight, normally only useful for `TextView`. Currently accepts `normal` or `bold`.

```javascript
let style = {
  fontWeight: 'bold'
}
```

### textAlign
<sup style="color:red;">☠️&nbsp;&nbsp;watch out! this is under heavy development!</sup>

Set the text alignment direction. Currently accepts `left`|`center`|`right`. These will be changing to `start`|`middle`|`end` once internationalization support lands.


```javascript
let style = {
  textAlign: 'center'
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
If you need to notify the JavaScript from the Native layer, you can send events, from your native component. The easiest way to get access to this event.

```objc fct_label="iOS"
[self sendEventWithName:@"FooParty" body:@{@"name": @"party at my desk"}];
```
```java fct_label="Android"
HashMap<String, String> eventPayload = new HashMap<String, String>();
eventPayload.put("name", "part at my desk");
SyrInstance.getInstance(this).sendEvent("FooParty", "party at my desk")
```
### Subscribing to Events from JavaScript
JavaScript can subscribe to the events that are being passed down from the native layer.

```javascript
import { EventEmitter } from 'syr';


const subscription = EventEmitter.addListener(
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

## Platform

### OS

Retrieve the `Platform` name the application running under.

```javascript
let OS = Platform.OS // "ios" || "android" || "browser_name"
```


### Version

Retrieve the version of the `Platform` the application is running under. For `iOS` returns the version running. For `Android`, returns the API level. For `Web` returns the browser version.

```javascript
let Version = Platform.Version // iOS : 11.2 , Android : 24 , Web : 63
```

### isWeb
<sup style="color:blue;">⚠️&nbsp;&nbsp;deviates from react-native</sup>

Provides `boolean` value, if the application is displaying inside a Web Browser or now.

```javascript
if(Platform.isWeb) {
  // do something with web platform
}
```
## Pixel Ratio

If you are creating cross platform applications, you typically need to deal with varied resolutions across similar physical screens, and densities of physical pixels that map to virtual pixels. The `PixelRatio` class can help you detect values you need to ensure you have consistent layouts across platforms.

### get

Returns the pixel ratio of the device. Use this ratio to determine which quality images you should be using in your application. Returns a precision value, such as `1, 1.5, 2, 2.5`. Use in combination with `getPixelSizeForLayoutSize` to keep resolution scaled.

```javascript
let dpi = PixelRatio.get();

```

### getPixelSizeForLayoutSize

Returns interpolated pixels based on device resolution width. `(currentScreenWidth / 640)*DisplayPoints`, we ensure we take the smaller of the two screen measurements, so we scale appropriately for Landscape based on the resolution for the physical screen. `640` is based on the standard width of the iPhone 5s and SE.

```javascript
let virtualPixelSize = PixelRatio.getPixelSizeForLayoutSize(75); // pass DisplayPoints
```

## Creating Native Modules

Syr lets you create native modules that can bridge across the native to web spectrum. They are capable of providing renderable (Views, Text, Buttons), and having methods callable from JavaScript.

Syr Native Modules are always used in the `Class` invocation method. What this means is that if you want to store instanced information (some value) on your class `Natively` you need to use the `sharedDelegate/singelton` pattern.

### Building your first class

```objc fct_label="iOS"
//
// MyNativeModule.h
//

#import "SyrComponent.h"

@interface MyNativeModule : SyrComponent
@end

//
// MyNativeModule.m
//

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

```java fct_label="Android"
//
// MainActivity.java
//
// Native Modules must be registered manually on Android
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);
  modules.add(new MyNativeModule());

  ...
  ...
  ...

  instance.setNativeModules(modules);
}

//
// MyNativeModule.java
//

// There are two interfaces that a NativeModule could implement.

// SyrComponent - Interface for a renderable NativeModule.
// SyrBaseModule - Interface for any NativeModule that needs to be available
// on the Javascript Environment.

// So if your class is a renderable NativeModule like a View
// it needs to implement both SyrBaseModule and SyrComponent.

public class SyrView implements SyrBaseModule, SyrComponent {
  // this module provide a render stub
  @Override
  public View render(JSONObject component, Context context) {
        View view = new View(context);
        return view;
  }

  // this is the JSX tag that the component will be mapped to
  @Override
  public String getName() {
      return "View";
  }

  // expose methods to the Javascript Environment
  @SyrMethod
  public void testExportMethod(String message, int duration) {

  }
}

// If your class does not need to render it only needs to implement SyrBaseModule

public class MyNativeLog implements SyrBaseModule {
  @SyrMethod
  public void Log(String message) {
    Log.i("JSMessage", message);
  }
}


```

Accessing the native modules from javascript.

```javascript
import { NativeModules } from 'syr';

let MyNativeModule = NativeModules.MyNativeModule;

MyNativeModule.addEvent('building an app', 'at my desk');
```
