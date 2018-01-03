# Getting Started

Our CLI tools will help you get started creating a new project from scratch quickly. This is the easiest way to get started developing Syr applications today.

## Setting up a Syr JavaScript Project

Grab the `Syr CLI` tool to get started quickly. This tool currently requires `NPM 8` or higher.

```bash
npm install -g syr-cli
```

Use Syr CLI to Instantly Scaffold a Sample project to start with.

```bash
syr init ProjectName
```

Syr will generate a base at `src/index/js`. To launch this file, simply run the following command from the base of your project.

```bash
syr watch
```

This command starts the Webpack Dev Server. Open the Syr iOS Sample Project, located at `ios/SyrNativeSample.xcodeproj` and simply press play. The sample project will connect to the Webpack Server, and begin executing your application.


## Cocoapods

If you have an existing project, we recommend using Cocoapods to quickly grab the Syr Classes and add them to your project.

```
pod 'Syr', :git => 'https://github.com/dmikey/syr.git'
```