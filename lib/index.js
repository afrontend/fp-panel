const _ = require("lodash");
const fp = require("lodash/fp");
const { deprecate } = require("util");

const DEFAULT_COLOR = "grey";

/**
 * Create an object, which has a color attribute
 * @param {string} color The color of item
 * @return {object} this object has color attribute
 * @example
 * createItem('pink');
 * // return { color: 'pink' }
 */
const createItem = (color) => ({ color });

/**
 * Create an object, which has color, zeroPoint attribute
 * @param {string} color The color of item
 * @return {object} this object has two attributes: color, zeroPoint
 * @example
 * createZeroItem('pink');
 * // return { color: 'pink', zeroPoint: true }
 */
const createZeroItem = (color) => ({ color, zeroPoint: true });

const createFilledArray = (len, value) => _.range(len).map(() => _.cloneDeep(value));
const getEmptyRow = (columns) => createFilledArray(columns, createItem(DEFAULT_COLOR));

/**
 * Create a 2D array, which has a default value as { color: 'grey' }
 *
 * ```
 * createPanel(2, 3):
 *  .  .  .
 *  .  .  .
 * ```
 *
 * @param {number} rows rows of new 2D array
 * @param {number} columns columns of new 2D array
 * @return {array} 2D array with color initial value
 * @example
 * createPanel(2, 2);
 * // return [
 * //   [
 * //     { color: 'grey' },
 * //     { color: 'grey' }
 * //   ],
 * //   [
 * //     { color: 'grey' },
 * //     { color: 'grey' }
 * //   ]
 * // ]
 */
const createPanel = (rows, columns) => createFilledArray(rows, getEmptyRow(columns));

/**
 * Check if a cell color is NOT 'grey' (i.e. the cell is filled)
 *
 * ```
 * isFilled(■) → true
 * isFilled(.) → false
 * ```
 *
 * @param {object} cell a object which has a color attribute
 * @return {boolean} true if a cell color is NOT 'grey', otherwise false
 * @example
 * isFilled({ color: 'grey' });
 * // return false
 * isFilled({ color: 'pink' });
 * // return true
 */
const isFilled = (cell) => cell.color !== DEFAULT_COLOR;

/**
 * Check if an item color is 'grey'
 *
 * ```
 * isBlankItem(.) → true
 * isBlankItem(■) → false
 * ```
 *
 * @param {object} item a object which has a color attribute
 * @return {boolean} true if an item color is 'grey', otherwise false
 * @example
 * isBlankItem({ color: 'grey' });
 * // return true
 * isBlankItem({ color: 'pink' });
 * // return false
 */
const isBlankItem = (item) => !item || item.color === DEFAULT_COLOR;

const isNotBlankRow = fp.some(isFilled);

const getColorCount = fp.pipe(fp.flattenDeep, fp.filter(isFilled), fp.size);

/**
 * Check if all items color in panel is 'grey'
 *
 * ```
 * aPanel (all grey) → true:    bPanel (has pink) → false:
 *  .  .                          .  ■
 *  .  .                          .  .
 * ```
 *
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {boolean} true if all item color is 'grey', otherwise false
 * @example
 * const aPanel = [
 *    [
 *      { color: 'grey' },
 *      { color: 'grey' }
 *    ],
 *    [
 *      { color: 'grey' },
 *      { color: 'grey' }
 *    ]
 *  ]
 * isBlankPanel(aPanel);
 * // return true
 *
 * const bPanel = [
 *    [
 *      { color: 'grey' },
 *      { color: 'pink' }
 *    ],
 *    [
 *      { color: 'grey' },
 *      { color: 'grey' }
 *    ]
 *  ]
 * isBlankPanel(bPanel);
 * // return false
 *
 */
const isBlankPanel = (panel) => getColorCount(panel) === 0;

const areBothItems = (a, b) => isFilled(a) && isFilled(b);

/**
 * Check if panels were overlapped
 *
 * ```
 * aPanel:    bPanel:    isOverlap → true
 *  .  ■       .  ■      (column 1 row 0 collides)
 *  .  .       .  .
 *
 * aPanel:    bPanel:    isOverlap → false
 *  ■  .       .  ■      (no position collides)
 *  .  .       .  .
 * ```
 *
 * @function
 * @param {array} aPanel the panel is a 2D array which some items have a color attribute
 * @param {array} bPanel the panel is a 2D array which some items have a color attribute
 * @return {boolean} true if two panels were overlapped, otherwise false
 * @example
 * const aPanel = [
 *    [
 *      { color: 'grey' },
 *      { color: 'pink' }
 *    ],
 *    [
 *      { color: 'grey' },
 *      { color: 'grey' }
 *    ]
 *  ]
 * const bPanel = [
 *    [
 *      { color: 'grey' },
 *      { color: 'pink' }
 *    ],
 *    [
 *      { color: 'grey' },
 *      { color: 'grey' }
 *    ]
 *  ]
 * isOverlap(aPanel, bPanel);
 * // return true
 */
