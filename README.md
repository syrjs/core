# dragons below. many things not in prime, or working. dev preview only.

<h1 align="center">
  <img src="https://user-images.githubusercontent.com/328000/29147428-d6619ef2-7d1b-11e7-9cbd-286b7ae5fe49.png" alt="syr" title="syr">
    <br>
  syr
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">minimally obtrusive reactisque view engine, aimed at native developers</p>

[![build status](https://travis-ci.org/dmikey/syr.svg?branch=master)](https://travis-ci.org/dmikey/syr)
[![gzip size](http://img.badgesize.io/https://unpkg.com/syr@1.0.8/dist/syr.min.js?compression=gzip)](https://unpkg.com/syr@1.0.8/dist/syr.min.js)
[![Coverage Status](https://coveralls.io/repos/github/dmikey/syr/badge.svg?branch=master)](https://coveralls.io/github/dmikey/syr?branch=master)

This set of libraries and utilities aimed to help Native SDK developers create dynamic UX for distribution. The goal of this library is to provide Native SDK developers the benefits of a React Native like eco system with a smaller footprint and reduced complexity.

Package Syr with your Native SDK without worry, drive dynamic experiences with it.

Syr uses a React like API with a custom JS-API bridge, that allows any developer to bundle an updatable experience.

Native Libraries, are crafted that to be sandboxed. Ready to deploy to any environment.

### dev docs

https://dmikey.github.io/syr/index.html

### goal

* minally viable react compatible API
* reduce surface area of projects like React-Native
* work flow that works for SDKs and not just applications

### mvp roadmap

* web raster
* ios native raster

### getting started developing using Syr

### easy way

Install Syr CLI

```bash
npm install syr-cli -g
```

Then use syr to create and run a project.

```bash
syr --init MyProject
```

This will create a directory called `MyProject`. This Directory will contain the javascript, and native code starter.


To bring up and serve a development bundle run

```bash
syr --watch
```

To create an ejectable bundle from your project

```bash
syr --eject
```

This will produce a app.bundle.js file that you can use to distribute.

Eject Native Library

```bash
syr --ejectNative 
```

Generates a new iOS/MyAppLibrary `collision free` version of native libraries ready to stick into any project.

### long way

Install Syr

```bash
npm install syr --save-dev
```

Add JSX support

```
npm install babel-plugin-transform-jsx --save-dev
```

Add this pluigin along with the ES2015 preset to babel.

```json
{
  "presets": ["babel-preset-es2015"],
  "plugins": [["babel-plugin-transform-jsx", { "useVariables": true }]]
}
```

### working with web raster

* run dev sandbox with `npm run serve`
* open browser and hit `http://localhost:8080/`

### working with ios raster

* run dev sandbox with `npm run serve`
* open `ios/SyrNativeSample.xcodeproj`
* run ios project which points to `http://127.0.0.1:8080`
* use Safari Developer tools to connect to remote debugger

### contributing to syr

* fork repo
* add tests
* open PR!

### more ...

Syr like, Preact, aims to have a somewhat compatible React API.


Render a Syr Component. Passing the component to Render, without a target will draw the component to `document.body` when rendering in the web. If rendering natively, it will render to the `root` view.

```javascript
import { Component, Render } from 'syr';

class MyComponent extends Component {
    render() {
      return (
        <div>Hello World</div>
      )
    }
}

Render(MyComponent);
```

The same example can be written without JSX support

```javascript
mport { Component, Render } from 'syr';

class MyComponent extends Component {
  render() {
    // pass ast directly to render
    return {
      elementName: 'div',
      children: ['Hello World']
    };
  }
}

Render(MyComponent);
```

Syr has similar support for Variable based elements, just like React.


```javascript
import { Component, Render } from 'syr';

class MyComponent extends Component {
    render() {
      return (
        <div>Hello World</div>
      )
    }
}

class MyView extends Component {
    render() {
      return (
        <MyComponent></MyComponent>
      )
    }
}

Render(MyComponent);
```

Syr uses `babel-plugin-transform-jsx` by @calebmer to build `JSX` directly to AST. The constructors of custom components are deferred until the first Render pass.


To get AST from a Syr component, simply call render directly on it after instantiating.

```javascript
import { Component, Render } from 'syr';

class MyComponent extends Component {
    render() {
      return (
        <div foo="bar">Hello World</div>
      )
    }
}

let mycomponent = new MyComponent();
let ast = mycomponent.render();
```

Returns as object that serializes like below.

``` JSON
{  
   "elementName":"div",
   "attributes":{  
      "foo":"bar"
   },
   "children":[
      "Hello World"
   ]
}
````

### lifecycle events

| Lifecycle method            | When it gets called                              |
|-----------------------------|--------------------------------------------------|
| `componentWillMount`        | before the component gets mounted to the DOM     |
| `componentDidMount`         | after the component gets mounted to the DOM      |
| `componentWillUnmount`      | prior to removal from the DOM                    |
| `componentWillReceiveProps` | before new props get accepted                    |
| `shouldComponentUpdate`     | before `render()`. Return `false` to skip render |
| `componentWillUpdate`       | before `render()`                                |
| `componentDidUpdate`        | after `render()`                                 |
