const _ = require("lodash");
const fp = require("lodash/fp");

const GLOBAL = {
  color: "grey"
};

/**
 * Create an object, which has a color attribute
 * @param {string} color - The color of item
 * @return {object} this object has color attribute
 * @example
 * createItem('red');
 * // return { color: 'red' }
 */
const createItem = color => ({ color });

/**
 * Create an object, which has color, zeroPoint attribute
 * @param {string} color - The color of item
 * @return {object} this object has two attributes: color, zeroPoint
 * @example
 * createZeroItem('red');
 * // return { color: 'red', zeroPoint: true }
 */
const createZeroItem = color => ({ color, zeroPoint: true });

const getAry = (len, value) => _.range(len).map(() => _.cloneDeep(value));
const getEmptyRow = columns => getAry(columns, createItem(GLOBAL.color));

/**
 * Create a 2D array, which has a default value as { color: 'grey' }
 * @param {number} rows - rows of new 2D array
 * @param {number} columns - columns of new 2D array
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

const isItem = item => item.color !== GLOBAL.color;

/**
 * Check if an item color is 'grey'
 * @param {object} item - object which has a color attribute
 * @return {boolean} true if an item color is 'grey', otherwise false
 * @example
 * isBlankItem({ color: 'grey' });
 * // return true
 * isBlankItem({ color: 'red' });
 * // return false
 */
const isBlankItem = item => !item || item.color === GLOBAL.color;

const isNotFullRow = fp.some(isBlankItem);

/**
 * Check if all items color in panel is 'grey'
 * @param {array} panel - 2D array
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
 *      { color: 'red' }
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
 * @param {array} aPanel - this panel has items which have a color attribute
 * @param {array} bPanel - this panel has items which have a color attribute
 * @return {boolean} true if two panels were overlapped, otherwise false
 * @example
 * const aPanel = [
 *    [
 *      { color: 'grey' },
 *      { color: 'red' }
 *    ],
 *    [
 *      { color: 'grey' },
 *      { color: 'grey' }
 *    ]
 *  ]
 * const bPanel = [
 *    [
 *      { color: 'grey' },
 *      { color: 'red' }
 *    ],
 *    [
 *      { color: 'grey' },
 *      { color: 'grey' }
 *    ]
 *  ]
 * isOverlap(aPanel, bPanel);
 * // return true
 */
const isOverlap = (aPanel, bPanel) =>
  _.some(
    _.zipWith(_.flattenDepth(aPanel), _.flattenDepth(bPanel), isOverlapItem),
    fp.isEqual(true)
  );

const isOnTheLeftEdge = panel =>
  _.reduce(
    panel,
    (count, rows) => (isItem(_.first(rows)) ? count + 1 : count),
    0
  );

const isOnTheRightEdge = panel =>
  _.reduce(
    panel,
    (count, rows) => (isItem(_.last(rows)) ? count + 1 : count),
    0
  );

const isOnTheBottomEdge = panel => isNotBlankRow(_.last(panel));

/**
 * Collect all item, which zeroPoint attribute is true, from panel
 * @param {array} panel - this panel has items, each item have a zeroPoint attribute
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

const paint = (panel, posAry, color) => {
  const newPanel = _.cloneDeep(panel);
  posAry.forEach((pos, index) => {
    const item = _.assign(_.cloneDeep(pos), {
      color
    });
    newPanel[pos.row][pos.column] = item;
  });
  return newPanel;
};

const up = panel => {
  const columns = panel[0].length;
  const newPanel = _.cloneDeep(panel);
  newPanel.shift();
  newPanel.push(getEmptyRow(columns));
  return newPanel;
};

const down = panel => {
  const columns = panel[0].length;
  const newPanel = _.cloneDeep(panel);
  newPanel.pop();
  newPanel.unshift(getEmptyRow(columns));
  return newPanel;
};

const left = panel =>
  _.cloneDeep(panel).map(rows => {
    rows.shift();
    rows.push(createItem(GLOBAL.color));
    return rows;
  });

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

const rotate = (panel, moreSize = 2) => {
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
          startRow: _.first(zeroPoints).row - moreSize,
          startColumn: _.first(zeroPoints).column - moreSize,
          endRow: _.first(zeroPoints).row + moreSize,
          endColumn: _.first(zeroPoints).column + moreSize
        }
      : _.clone(area);

  return rotateRegion(newArea, panel);
};

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

const add = panelAry =>
  _.reduce(
    panelAry,
    (unionPanel, panel) => overlap(unionPanel, panel),
    createPanel(panelAry[0].length, panelAry[0][0].length)
  );

const sub = (aPanel, bPanel) =>
  _.chunk(
    _.zipWith(_.flattenDepth(aPanel), _.flattenDepth(bPanel), (a, b) =>
      isItem(b) ? createItem(GLOBAL.color) : a
    ),
    bPanel[0].length
  );

const repeat = (fn, initValue, count) =>
  _.reduce(_.range(count), (memo, num) => fn(memo), initValue);

const getMaxRow = panel =>
  _.reduce(
    panel,
    (count, rows) => {
      return _.every(rows, item => isBlankItem(item)) ? count + 1 : count;
    },
    0
  );

const adjustToBottom = panel => repeat(down, panel, getMaxRow(panel));

const getMaxColumn = panel =>
  _.reduce(
    panel,
    (maxIndex, rows) => {
      const lastIndex = _.findLastIndex(rows, item => isItem(item));
      return maxIndex > lastIndex ? maxIndex : lastIndex;
    },
    0
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

const getColorCount = panel =>
  _.reduce(
    _.flattenDepth(panel),
    (sum, item) => (sum + isItem(item) ? 1 : 0),
    0
  );

module.exports = {
  createItem,
  createZeroItem,
  createPanel,
  isItem,
  isBlankItem,
  isBlankPanel,
  isOverlap,
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
  adjustToBottom,
  adjustToCenter,
  adjustToRandomCenter
};