const isOverlap = fp.pipe(
  (a, b) => _.zip(_.flattenDepth(a), _.flattenDepth(b)),
  fp.some(([a, b]) => areBothItems(a, b)),
);

/**
 * Check if panels were overlapped
 *
 * ```
 * aPanel:    bPanel1:   bPanel2:   isOverlapPanels(aPanel, [bPanel1, bPanel2]) → false
 *  .  ■       .  .       .  .      (aPanel does not collide with either panel)
 *  .  .       .  .       .  ■
 * ```
 *
 * @param {array} aPanel the panel is a 2D array which some items have a color attribute
 * @param {array} panels the panel array
 * @return {boolean} true if aPanel were overlapped with one of the panels, otherwise false
 * @example
 * const aPanel = [
 *    [
 *      { color: 'grey' },
 *      { color: 'pink' }
 *    ],
 *    [
 *      { color: 'grey' },
 *      { color: 'grey' }
 *    ]
 *  ]
 * const bPanel1 = [
 *    [
 *      { color: 'grey' },
 *      { color: 'grey' }
 *    ],
 *    [
 *      { color: 'grey' },
 *      { color: 'grey' }
 *    ]
 *  ]
 * const bPanel2 = [
 *    [
 *      { color: 'grey' },
 *      { color: 'grey' }
 *    ],
 *    [
 *      { color: 'grey' },
 *      { color: 'pink' }
 *    ]
 *  ]
 * const panels = [ bPanel1, bPanel2 ];
 * isOverlapPanels(aPanel, panels);
 * // return false
 */
const isOverlapPanels = (aPanel, panels) =>
  _.some(panels, (panel) => isOverlap(aPanel, panel));

/**
 * Check if some color item is on the left edge of a panel
 *
 * ```
 * → true:      → false:
 *  ■  .  .      .  ■  .
 *  ■  .  .      .  .  .
 * ```
 *
 * @function
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {boolean} true if some item is on the left edge of a panel, otherwise false
 * @example
 * const panel = [
 *    [
 *      { color: 'pink' }
 *      { color: 'grey' },
 *    ],
 *    [
 *      { color: 'pink' }
 *      { color: 'grey' },
 *    ]
 *  ]
 * isOnTheLeftEdge(panel)
 * // return true
 */
const isOnTheLeftEdge = fp.pipe(
  fp.map(fp.first),
  fp.filter(isFilled),
  fp.size,
  Boolean,
);

/**
 * Check if some color item is on the right edge of a panel
 *
 * ```
 * → true:      → false:
 *  .  .  ■      .  ■  .
 *  .  .  ■      .  .  .
 * ```
 *
 * @function
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {boolean} true if some item is on the right edge of a panel, otherwise false
 * @example
 * const panel = [
 *    [
 *      { color: 'grey' },
 *      { color: 'pink' }
 *    ],
 *    [
 *      { color: 'grey' },
 *      { color: 'pink' }
 *    ]
 *  ]
 * isOnTheRightEdge(panel)
 * // return true
 */
const isOnTheRightEdge = fp.pipe(
  fp.map(fp.last),
  fp.filter(isFilled),
  fp.size,
  Boolean,
);

/**
 * Check if some color item is on the bottom edge of a panel
 *
 * ```
 * → true:      → false:
 *  .  .  .      .  ■  .
 *  ■  ■  .      .  .  .
 * ```
 *
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {boolean} true if some item is on the bottom edge of a panel, otherwise false
 * @example
 * const panel = [
 *    [
 *      { color: 'grey' },
 *      { color: 'grey' },
 *    ],
 *    [
 *      { color: 'pink' }
 *      { color: 'pink' }
 *    ]
 *  ]
 * isOnTheBottomEdge(panel)
 * // return true
 */
const isOnTheBottomEdge = (panel) => isNotBlankRow(_.last(panel));

