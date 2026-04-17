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
- [space](https://github.com/afrontend/fp-space)

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

MIT © [Bob Hwang](https://afrontend.github.io)

[npm-image]: https://badge.fury.io/js/fp-panel.svg
[npm-url]: https://npmjs.org/package/fp-panel
