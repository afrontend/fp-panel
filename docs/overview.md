# fp-panel

A functional programming library for 2D grid manipulation — designed for grid-based games like Tetris, Snake, and space shooters.

## Core Concepts

### The Panel

A **panel** is a 2D array of cell objects:

```
panel[row][col] = { color: string }
```

Every cell has a `color` attribute. `'grey'` is the convention for an empty cell; any other color means the cell is filled.

```
createPanel(3, 4):
 .  .  .  .   ← row 0
 .  .  .  .   ← row 1
 .  .  .  .   ← row 2
```

### Filled vs Empty

| Value | Meaning |
|-------|---------|
| `{ color: 'grey' }` | Empty cell (`.`) |
| `{ color: 'pink' }` | Filled cell (`■`) |

Use `isFilled` / `isBlankItem` to test a single cell, `isBlankPanel` to test the whole grid.

### zeroPoint — Rotation Anchor

To mark a cell as the center of rotation, add `zeroPoint: true`:

```js
{ color: 'cyan', zeroPoint: true }
```

`rotate()` performs a 90° clockwise rotation around the cell(s) marked as `zeroPoint`. Use `createZeroItem` as a shorthand. A piece with no `zeroPoint` does not rotate.

```
before (● = zeroPoint):    after rotate():
 .  .  ■  .                 .  .  .  .
 .  .  ●  ■       →         .  .  ●  ■
 .  .  .  .                 .  .  ■  .
```

### Immutability

**Every function returns a new panel and never mutates its input.** Functions can be composed freely, and the original panel is always safe to reuse.

---

## Function Reference by Category

| Category | Functions |
|----------|-----------|
| **Create** | [`createPanel`](#createPanel), [`createItem`](#createItem), [`createZeroItem`](#createZeroItem) |
| **Query** | [`isFilled`](#isFilled), [`isBlankItem`](#isBlankItem), [`isBlankPanel`](#isBlankPanel) |
| **Collision** | [`isOverlap`](#isOverlap), [`isOverlapPanels`](#isOverlapPanels), [`isOnTheLeftEdge`](#isOnTheLeftEdge), [`isOnTheRightEdge`](#isOnTheRightEdge), [`isOnTheBottomEdge`](#isOnTheBottomEdge) |
| **Move** | [`up`](#up), [`down`](#down), [`left`](#left), [`right`](#right) |
| **Align** | [`adjustToTop`](#adjustToTop), [`adjustToBottom`](#adjustToBottom), [`adjustToCenter`](#adjustToCenter), [`adjustToRandomCenter`](#adjustToRandomCenter), [`getTopMargin`](#getTopMargin), [`getBottomMargin`](#getBottomMargin) |
| **Draw** | [`paint`](#paint), [`getZeroPoints`](#getZeroPoints) |
| **Combine** | [`overlap`](#overlap), [`add`](#add), [`sub`](#sub) |
| **Rotate** | [`rotate`](#rotate), [`canRotate`](#canRotate) |
| **Game logic** | [`removeFullRows`](#removeFullRows) |
| **History** | [`snapshot`](#snapshot), [`rewind`](#rewind), [`trace`](#trace) |

---

## Usage Patterns

Real-world patterns extracted from games built with fp-panel.

### Pattern 1 — Create and position a piece

Paint a shape onto a blank panel, then align it into position.

```js
const piece = pipe(
  (panel) => p.paint(panel, [
    { row: 0, column: 1, zeroPoint: true },
    { row: 1, column: 0 },
    { row: 1, column: 1 },
    { row: 1, column: 2 },
  ], 'cyan'),
  p.adjustToCenter,   // center horizontally
  p.adjustToBottom,   // snap to bottom row
)(p.createPanel(rows, cols));
```

Used by: **fp-tetris** (tetromino spawn), **fp-block** / **fp-space** (shuttle placement)

---

### Pattern 2 — Move with boundary and collision guard

Check the edge and background collision *before* applying the move.

```js
const canMoveLeft =
  !p.isOnTheLeftEdge(piece) &&
  !p.isOverlap(bgPanel, p.left(piece));

if (canMoveLeft) piece = p.left(piece);
```

Used by: **fp-tetris**, **fp-block**, **fp-space** (left / right key handlers)

---

### Pattern 3 — Separate bgPanel and toolPanel (Tetris model)

Keep the fixed background and the moving piece as two independent panels.
Combine them only for rendering. Lock the piece to the background when it lands.

```js
// State
let state = { bgPanel, toolPanel };

// Render: combine only at display time
const display = p.add([state.bgPanel, state.toolPanel]);

// Lock: merge toolPanel into bgPanel when the piece lands
const newBg = p.add([state.bgPanel, state.toolPanel]);
state = { ...state, bgPanel: newBg, toolPanel: nextPiece };
```

Used by: **fp-tetris**

---

### Pattern 4 — Multi-panel rendering (shooter model)

Maintain each game object as its own panel. Combine all panels for the final display.

```js
// State: each object lives in its own panel
let state = { bgPanel, shuttlePanel, missilePanel, meteoritePanel };

// Render: stack all layers
const display = p.add([
  state.bgPanel,
  state.shuttlePanel,
  state.missilePanel,
  state.meteoritePanel,
]);
```

Used by: **fp-block**, **fp-space**

---

### Pattern 5 — Mutual subtraction for collision resolution

When two moving panels collide, remove the intersecting cells from both sides at once.

```js
const nextMissile   = p.sub(missilePanel, meteoritePanel);
const nextMeteorite = p.sub(meteoritePanel, missilePanel);
```

Used by: **fp-block**, **fp-space** (missile vs. meteorite)

---

### Pattern 6 — Tetris line clear

Lock the piece, remove full rows, then spawn the next piece.

```js
const newBg     = p.add([bgPanel, toolPanel]);
const clearedBg = p.removeFullRows(newBg);
const nextPiece = createRandomPiece(rows, cols, clearedBg);
```

Used by: **fp-tetris**

---

### Pattern 7 — Safe rotation

Check whether rotation is valid before applying it.

```js
if (p.canRotate(bgPanel, toolPanel)) {
  toolPanel = p.rotate(toolPanel);
}
```

`canRotate` verifies that the rotated piece stays in-bounds and does not overlap the background.

Used by: **fp-tetris** (up-key handler)

---

### Pattern 8 — Hard drop

Repeatedly move the piece down until it is blocked.

```js
while (
  !p.isOnTheBottomEdge(toolPanel) &&
  !p.isOverlap(bgPanel, p.down(toolPanel))
) {
  toolPanel = p.down(toolPanel);
}
```

Used by: **fp-tetris**

---

### Pattern 9 — Store extra state inside cells

Cell objects can carry any extra properties beyond `color`. fp-panel's functions only inspect `color` and `zeroPoint`; all other fields pass through untouched.

```js
// fp-snake stores movement direction and segment order in each cell
p.paint(panel, [
  { row, column, key: DIRECTION.RIGHT, index: 0 },
], 'orange');

// Later, extract and sort segments by the stored index
const segments = flatten(snakePanel)
  .filter(p.isFilled)
  .sort((a, b) => a.index - b.index);
```

Used by: **fp-snake** (direction and segment ordering per cell)

---

### Pattern 10 — Transformation pipeline with history

`trace()` applies a chain of transformations and records every intermediate panel.

```js
const { panel, history } = trace([right, right, down])(initialPanel);
// panel   — final result after all transforms
// history — [initial, afterRight1, afterRight2, afterDown]

rewind(history, 1); // one step back → afterRight2
snapshot(history, panel); // append current panel to history
```

---

## API Reference