/**
 * Collect all item, which zeroPoint attribute is true, from a panel
 *
 * ```
 * panel (● = zeroPoint):    result:
 *  .  .  .                   [{ row: 1, column: 1 }]
 *  .  ●  .
 *  .  .  .
 * ```
 *
 * @param {array} panel Some items of the 2D array has a zeroPoint attribute
 * @return {array} a structure of each array element is { row: x, column: y }
 */
const getZeroPoints = (panel) => {
  const zeroPoints = [];
  panel.forEach((rows, rowIndex) =>
    rows.forEach((item, colIndex) => {
      if (item.zeroPoint === true) {
        zeroPoints.push({ row: rowIndex, column: colIndex });
      }
    }),
  );
  return zeroPoints;
};

/**
 * Change a color attribute of some item of a panel
 *
 * ```
 * before:           after paint(positions, 'pink'):
 *  .  .  .  .  .    .  .  .  .  .
 *  .  .  .  .  .    .  ■  .  .  .
 *  .  .  .  .  .  → .  ■  ■  .  .
 *  .  .  .  .  .    .  ■  .  .  .
 *  .  .  .  .  .    .  .  .  .  .
 * ```
 *
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @param {array} posAry each items has 'row' and 'column' attribute.
 * @param {string} color a color string, for example 'pink', 'orange'
 * @return {array} new 2D array
 */
const paint = (panel, posAry, color) => {
  const newPanel = _.cloneDeep(panel);
  posAry.forEach((pos) => {
    const row = pos.row;
    const column = pos.column;
    const item = _.assign(_.cloneDeep(pos), { color });
    newPanel[row][column] = item;
  });
  return newPanel;
};

