# fp-panel [![NPM version][npm-image]][npm-url]

> library for fp-block

## Installation

```sh
$ npm install --save fp-panel
```

## Usage

```js
const p = require("fp-panel");
```

These games use fp-panel.

- [tetris](https://github.com/afrontend/fp-tetris)
- [snake](https://github.com/afrontend/fp-snake)
- [block](https://github.com/afrontend/fp-block)
- [sokoban](https://github.com/afrontend/fp-sokoban)

## Contract tests for game libraries

`fp-panel/testing` registers the common game API checks (exports, init size, pause, tick, rendering helpers, snapshot round trip) as a test suite. It uses the runner's global `describe` / `it` / `expect` (vitest `globals: true` or jest).

```js
// lib/__tests__/contract.test.js
const { runGameContract } = require("fp-panel/testing");

runGameContract(require("../index.js"), { name: "fp-tetris", pauseKey: "p" });
// level-based, turn-based game
runGameContract(require("../index.js"), { name: "fp-sokoban", sizedInit: false, turnBased: true });
```

## How it works

A **panel** is a 2D grid of items. Each item has a `color` — `'grey'` means blank, any other color means filled.

```
createPanel(5, 6)        paint(panel, positions, 'pink')

 .  .  .  .  .  .        .  .  .  .  .  .
 .  .  .  .  .  .        .  ■  .  .  .  .
 .  .  .  .  .  .   →    .  ■  ■  .  .  .
 .  .  .  .  .  .        .  ■  .  .  .  .
 .  .  .  .  .  .        .  .  .  .  .  .
```

Panels can be **moved** and **rotated**:

```
left(panel)              rotate(panel)

 .  .  .  .  .  .        .  .  .  .  .  .
 ■  .  .  .  .  .        .  .  ■  .  .  .
 ■  ■  .  .  .  .   →    .  ■  ■  ■  .  .
 ■  .  .  .  .  .        .  .  ■  .  .  .
 .  .  .  .  .  .        .  .  .  .  .  .
```

Multiple panels can be **combined**:

```
panelA       panelB       overlap(A, B)

 ■  ■  .      .  .  .      ■  ■  .
 ■  .  .  +   .  .  ■  =   ■  .  ■
 .  .  .      .  ■  ■      .  ■  ■
```

## API

Refer to [DOCUMENTATION.md](DOCUMENTATION.md) for the full API reference.

## License

MIT © [afrontend](https://afrontend.github.io)

[npm-image]: https://badge.fury.io/js/fp-panel.svg
[npm-url]: https://npmjs.org/package/fp-panel
