const _ = require("lodash");
const fp = require("lodash/fp");

const GLOBAL = {
  color: "grey"
};

/**
 * Create an object, which has a color attribute
 * @param {string} color The color of item
 * @return {object} this object has color attribute
 * @example
 * createItem('pink');
 * // return { color: 'pink' }
 */
const createItem = color => ({ color });

/**
 * Create an object, which has color, zeroPoint attribute
 * @param {string} color The color of item
 * @return {object} this object has two attributes: color, zeroPoint
 * @example
 * createZeroItem('pink');
 * // return { color: 'pink', zeroPoint: true }
 */
const createZeroItem = color => ({ color, zeroPoint: true });

const getAry = (len, value) => _.range(len).map(() => _.cloneDeep(value));
const getEmptyRow = columns => getAry(columns, createItem(GLOBAL.color));

/**
 * Create a 2D array, which has a default value as { color: 'grey' }
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
const createPanel = (rows, columns) => getAry(rows, getEmptyRow(columns));

/**
 * Check if an item color is NOT 'grey'
 * @param {object} item a object which has a color attribute
 * @return {boolean} true if an item color is NOT 'grey', otherwise false
 * @example
 * isItem({ color: 'grey' });
 * // return false
 * isItem({ color: 'pink' });
 * // return true
 */
const isItem = item => item.color !== GLOBAL.color;

/**
 * Check if an item color is 'grey'
 * @param {object} item a object which has a color attribute
 * @return {boolean} true if an item color is 'grey', otherwise false
 * @example
 * isBlankItem({ color: 'grey' });
 * // return true
 * isBlankItem({ color: 'pink' });
 * // return false
 */
const isBlankItem = item => !item || item.color === GLOBAL.color;

const isNotFullRow = fp.some(isBlankItem);

/**
 * Check if all items color in panel is 'grey'
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
const isBlankPanel = panel => getColorCount(panel) === 0;

const isOverlapItem = (a, b) => isItem(a) && isItem(b);

/**
 * Check if panels were overlapped
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
  fp.some(([a, b]) => isOverlapItem(a, b))
);

const isOverlapPanels = (a, b) => {
  return _.some(b, panel => isOverlap(a, panel));
};

/**
 * Check if some color item is on the left edge of a panel
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
  fp.filter(isItem),
  fp.size,
  Boolean
);

/**
 * Check if some color item is on the right edge of a panel
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
  fp.filter(isItem),
  fp.size,
  Boolean
);

/**
 * Check if some color item is on the bottom edge of a panel
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
const isOnTheBottomEdge = panel => isNotBlankRow(_.last(panel));

/**
 * Collect all item, which zeroPoint attribute is true, from a panel
 * @param {array} panel Some items of the 2D array has a zeroPoint attribute
 * @return {array} a structure of each array element is { row: x, column: y }
 */
const getZeroPoints = panel => {
  const zeroPoints = [];
  panel.forEach((rows, rIndex) =>
    rows.forEach((item, cIndex) =>
      item.zeroPoint === true
        ? zeroPoints.push({ row: rIndex, column: cIndex })
        : item
    )
  );
  return zeroPoints;
};

const isNotBlankRow = fp.some(isItem);

/**
 * Change a color attribute of some item of a panel
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @param {array} posAry each items has 'row' and 'column' attribute.
 * @param {string} color a color string, for example 'pink', 'orange'
 * @return {array} new 2D array
 */
const paint = (panel, posAry, color) => {
  const newPanel = _.cloneDeep(panel);
  posAry.forEach((pos, index) => {
    const row = pos.row;
    const column = pos.column;
    delete pos.row;
    delete pos.column;
    const item = _.assign(_.cloneDeep(pos), {
      color
    });
    newPanel[row][column] = item;
  });
  return newPanel;
};

/**
 * Remove a top row of the panel and append an empty row to the bottom of the panel
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const up = fp.pipe(
  fp.cloneDeep,
  p => [...p.slice(1), getEmptyRow(p[0].length)]
);

/**
 * Remove a bottom row of the panel and append an empty row to the top of the panel
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const down = fp.pipe(
  fp.cloneDeep,
  p => [getEmptyRow(p[0].length), ...p.slice(0, -1)]
);

/**
 * Remove a left side of the panel and append an empty column to the right of the panel
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const left = panel =>
  _.cloneDeep(panel).map(rows => {
    rows.shift();
    rows.push(createItem(GLOBAL.color));
    return rows;
  });

/**
 * Remove a right side of the panel and append an empty column to the left of the panel
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const right = panel =>
  _.cloneDeep(panel).map(rows => {
    rows.pop();
    rows.unshift(createItem(GLOBAL.color));
    return rows;
  });

const flipMatrix = matrix =>
  matrix[0].map((column, index) => matrix.map(row => row[index]));

/* eslint no-unused-vars:off */
const rotateRegion = (area, panel) => {
  const newPanel = _.cloneDeep(panel);
  const fromAry = [];
  _.range(area.startRow, area.endRow + 1).forEach(row => {
    _.range(area.startColumn, area.endColumn + 1).forEach(column => {
      fromAry.push(
        _.isUndefined(newPanel[row]) || _.isUndefined(newPanel[row][column])
          ? createItem(GLOBAL.color)
          : newPanel[row][column]
      );
    });
  });
  const from2Ary = _.chunk(fromAry, Math.abs(area.startRow - area.endRow) + 1);
  const toAry = _.flattenDepth(flipMatrix(from2Ary.reverse()));
  _.range(area.startRow, area.endRow + 1).forEach(row => {
    _.range(area.startColumn, area.endColumn + 1).forEach(column => {
      const item = toAry.shift();
      const nop =
        _.isUndefined(newPanel[row]) || _.isUndefined(newPanel[row][column])
          ? ""
          : (newPanel[row][column] = _.cloneDeep(item));
    });
  });
  return newPanel;
};