/**
 * Remove a top row of the panel and append an empty row to the bottom of the panel
 *
 * ```
 * before:        after:
 *  .  .  .  .    ■  ■  .  .
 *  ■  ■  .  .    .  .  .  .
 *  .  .  .  .  → .  .  .  .
 *  .  .  .  .    .  .  .  .
 * ```
 *
 * @function
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const up = fp.pipe(fp.cloneDeep, (p) => [
  ...p.slice(1),
  getEmptyRow(p[0].length),
]);

/**
 * Remove a bottom row of the panel and append an empty row to the top of the panel
 *
 * ```
 * before:        after:
 *  ■  ■  .  .    .  .  .  .
 *  .  .  .  .    ■  ■  .  .
 *  .  .  .  .  → .  .  .  .
 *  .  .  .  .    .  .  .  .
 * ```
 *
 * @function
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const down = fp.pipe(fp.cloneDeep, (p) => [
  getEmptyRow(p[0].length),
  ...p.slice(0, -1),
]);

/**
 * Remove a left side of the panel and append an empty column to the right of the panel
 *
 * ```
 * before:           after:
 *  .  ■  .  .  .    ■  .  .  .  .
 *  .  ■  .  .  .    ■  .  .  .  .
 *  .  ■  .  .  .  → ■  .  .  .  .
 *  .  .  .  .  .    .  .  .  .  .
 * ```
 *
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const left = (panel) =>
  _.cloneDeep(panel).map((rows) => {
    rows.shift();
    rows.push(createItem(DEFAULT_COLOR));
    return rows;
  });

/**
 * Remove a right side of the panel and append an empty column to the left of the panel
 *
 * ```
 * before:           after:
 *  ■  .  .  .  .    .  ■  .  .  .
 *  ■  .  .  .  .    .  ■  .  .  .
 *  ■  .  .  .  .  → .  ■  .  .  .
 *  .  .  .  .  .    .  .  .  .  .
 * ```
 *
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const right = (panel) =>
  _.cloneDeep(panel).map((rows) => {
    rows.pop();
    rows.unshift(createItem(DEFAULT_COLOR));
    return rows;
  });

const transposeMatrix = (matrix) =>
  matrix[0].map((column, index) => matrix.map((row) => row[index]));

const rotateRegion = (area, panel) => {
  const newPanel = _.cloneDeep(panel);
  const sourceItems = [];
  _.range(area.startRow, area.endRow + 1).forEach((row) => {
    _.range(area.startColumn, area.endColumn + 1).forEach((column) => {
      sourceItems.push(
        _.isUndefined(newPanel[row]) || _.isUndefined(newPanel[row][column])
          ? createItem(DEFAULT_COLOR)
          : newPanel[row][column],
      );
    });
  });
  const itemGrid = _.chunk(sourceItems, Math.abs(area.startRow - area.endRow) + 1);
  const rotatedItems = _.flattenDepth(transposeMatrix(itemGrid.reverse()));
  _.range(area.startRow, area.endRow + 1).forEach((row) => {
    _.range(area.startColumn, area.endColumn + 1).forEach((column) => {
      const item = rotatedItems.shift();
      if (!_.isUndefined(newPanel[row]) && !_.isUndefined(newPanel[row][column])) {
        newPanel[row][column] = _.cloneDeep(item);
      }
    });
  });
  return newPanel;
};

/**
 * Rotate some items which have a zeroPoint attribute (90° clockwise around the zeroPoint)
 *
 * ```
 * before (● = zeroPoint):    after:
 *  .  .  ■  .  .              .  .  .  .  .
 *  .  .  ■  .  .              .  .  .  .  .
 *  .  .  ●  ■  .            → .  .  ●  ■  ■
 *  .  .  .  .  .              .  .  ■  .  .
 *  .  .  .  .  .              .  .  .  .  .
 * ```
 *
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const rotate = (panel) => {
  const zeroPoints = getZeroPoints(panel);
  const area =
    zeroPoints.length === 0
      ? {
          startRow: 0,
          startColumn: 0,
          endRow: 0,
          endColumn: 0,
        }
      : _.reduce(
          zeroPoints,
          (bounds, zeroPoint) => ({
            startRow: Math.min(bounds.startRow, zeroPoint.row),
            startColumn: Math.min(bounds.startColumn, zeroPoint.column),
            endRow: Math.max(bounds.endRow, zeroPoint.row),
            endColumn: Math.max(bounds.endColumn, zeroPoint.column),
          }),
          {
            startRow: Infinity,
            startColumn: Infinity,
            endRow: -Infinity,
            endColumn: -Infinity,
          },
        );

  const newArea =
    zeroPoints.length === 1
      ? {
          startRow: _.first(zeroPoints).row - 2,
          startColumn: _.first(zeroPoints).column - 2,
          endRow: _.first(zeroPoints).row + 2,
          endColumn: _.first(zeroPoints).column + 2,
        }
      : _.clone(area);

  return rotateRegion(newArea, panel);
};

/**
 * Two panels will be overlap
 *
 * ```
 * dPanel:      sPanel:      result:
 *  ■  ■  .      .  .  .      ■  ■  .
 *  .  .  .  +   .  .  ■  =   .  .  ■
 *  .  .  ■      .  ■  .      .  ■  ■
 * ```
 *
 * @param {array} dPanel the panel is a 2D array which some items have a color attribute
 * @param {array} sPanel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const overlap = (dPanel, sPanel) => {
  const panel = _.cloneDeep(dPanel);
  dPanel.forEach((rows, rowIndex) => {
    rows.forEach((item, colIndex) => {
      panel[rowIndex][colIndex] =
        sPanel[rowIndex] && sPanel[rowIndex][colIndex] && isFilled(sPanel[rowIndex][colIndex])
          ? _.cloneDeep(sPanel[rowIndex][colIndex])
          : panel[rowIndex][colIndex];
    });
  });
  return panel;
};

/**
 * All panels will be overlap. (panelA + panelB + ... = newPanel)
 *
 * ```
 * A:           B:           C:           add([A,B,C]):
 *  ■  .  .      .  ■  .      .  .  ■      ■  ■  ■
 *  ■  .  .  +   .  ■  .  +   .  .  ■  =   ■  ■  ■
 *  ■  .  .      .  ■  .      .  .  ■      ■  ■  ■
 * ```
 *
 * @param {array} panelAry A array of panel
 * @return {array} new 2D array
 */
const add = (panelAry) =>
  _.reduce(
    panelAry,
    (unionPanel, panel) => overlap(unionPanel, panel),
    createPanel(panelAry[0].length, panelAry[0][0].length),
  );

/**
 * Two panels will be "subtracted". (aPanel - bPanel = newPanel)
 *
 * ```
 * aPanel:      bPanel:      result:
 *  ■  ■  ■      ■  .  .      .  ■  ■
 *  ■  .  ■  -   .  .  ■  =   ■  .  .
 *  .  ■  ■      .  ■  .      .  .  ■
 * ```
 *
 * @param {array} aPanel the panel is a 2D array which some items have a color attribute
 * @param {array} bPanel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const sub = (aPanel, bPanel) =>
  _.chunk(
    _.zipWith(_.flattenDepth(aPanel), _.flattenDepth(bPanel), (a, b) =>
      isFilled(b) ? createItem(DEFAULT_COLOR) : a,
    ),
    bPanel[0].length,
  );

const repeat = (fn, initValue, count) =>
  _.reduce(_.range(count), (memo) => fn(memo), initValue);

const firstRowHasItems = fp.pipe(fp.first, fp.filter(isFilled), fp.size, Boolean);

const lastRowHasItems = fp.pipe(fp.last, fp.filter(isFilled), fp.size, Boolean);

/**
 * Return a distance from some items that has a color attribute to the top of the panel
 *
 * ```
 * panel:         getTopMargin → 2
 *  .  .  .  .
 *  .  .  .  .
 *  ■  ■  .  .
 *  .  .  .  .
 * ```
 *
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {number} number of blank rows from the top
 */
