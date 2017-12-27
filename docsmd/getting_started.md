# Getting Started Building

## Setting up a Syr JavaScript Project

The base of a Syr project, is the JavaScript module that you intend to run inside the native environment. Using this JavaScript project, you will be able to setup an iOS or Android application, and it will be able to load the JavaScript.

You can use `webpack` to both build and serve the bundle for development. This allows things like Hot Reloading, so you don't need to refresh your app while you build.



## Setting up an iOS Application

### Fast Track, with a new App.

If you just want to get started with figuring out how Syr can come together for you, and want to start writing some JavaScript that shows up and does stuff inside a Simulator. Please grab [SyrCLI](https://github.com/MSiddharthReddy/syr-cli). This tool will create a new `SyrNative` project for you. And provide the skeleton to get started tinkering right away.

### An Existing Application

We've made sure to put labor into making the SDK as portable as possible. While the version of Syr is still early, we have decided to directly stick to Native versioning tools. What this means for iOS is that we ship a `.framework` file with ObjectiveC binaries. (source is always available here on github)

This `.framework` will let you quickly and rapidly get started no matter what existing project setup you have. A `.framework` file is allowed to have multiple versions of a binary embedded, we hope this helps with easy of upgrades through a more portable versioning structure within the same distribution.

Download PATH_TO_FRAMEWORK_HERE

Include with your XCode project.

Start a new Syr JavaScript project.
