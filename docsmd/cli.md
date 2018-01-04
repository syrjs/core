# CLI Tools

Ease development, by using `syr-cli`. This tool scaffolds projects, repairs links for native modules, and helps spin up development servers.

## Install

```bash
npm install -g syr-cli
```

## Usage


### init

Creates a project inside a directory with the specified project name. Installs needed `npm` modules, and creates an empty set of Native projects that have the required `Syr` libraries to start development.

```bash
$ syr init myProjectName
```

### watch

Starts webpack development server for the project.

```bash
$ syr watch
```


### link

Fixes any bad paths for `Native Modules` that reside in the `node_modules` folder.

```bash
$ syr link
```


## Coming Soon

### eject

Pulls the native libraries together for cloaked distribution. Provide a `Prefix` that should be used. This will become a private version of Syr. Great for distribution in SDKs.

```bash
$ syr eject DMKA
```

### start

Starts `syr watch` and spins up simulator/emulator instances to point at development server. Helping non native developers get started fast!

```bash
$ syr start ios
```

```bash
$ syr start android
```