const getTopMargin = (panel) => {
  return firstRowHasItems(panel) ? 0 : 1 + getTopMargin(_.tail(panel));
};

/**
 * Return a distance from some items that has a color attribute to the bottom of the panel
 *
 * ```
 * panel:         getBottomMargin → 2
 *  .  .  .  .
 *  ■  ■  .  .
 *  .  .  .  .
 *  .  .  .  .
 * ```
 *
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {number} number of blank rows from the bottom
 */
const getBottomMargin = (panel) => {
  return lastRowHasItems(panel) ? 0 : 1 + getBottomMargin(_.initial(panel));
};

/**
 * Move some items that has a color attribute to the top of the panel
 *
 * ```
 * before:        after:
 *  .  .  .  .    ■  ■  .  .
 *  ■  ■  .  .    .  .  .  .
 *  .  .  .  .  → .  .  .  .
 *  .  .  .  .    .  .  .  .
 * ```
 *
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const adjustToTop = (panel) => repeat(up, panel, getTopMargin(panel));

/**
 * Move some items that has a color attribute to the bottom of the panel
 *
 * ```
 * before:        after:
 *  ■  ■  .  .    .  .  .  .
 *  .  .  .  .    .  .  .  .
 *  .  .  .  .  → .  .  .  .
 *  .  .  .  .    ■  ■  .  .
 * ```
 *
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const adjustToBottom = (panel) => repeat(down, panel, getBottomMargin(panel));

const getRightmostItemIndex = fp.pipe(fp.map(fp.findLastIndex(isFilled)), fp.max);

/**
 * Move some items to the horizontal center of the panel
 *
 * ```
 * before:              after:
 *  ■  ■  .  .  .  .    .  ■  ■  .  .  .
 *  .  .  .  .  .  .  → .  .  .  .  .  .
 *  .  .  .  .  .  .    .  .  .  .  .  .
 * ```
 *
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const adjustToCenter = (panel) => {
  const columns = panel[0].length;
  const max = getRightmostItemIndex(panel) + 1;
  const shift = columns > max ? ((columns - max) / 2).toFixed(0) : 0;
  return repeat(right, panel, shift);
};

const countRightBlanks = (panel) => panel[0].length - getRightmostItemIndex(panel) - 1;

/**
 * Move some items to a random horizontal position within the available space
 *
 * ```
 * before:              after (one possibility):
 *  ■  ■  .  .  .  .    .  .  ■  ■  .  .
 *  .  .  .  .  .  .  → .  .  .  .  .  .
 *  .  .  .  .  .  .    .  .  .  .  .  .
 * ```
 *
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const adjustToRandomCenter = (panel) =>
  repeat(right, panel, _.random(0, countRightBlanks(panel)));

/**
 * Append the current panel state to a history array (immutably)
 *
 * ```
 * panel (p2):           snapshot(history, panel):
 *  .  ■  .               history: [p0, p1] → [p0, p1, p2]
 *  .  ■  .
 *  .  .  .
 *
 * Each call returns a new array — the original history is never mutated.
 * ```
 *
 * @param {array} history array of past panel states
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new history array with panel appended
 * @example
 * let history = [];
 * history = snapshot(history, panel0); // [panel0]
 * history = snapshot(history, panel1); // [panel0, panel1]
 * history = snapshot(history, panel2); // [panel0, panel1, panel2]
 */
const snapshot = (history, panel) => [...history, _.cloneDeep(panel)];

/**
 * Retrieve a panel state from N steps ago in the history
 *
 * ```
 * history: [ p0,       p1,       p2      ]
 *            oldest              latest
 *
 * p0:        p1:        p2 (latest):
 *  ■  .  .    .  ■  .    .  .  ■
 *  .  .  .    .  .  .    .  .  .
 *
 * rewind(history, 0) → p2   (current)
 * rewind(history, 1) → p1   (1 step ago)
 * rewind(history, 2) → p0   (2 steps ago)
 * ```
 *
 * @param {array} history array of past panel states
 * @param {number} steps number of steps to go back (default: 1)
 * @return {array} panel state from N steps ago (cloned)
 * @example
 * rewind(history, 0); // latest panel
 * rewind(history, 1); // one step ago
 * rewind(history);    // one step ago (default)
 */
