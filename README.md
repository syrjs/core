# 1.5.2 release

<div align="center">
  <img src="https://github.com/syrjs/core/blob/master/logos/syr-logo.png" alt="syr" title="syr" width=128>
  <h3> <a href="https://syr.js.org/">syr</a> </h3>
  <small>minimally obtrusive reactisque view engine, aimed at native developers</small>
  <hr/>
</div>

[![Build Status](https://travis-ci.org/syrjs/core.svg?branch=master)](https://travis-ci.org/syrjs/syr)
[![NPM Version](https://img.shields.io/npm/v/@syr/core.svg)](https://www.npmjs.com/package/@syr/core)
[![Coverage Status](https://coveralls.io/repos/github/syrjs/core/badge.svg?branch=master)](https://coveralls.io/github/dmikey/syr?branch=master)
[![Docs](https://img.shields.io/badge/docs-1.3.0-blue.svg?style=flat)](https://syr.js.org)

Build dynamic UIs for Native Platforms, with less than 200kb of extra libraries!

The goal to provide, Native SDK developers the benefits of the React Native API, with a much smaller footprint and reduced complexity.

Easily package Syr with your Native SDKs and Apps and drive dynamic updatable experiences with JavaScript.

Syr uses a React like API with a custom JS API bridge, that allows an SDK developer to bundle an updatable experience through Apple's iTunes terms.

### help

gitter: https://gitter.im/syrjs/general

otherwise open an issue.

### breaking change

`syr` moved to scoped packages. Please move to `@syr/core`.

### Read the Docs

https://syr.js.org

### Getting Started

Install

```bash
npm i @syr/core
```

### Roadmap

Even (starting with 2) releases are stable, Odd (starting with 1) releases are development builds. Every fourth (starting with 4.0.0) release is an LTS and will be branched as well as tagged.

* LTS Currently means support beyond 2 Stable Releases. Support for 4.0.0 will be sunset when 8.0.0 is released, as 6.0.0 will become the lowest LTS version.

How contributions will be scheduled for intake starting with version 2.0.0.

Major

* Any Native Code Change in the Core Library Results in an Immediate Major Change.
* Any Guest deprecations must force a major change.

Minor

* Any Guest System Rendering Changes.
* If new dependent features are changed, which causes instability it must be promoted to `Major` release schedule.

Patch

* Corrects undesired consistent behavior.
* Adds new features without collision

https://github.com/syrjs/syr/milestones

### Development Example

![native_checkout_syr](https://user-images.githubusercontent.com/328000/33408997-0ceecb7e-d52e-11e7-8f63-ca2f984751f7.gif)

### Running the local Sample

* Clone the repo
* `npm install`
* `npm run serve`
*  Open [ios/SyrNativeSample](https://github.com/dmikey/syr/tree/master/ios/SyrNativeSample/SyrNativeSample.xcodeproj) in xcode
*  Run the project in xcode.

## Contributors
<div align="center">

[<img alt="dmikey" src="https://avatars3.githubusercontent.com/u/328000?v=4&s=117" width=117>](https://github.com/dmikey) |[<img alt="MSiddharthReddy" src="https://avatars3.githubusercontent.com/u/17309023?v=4&s=117" width=117>](https://github.com/MSiddharthReddy) |[<img alt="pvenkatakrishnan" src="https://avatars2.githubusercontent.com/u/2745959?v=4&s=117" width=117>](https://github.com/pvenkatakrishnan) |[<img alt="gabrielcsapo" src="https://avatars0.githubusercontent.com/u/1854811?v=4&s=117" width=117>](https://github.com/gabrielcsapo) |[<img alt="edwinwebb" src="https://avatars1.githubusercontent.com/u/797904?v=4&s=117" width=117>](https://github.com/edwinwebb) | [<img alt="Sherman-Chen" src="https://avatars3.githubusercontent.com/u/20351341?v=4&s=117" width=117>](https://github.com/Sherman-Chen)
:---:|:---:|:---:|:---:|:---:|:---:|
[dmikey](https://github.com/dmikey)|[MSiddharthReddy](https://github.com/MSiddharthReddy)|[pvenkatakrishnan](https://github.com/pvenkatakrishnan)|[gabrielcsapo](https://github.com/gabrielcsapo)| [edwinwebb](https://github.com/edwinwebb)|[Sherman-Chen](https://github.com/Sherman-Chen)



</div>
<div align="center">
<img align="center" src="https://user-images.githubusercontent.com/328000/29147428-d6619ef2-7d1b-11e7-9cbd-286b7ae5fe49.png" alt="syr" title="syr" width=36>
</div>