/**
 * Rotate some items which have a zeroPoint attribute
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const rotate = panel => {
  const zeroPoints = getZeroPoints(panel);
  const area =
    zeroPoints.length === 0
      ? {
          startRow: 0,
          startColumn: 0,
          endRow: 0,
          endColumn: 0
        }
      : _.reduce(
          zeroPoints,
          (keep, zeroPoint) => ({
            startRow: Math.min(keep.startRow, zeroPoint.row),
            startColumn: Math.min(keep.startColumn, zeroPoint.column),
            endRow: Math.max(keep.endRow, zeroPoint.row),
            endColumn: Math.max(keep.endColumn, zeroPoint.column)
          }),
          {
            startRow: 100,
            startColumn: 100,
            endRow: -1,
            endColumn: -1
          }
        );

  const newArea =
    zeroPoints.length === 1
      ? {
          startRow: _.first(zeroPoints).row - 2,
          startColumn: _.first(zeroPoints).column - 2,
          endRow: _.first(zeroPoints).row + 2,
          endColumn: _.first(zeroPoints).column + 2
        }
      : _.clone(area);

  return rotateRegion(newArea, panel);
};

/**
 * Two panels will be overlap
 * @param {array} dPanel the panel is a 2D array which some items have a color attribute
 * @param {array} sPanel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const overlap = (dPanel, sPanel) => {
  const panel = _.cloneDeep(dPanel);
  dPanel.forEach((rows, rIdx) => {
    rows.forEach((item, cIdx) => {
      panel[rIdx][cIdx] =
        sPanel[rIdx] && sPanel[rIdx][cIdx] && isItem(sPanel[rIdx][cIdx])
          ? _.cloneDeep(sPanel[rIdx][cIdx])
          : panel[rIdx][cIdx];
    });
  });
  return panel;
};

/**
 * All panels will be overlap. (panelA + panelB + ... = newPanel)
 * @param {array} panelAry A array of panel
 * @return {array} new 2D array
 */
const add = panelAry =>
  _.reduce(
    panelAry,
    (unionPanel, panel) => overlap(unionPanel, panel),
    createPanel(panelAry[0].length, panelAry[0][0].length)
  );

/**
 * Two panels will be "subtracted". (aPanel - bPanel = newPanel)
 * @param {array} aPanel the panel is a 2D array which some items have a color attribute
 * @param {array} bPanel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const sub = (aPanel, bPanel) =>
  _.chunk(
    _.zipWith(_.flattenDepth(aPanel), _.flattenDepth(bPanel), (a, b) =>
      isItem(b) ? createItem(GLOBAL.color) : a
    ),
    bPanel[0].length
  );

const repeat = (fn, initValue, count) =>
  _.reduce(_.range(count), (memo, num) => fn(memo), initValue);

const getMaxRow = fp.pipe(
  fp.filter(isBlankItem),
  fp.size
);

const firstRowIsBlank = fp.pipe(
  fp.first,
  fp.filter(isItem),
  fp.size,
  Boolean
);

const lastRowIsBlank = fp.pipe(
  fp.last,
  fp.filter(isItem),
  fp.size,
  Boolean
);

/**
 * Return a distance from some tiems that has a color attribute to the top of the panel
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const getTopMargin = panel => {
  return firstRowIsBlank(panel) ? 0 : 1 + getTopMargin(_.tail(panel));
};

/**
 * Return a distance from some tiems that has a color attribute to the bottom of the panel
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const getBottomMargin = panel => {
  return lastRowIsBlank(panel) ? 0 : 1 + getBottomMargin(_.initial(panel));
};

/**
 * Move some items that has a color attribute to the top of the panel
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const adjustToTop = panel => repeat(up, panel, getTopMargin(panel));

/**
 * Move some items that has a color attribute to the bottom of the panel
 * @param {array} panel the panel is a 2D array which some items have a color attribute
 * @return {array} new 2D array
 */
const adjustToBottom = panel => repeat(down, panel, getBottomMargin(panel));

const getMaxColumn = fp.pipe(
  fp.map(fp.findLastIndex(isItem)),
  fp.max
);

const adjustToCenter = panel => {
  const columns = panel[0].length;
  const max = getMaxColumn(panel) + 1;
  const shift = columns > max ? ((columns - max) / 2).toFixed(0) : 0;
  return repeat(right, panel, shift);
};

const getMaxRightBlank = panel => panel[0].length - getMaxColumn(panel) - 1;

const adjustToRandomCenter = panel =>
  repeat(right, panel, _.random(0, getMaxRightBlank(panel)));

const getColorCount = fp.pipe(
  fp.flattenDeep,
  fp.filter(isItem),
  fp.size
);

module.exports = {
  createItem,
  createZeroItem,
  createPanel,
  isItem,
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
  adjustToRandomCenter
};