const rewind = (history, steps = 1) =>
  _.cloneDeep(history[Math.max(0, history.length - 1 - steps)]);

/**
 * Apply a pipeline of panel transformations and capture every intermediate state
 *
 * ```
 * trace([right, down])(panel):
 *
 * step 0:      step 1 (right):  step 2 (down):
 *  ■  .  .      .  ■  .          .  .  .
 *  .  .  .  →   .  .  .    →     .  ■  .
 *  .  .  .      .  .  .          .  .  .
 *
 * → { panel: step2, history: [step0, step1, step2] }
 * ```
 *
 * Since every fp-panel function is pure, each step produces an independent
 * snapshot — replaying or rewinding is as simple as indexing into history.
 *
 * @param {array} fns array of panel-transform functions to apply in sequence
 * @return {function} a function that takes an initial panel and returns { panel, history }
 * @example
 * const { panel, history } = trace([right, right, down])(initialPanel);
 * // panel   — final result after all transforms
 * // history — [initial, afterRight, afterRight2, afterDown]
 * rewind(history, 1); // → afterRight2 (one step before final)
 */
const trace = (fns) => (panel) =>
  fns.reduce(
    ({ panel: p, history }, fn) => {
      const next = fn(p);
      return { panel: next, history: [...history, next] };
    },
    { panel: _.cloneDeep(panel), history: [_.cloneDeep(panel)] },
  );

/**
 * Check if a tool panel can be rotated without clipping or overlapping the background
 *
 * ```
 * bgPanel:     toolPanel:     canRotate → true
 *  .  .  .      .  ■  .       (rotation stays in bounds and doesn't hit bg)
 *  .  .  .      .  ●  .
 *  .  .  .      .  .  .
 *
 * bgPanel:     toolPanel:     canRotate → false
 *  ■  ■  ■      .  ■  .       (rotated piece overlaps bgPanel)
 *  .  .  .      .  ●  .
 *  .  .  .      .  .  .
 * ```
 *
 * @param {array} bgPanel the fixed background panel
 * @param {array} toolPanel the moving piece panel (must contain a zeroPoint cell)
 * @return {boolean} true if the rotation is valid, otherwise false
 */
const canRotate = (bgPanel, toolPanel) => {
  const rotated = rotate(toolPanel);
  return (
    getColorCount(toolPanel) === getColorCount(rotated) &&
    !isOverlap(bgPanel, rotated)
  );
};

/**
 * Remove all full rows from a panel and pad the top with empty rows
 *
 * A row is considered full when every cell is filled (no grey cells remain).
 * The panel height is preserved: for each removed row, one empty row is added at the top.
 *
 * ```
 * before (columns=4):      after:
 *  .  ■  .  .               .  .  .  .   ← new empty row
 *  ■  ■  ■  ■   (full)  →   .  ■  .  .
 *  .  ■  .  ■               .  ■  .  ■
 * ```
 *
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array with full rows removed and empty rows prepended
 */
const removeFullRows = (panel) => {
  const columns = panel[0].length;
  const isFullRow = (row) => row.every(isFilled);
  const filtered = panel.filter((row) => !isFullRow(row));
  const emptyRows = _.range(panel.length - filtered.length).map(() =>
    getEmptyRow(columns),
  );
  return [...emptyRows, ...filtered];
};

module.exports = {
  createItem,
  createZeroItem,
  createPanel,
  isFilled,
  /**
   * @deprecated Use `isFilled` instead. `isItem` will be removed in a future major version.
   */
  isItem: deprecate(isFilled, '`isItem` is deprecated. Use `isFilled` instead.', 'DEP_IS_ITEM'),
  isBlankItem,
  isBlankPanel,
  isOverlap,
  isOverlapPanels,
  isOnTheLeftEdge,
  isOnTheRightEdge,
  isOnTheBottomEdge,
  getZeroPoints,
  paint,
  up,
  down,
  left,
  right,
  rotate,
  overlap,
  add,
  sub,
  adjustToTop,
  adjustToBottom,
  adjustToCenter,
  adjustToRandomCenter,
  snapshot,
  rewind,
  trace,
  canRotate,
  removeFullRows,
};
