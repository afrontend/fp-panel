# AGENTS.md

Guidance for AI coding agents (Claude Code, Codex, OpenCode, pi, …) working in this repository.
`CLAUDE.md` only imports this file (`@AGENTS.md`); edit this file, not `CLAUDE.md`.

## What this is

`fp-panel` is the core 2D grid library of the afrontend game stack, published to npm. Every game library depends on it from npm:

```
fp-panel  ← this repo
   ├─ fp-tetris ── fp-tetris-game
   ├─ fp-block  ── fp-block-game
   ├─ fp-snake  ── fp-snake-game
   ├─ fp-space
   └─ fp-sokoban
```

A change here reaches the games only after a new npm version is published and each game library bumps its dependency. Keep the public API backward compatible.

## Commands

```sh
npm test          # jest
npm run coverage  # jest --coverage
npm run doc       # regenerate DOCUMENTATION.md (docs/overview.md + jsdoc2md of lib/index.js)
```

`prepublishOnly` runs `npm run doc && npm test`, so `DOCUMENTATION.md` is generated — edit `docs/overview.md` or the JSDoc in `lib/index.js`, never `DOCUMENTATION.md` directly.

## Layout

- `lib/index.js` — the whole library (CJS, hand-written source, not build output)
- `lib/__tests__/index.test.js` — jest tests
- `.github/workflows/test.yml` — `npm test` on push to `master` and on PRs; actions are SHA-pinned and updated via Dependabot (`.github/dependabot.yml`), Node 24
- `docs/overview.md` — narrative docs prepended to `DOCUMENTATION.md`

## Architecture

A **panel** is a 2D array of `{ color: string }` objects (`panel[row][col]`). `'grey'` means blank; any other color means filled. All operations are pure (immutable) and return new panels. Built on `lodash` / `lodash/fp`.

- `createPanel(rows, cols)` — blank grid
- `paint(panel, positions, color)` — fill specific cells
- `zeroPoint: true` on a cell marks the rotation pivot for `rotate()`
- Movement: `up`, `down`, `left`, `right` — shift all cells one step, filling with an empty row/column on the opposite side
- Edge/collision checks: `isOnTheLeftEdge`, `isOnTheRightEdge`, `isOnTheBottomEdge`, `isOverlap`, `isOverlapPanels`, `isBlankPanel`, `isBlankItem`
- Composition: `overlap(a, b)` merges two panels; `add([...panels])` merges an array; `sub(a, b)` erases b's cells from a
- History: `snapshot(history, panel)` / `rewind(history, steps)` / `trace(fns)(panel)` for replay

Every exported function should have JSDoc, since `npm run doc` builds the API reference from it.
