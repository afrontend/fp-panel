## Functions

<dl>
<dt><a href="#createItem">createItem(color)</a> ⇒ <code>object</code></dt>
<dd><p>Create an object, which has a color attribute</p>
</dd>
<dt><a href="#createZeroItem">createZeroItem(color)</a> ⇒ <code>object</code></dt>
<dd><p>Create an object, which has color, zeroPoint attribute</p>
</dd>
<dt><a href="#createPanel">createPanel(rows, columns)</a> ⇒ <code>array</code></dt>
<dd><p>Create a 2D array, which has a default value as { color: &#39;grey&#39; }</p>
<pre><code>createPanel(2, 3):
 .  .  .
 .  .  .
</code></pre>
</dd>
<dt><a href="#isFilled">isFilled(cell)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if a cell color is NOT &#39;grey&#39; (i.e. the cell is filled)</p>
<pre><code>isFilled(■) → true
isFilled(.) → false
</code></pre>
</dd>
<dt><a href="#isBlankItem">isBlankItem(item)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if an item color is &#39;grey&#39;</p>
<pre><code>isBlankItem(.) → true
isBlankItem(■) → false
</code></pre>
</dd>
<dt><a href="#isBlankPanel">isBlankPanel(panel)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if all items color in panel is &#39;grey&#39;</p>
<pre><code>aPanel (all grey) → true:    bPanel (has pink) → false:
 .  .                          .  ■
 .  .                          .  .
</code></pre>
</dd>
<dt><a href="#isOverlap">isOverlap(aPanel, bPanel)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if panels were overlapped</p>
<pre><code>aPanel:    bPanel:    isOverlap → true
 .  ■       .  ■      (column 1 row 0 collides)
 .  .       .  .

aPanel:    bPanel:    isOverlap → false
 ■  .       .  ■      (no position collides)
 .  .       .  .
</code></pre>
</dd>
<dt><a href="#isOverlapPanels">isOverlapPanels(aPanel, panels)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if panels were overlapped</p>
<pre><code>aPanel:    bPanel1:   bPanel2:   isOverlapPanels(aPanel, [bPanel1, bPanel2]) → false
 .  ■       .  .       .  .      (aPanel does not collide with either panel)
 .  .       .  .       .  ■
</code></pre>
</dd>
<dt><a href="#isOnTheLeftEdge">isOnTheLeftEdge(panel)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if some color item is on the left edge of a panel</p>
<pre><code>→ true:      → false:
 ■  .  .      .  ■  .
 ■  .  .      .  .  .
</code></pre>
</dd>
<dt><a href="#isOnTheRightEdge">isOnTheRightEdge(panel)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if some color item is on the right edge of a panel</p>
<pre><code>→ true:      → false:
 .  .  ■      .  ■  .
 .  .  ■      .  .  .
</code></pre>
</dd>
<dt><a href="#isOnTheBottomEdge">isOnTheBottomEdge(panel)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if some color item is on the bottom edge of a panel</p>
<pre><code>→ true:      → false:
 .  .  .      .  ■  .
 ■  ■  .      .  .  .
</code></pre>
</dd>
<dt><a href="#getZeroPoints">getZeroPoints(panel)</a> ⇒ <code>array</code></dt>
<dd><p>Collect all item, which zeroPoint attribute is true, from a panel</p>
<pre><code>panel (● = zeroPoint):    result:
 .  .  .                   [{ row: 1, column: 1 }]
 .  ●  .
 .  .  .
</code></pre>
</dd>
<dt><a href="#paint">paint(panel, posAry, color)</a> ⇒ <code>array</code></dt>
<dd><p>Change a color attribute of some item of a panel</p>
<pre><code>before:           after paint(positions, &#39;pink&#39;):
 .  .  .  .  .    .  .  .  .  .
 .  .  .  .  .    .  ■  .  .  .
 .  .  .  .  .  → .  ■  ■  .  .
 .  .  .  .  .    .  ■  .  .  .
 .  .  .  .  .    .  .  .  .  .
</code></pre>
</dd>
<dt><a href="#up">up(panel)</a> ⇒ <code>array</code></dt>
<dd><p>Remove a top row of the panel and append an empty row to the bottom of the panel</p>
<pre><code>before:        after:
 .  .  .  .    ■  ■  .  .
 ■  ■  .  .    .  .  .  .
 .  .  .  .  → .  .  .  .
 .  .  .  .    .  .  .  .
</code></pre>
</dd>
<dt><a href="#down">down(panel)</a> ⇒ <code>array</code></dt>
<dd><p>Remove a bottom row of the panel and append an empty row to the top of the panel</p>
<pre><code>before:        after:
 ■  ■  .  .    .  .  .  .
 .  .  .  .    ■  ■  .  .
 .  .  .  .  → .  .  .  .
 .  .  .  .    .  .  .  .
</code></pre>
</dd>
<dt><a href="#left">left(panel)</a> ⇒ <code>array</code></dt>
<dd><p>Remove a left side of the panel and append an empty column to the right of the panel</p>
<pre><code>before:           after:
 .  ■  .  .  .    ■  .  .  .  .
 .  ■  .  .  .    ■  .  .  .  .
 .  ■  .  .  .  → ■  .  .  .  .
 .  .  .  .  .    .  .  .  .  .
</code></pre>
</dd>
<dt><a href="#right">right(panel)</a> ⇒ <code>array</code></dt>
<dd><p>Remove a right side of the panel and append an empty column to the left of the panel</p>
<pre><code>before:           after:
 ■  .  .  .  .    .  ■  .  .  .
 ■  .  .  .  .    .  ■  .  .  .
 ■  .  .  .  .  → .  ■  .  .  .
 .  .  .  .  .    .  .  .  .  .
</code></pre>
</dd>
<dt><a href="#rotate">rotate(panel)</a> ⇒ <code>array</code></dt>
<dd><p>Rotate some items which have a zeroPoint attribute (90° clockwise around the zeroPoint)</p>
<pre><code>before (● = zeroPoint):    after:
 .  .  ■  .  .              .  .  .  .  .
 .  .  ■  .  .              .  .  .  .  .
 .  .  ●  ■  .            → .  .  ●  ■  ■
 .  .  .  .  .              .  .  ■  .  .
 .  .  .  .  .              .  .  .  .  .
</code></pre>
</dd>
<dt><a href="#overlap">overlap(dPanel, sPanel)</a> ⇒ <code>array</code></dt>
<dd><p>Two panels will be overlap</p>
<pre><code>dPanel:      sPanel:      result:
 ■  ■  .      .  .  .      ■  ■  .
 .  .  .  +   .  .  ■  =   .  .  ■
 .  .  ■      .  ■  .      .  ■  ■
</code></pre>
</dd>
<dt><a href="#add">add(panelAry)</a> ⇒ <code>array</code></dt>
<dd><p>All panels will be overlap. (panelA + panelB + ... = newPanel)</p>
<pre><code>A:           B:           C:           add([A,B,C]):
 ■  .  .      .  ■  .      .  .  ■      ■  ■  ■
 ■  .  .  +   .  ■  .  +   .  .  ■  =   ■  ■  ■
 ■  .  .      .  ■  .      .  .  ■      ■  ■  ■
</code></pre>
</dd>
<dt><a href="#sub">sub(aPanel, bPanel)</a> ⇒ <code>array</code></dt>
<dd><p>Two panels will be &quot;subtracted&quot;. (aPanel - bPanel = newPanel)</p>
<pre><code>aPanel:      bPanel:      result:
 ■  ■  ■      ■  .  .      .  ■  ■
 ■  .  ■  -   .  .  ■  =   ■  .  .
 .  ■  ■      .  ■  .      .  .  ■
</code></pre>
</dd>
<dt><a href="#getTopMargin">getTopMargin(panel)</a> ⇒ <code>number</code></dt>
<dd><p>Return a distance from some items that has a color attribute to the top of the panel</p>
<pre><code>panel:         getTopMargin → 2
 .  .  .  .
 .  .  .  .
 ■  ■  .  .
 .  .  .  .
</code></pre>
</dd>
<dt><a href="#getBottomMargin">getBottomMargin(panel)</a> ⇒ <code>number</code></dt>
<dd><p>Return a distance from some items that has a color attribute to the bottom of the panel</p>
<pre><code>panel:         getBottomMargin → 2
 .  .  .  .
 ■  ■  .  .
 .  .  .  .
 .  .  .  .
</code></pre>
</dd>
<dt><a href="#adjustToTop">adjustToTop(panel)</a> ⇒ <code>array</code></dt>
<dd><p>Move some items that has a color attribute to the top of the panel</p>
<pre><code>before:        after:
 .  .  .  .    ■  ■  .  .
 ■  ■  .  .    .  .  .  .
 .  .  .  .  → .  .  .  .
 .  .  .  .    .  .  .  .
</code></pre>
</dd>
<dt><a href="#adjustToBottom">adjustToBottom(panel)</a> ⇒ <code>array</code></dt>
<dd><p>Move some items that has a color attribute to the bottom of the panel</p>
<pre><code>before:        after:
 ■  ■  .  .    .  .  .  .
 .  .  .  .    .  .  .  .
 .  .  .  .  → .  .  .  .
 .  .  .  .    ■  ■  .  .
</code></pre>
</dd>
<dt><a href="#adjustToCenter">adjustToCenter(panel)</a> ⇒ <code>array</code></dt>
<dd><p>Move some items to the horizontal center of the panel</p>
<pre><code>before:              after:
 ■  ■  .  .  .  .    .  ■  ■  .  .  .
 .  .  .  .  .  .  → .  .  .  .  .  .
 .  .  .  .  .  .    .  .  .  .  .  .
</code></pre>
</dd>
<dt><a href="#adjustToRandomCenter">adjustToRandomCenter(panel)</a> ⇒ <code>array</code></dt>
<dd><p>Move some items to a random horizontal position within the available space</p>
<pre><code>before:              after (one possibility):
 ■  ■  .  .  .  .    .  .  ■  ■  .  .
 .  .  .  .  .  .  → .  .  .  .  .  .
 .  .  .  .  .  .    .  .  .  .  .  .
</code></pre>
</dd>
<dt><a href="#snapshot">snapshot(history, panel)</a> ⇒ <code>array</code></dt>
<dd><p>Append the current panel state to a history array (immutably)</p>
<pre><code>panel (p2):           snapshot(history, panel):
 .  ■  .               history: [p0, p1] → [p0, p1, p2]
 .  ■  .
 .  .  .

Each call returns a new array — the original history is never mutated.
</code></pre>
</dd>
<dt><a href="#rewind">rewind(history, steps)</a> ⇒ <code>array</code></dt>
<dd><p>Retrieve a panel state from N steps ago in the history</p>
<pre><code>history: [ p0,       p1,       p2      ]
           oldest              latest

p0:        p1:        p2 (latest):
 ■  .  .    .  ■  .    .  .  ■
 .  .  .    .  .  .    .  .  .

rewind(history, 0) → p2   (current)
rewind(history, 1) → p1   (1 step ago)
rewind(history, 2) → p0   (2 steps ago)
</code></pre>
</dd>
<dt><a href="#trace">trace(fns)</a> ⇒ <code>function</code></dt>
<dd><p>Apply a pipeline of panel transformations and capture every intermediate state</p>
<pre><code>trace([right, down])(panel):

step 0:      step 1 (right):  step 2 (down):
 ■  .  .      .  ■  .          .  .  .
 .  .  .  →   .  .  .    →     .  ■  .
 .  .  .      .  .  .          .  .  .

→ { panel: step2, history: [step0, step1, step2] }
</code></pre>
<p>Since every fp-panel function is pure, each step produces an independent
snapshot — replaying or rewinding is as simple as indexing into history.</p>
</dd>
<dt><a href="#canRotate">canRotate(bgPanel, toolPanel)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if a tool panel can be rotated without clipping or overlapping the background</p>
<pre><code>bgPanel:     toolPanel:     canRotate → true
 .  .  .      .  ■  .       (rotation stays in bounds and doesn&#39;t hit bg)
 .  .  .      .  ●  .
 .  .  .      .  .  .

bgPanel:     toolPanel:     canRotate → false
 ■  ■  ■      .  ■  .       (rotated piece overlaps bgPanel)
 .  .  .      .  ●  .
 .  .  .      .  .  .
</code></pre>
</dd>
<dt><a href="#removeFullRows">removeFullRows(panel)</a> ⇒ <code>array</code></dt>
<dd><p>Remove all full rows from a panel and pad the top with empty rows</p>
<p>A row is considered full when every cell is filled (no grey cells remain).
The panel height is preserved: for each removed row, one empty row is added at the top.</p>
<pre><code>before (columns=4):      after:
 .  ■  .  .               .  .  .  .   ← new empty row
 ■  ■  ■  ■   (full)  →   .  ■  .  .
 .  ■  .  ■               .  ■  .  ■
</code></pre>
</dd>
</dl>

<a name="createItem"></a>

## createItem(color) ⇒ <code>object</code>
Create an object, which has a color attribute

**Kind**: global function  
**Returns**: <code>object</code> - this object has color attribute  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | The color of item |

**Example**  
```js
createItem('pink');
// return { color: 'pink' }
```
<a name="createZeroItem"></a>

## createZeroItem(color) ⇒ <code>object</code>
Create an object, which has color, zeroPoint attribute

**Kind**: global function  
**Returns**: <code>object</code> - this object has two attributes: color, zeroPoint  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | The color of item |

**Example**  
```js
createZeroItem('pink');
// return { color: 'pink', zeroPoint: true }
```
<a name="createPanel"></a>

## createPanel(rows, columns) ⇒ <code>array</code>
Create a 2D array, which has a default value as { color: 'grey' }

```
createPanel(2, 3):
 .  .  .
 .  .  .
```

**Kind**: global function  
**Returns**: <code>array</code> - 2D array with color initial value  

| Param | Type | Description |
| --- | --- | --- |
| rows | <code>number</code> | rows of new 2D array |
| columns | <code>number</code> | columns of new 2D array |

**Example**  
```js
createPanel(2, 2);
// return [
//   [
//     { color: 'grey' },
//     { color: 'grey' }
//   ],
//   [
//     { color: 'grey' },
//     { color: 'grey' }
//   ]
// ]
```
<a name="isFilled"></a>

## isFilled(cell) ⇒ <code>boolean</code>
Check if a cell color is NOT 'grey' (i.e. the cell is filled)

```
isFilled(■) → true
isFilled(.) → false
```

**Kind**: global function  
**Returns**: <code>boolean</code> - true if a cell color is NOT 'grey', otherwise false  

| Param | Type | Description |
| --- | --- | --- |
| cell | <code>object</code> | a object which has a color attribute |

**Example**  
```js
isFilled({ color: 'grey' });
// return false
isFilled({ color: 'pink' });
// return true
```
<a name="isBlankItem"></a>

## isBlankItem(item) ⇒ <code>boolean</code>
Check if an item color is 'grey'

```
isBlankItem(.) → true
isBlankItem(■) → false
```

**Kind**: global function  
**Returns**: <code>boolean</code> - true if an item color is 'grey', otherwise false  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>object</code> | a object which has a color attribute |

**Example**  
```js
isBlankItem({ color: 'grey' });
// return true
isBlankItem({ color: 'pink' });
// return false
```
<a name="isBlankPanel"></a>

## isBlankPanel(panel) ⇒ <code>boolean</code>
Check if all items color in panel is 'grey'

```
aPanel (all grey) → true:    bPanel (has pink) → false:
 .  .                          .  ■
 .  .                          .  .
```

**Kind**: global function  
**Returns**: <code>boolean</code> - true if all item color is 'grey', otherwise false  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

**Example**  
```js
const aPanel = [
   [
     { color: 'grey' },
     { color: 'grey' }
   ],
   [
     { color: 'grey' },
     { color: 'grey' }
   ]
 ]
isBlankPanel(aPanel);
// return true

const bPanel = [
   [
     { color: 'grey' },
     { color: 'pink' }
   ],
   [
     { color: 'grey' },
     { color: 'grey' }
   ]
 ]
isBlankPanel(bPanel);
// return false
```
<a name="isOverlap"></a>

## isOverlap(aPanel, bPanel) ⇒ <code>boolean</code>
Check if panels were overlapped

```
aPanel:    bPanel:    isOverlap → true
 .  ■       .  ■      (column 1 row 0 collides)
 .  .       .  .

aPanel:    bPanel:    isOverlap → false
 ■  .       .  ■      (no position collides)
 .  .       .  .
```

**Kind**: global function  
**Returns**: <code>boolean</code> - true if two panels were overlapped, otherwise false  

| Param | Type | Description |
| --- | --- | --- |
| aPanel | <code>array</code> | the panel is a 2D array which some items have a color attribute |
| bPanel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

**Example**  
```js
const aPanel = [
   [
     { color: 'grey' },
     { color: 'pink' }
   ],
   [
     { color: 'grey' },
     { color: 'grey' }
   ]
 ]
const bPanel = [
   [
     { color: 'grey' },
     { color: 'pink' }
   ],
   [
     { color: 'grey' },
     { color: 'grey' }
   ]
 ]
isOverlap(aPanel, bPanel);
// return true
```
<a name="isOverlapPanels"></a>

## isOverlapPanels(aPanel, panels) ⇒ <code>boolean</code>
Check if panels were overlapped

```
aPanel:    bPanel1:   bPanel2:   isOverlapPanels(aPanel, [bPanel1, bPanel2]) → false
 .  ■       .  .       .  .      (aPanel does not collide with either panel)
 .  .       .  .       .  ■
```

**Kind**: global function  
**Returns**: <code>boolean</code> - true if aPanel were overlapped with one of the panels, otherwise false  

| Param | Type | Description |
| --- | --- | --- |
| aPanel | <code>array</code> | the panel is a 2D array which some items have a color attribute |
| panels | <code>array</code> | the panel array |

**Example**  
```js
const aPanel = [
   [
     { color: 'grey' },
     { color: 'pink' }
   ],
   [
     { color: 'grey' },
     { color: 'grey' }
   ]
 ]
const bPanel1 = [
   [
     { color: 'grey' },
     { color: 'grey' }
   ],
   [
     { color: 'grey' },
     { color: 'grey' }
   ]
 ]
const bPanel2 = [
   [
     { color: 'grey' },
     { color: 'grey' }
   ],
   [
     { color: 'grey' },
     { color: 'pink' }
   ]
 ]
const panels = [ bPanel1, bPanel2 ];
isOverlapPanels(aPanel, panels);
// return false
```
<a name="isOnTheLeftEdge"></a>

## isOnTheLeftEdge(panel) ⇒ <code>boolean</code>
Check if some color item is on the left edge of a panel

```
→ true:      → false:
 ■  .  .      .  ■  .
 ■  .  .      .  .  .
```

**Kind**: global function  
**Returns**: <code>boolean</code> - true if some item is on the left edge of a panel, otherwise false  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

**Example**  
```js
const panel = [
   [
     { color: 'pink' }
     { color: 'grey' },
   ],
   [
     { color: 'pink' }
     { color: 'grey' },
   ]
 ]
isOnTheLeftEdge(panel)
// return true
```
<a name="isOnTheRightEdge"></a>

## isOnTheRightEdge(panel) ⇒ <code>boolean</code>
Check if some color item is on the right edge of a panel

```
→ true:      → false:
 .  .  ■      .  ■  .
 .  .  ■      .  .  .
```

**Kind**: global function  
**Returns**: <code>boolean</code> - true if some item is on the right edge of a panel, otherwise false  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

**Example**  
```js
const panel = [
   [
     { color: 'grey' },
     { color: 'pink' }
   ],
   [
     { color: 'grey' },
     { color: 'pink' }
   ]
 ]
isOnTheRightEdge(panel)
// return true
```
<a name="isOnTheBottomEdge"></a>

## isOnTheBottomEdge(panel) ⇒ <code>boolean</code>
Check if some color item is on the bottom edge of a panel

```
→ true:      → false:
 .  .  .      .  ■  .
 ■  ■  .      .  .  .
```

**Kind**: global function  
**Returns**: <code>boolean</code> - true if some item is on the bottom edge of a panel, otherwise false  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

**Example**  
```js
const panel = [
   [
     { color: 'grey' },
     { color: 'grey' },
   ],
   [
     { color: 'pink' }
     { color: 'pink' }
   ]
 ]
isOnTheBottomEdge(panel)
// return true
```
<a name="getZeroPoints"></a>

## getZeroPoints(panel) ⇒ <code>array</code>
Collect all item, which zeroPoint attribute is true, from a panel

```
panel (● = zeroPoint):    result:
 .  .  .                   [{ row: 1, column: 1 }]
 .  ●  .
 .  .  .
```

**Kind**: global function  
**Returns**: <code>array</code> - a structure of each array element is { row: x, column: y }  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | Some items of the 2D array has a zeroPoint attribute |

<a name="paint"></a>

## paint(panel, posAry, color) ⇒ <code>array</code>
Change a color attribute of some item of a panel

```
before:           after paint(positions, 'pink'):
 .  .  .  .  .    .  .  .  .  .
 .  .  .  .  .    .  ■  .  .  .
 .  .  .  .  .  → .  ■  ■  .  .
 .  .  .  .  .    .  ■  .  .  .
 .  .  .  .  .    .  .  .  .  .
```

**Kind**: global function  
**Returns**: <code>array</code> - new 2D array  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |
| posAry | <code>array</code> | each items has 'row' and 'column' attribute. |
| color | <code>string</code> | a color string, for example 'pink', 'orange' |

<a name="up"></a>

## up(panel) ⇒ <code>array</code>
Remove a top row of the panel and append an empty row to the bottom of the panel

```
before:        after:
 .  .  .  .    ■  ■  .  .
 ■  ■  .  .    .  .  .  .
 .  .  .  .  → .  .  .  .
 .  .  .  .    .  .  .  .
```

**Kind**: global function  
**Returns**: <code>array</code> - new 2D array  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

<a name="down"></a>

## down(panel) ⇒ <code>array</code>
Remove a bottom row of the panel and append an empty row to the top of the panel

```
before:        after:
 ■  ■  .  .    .  .  .  .
 .  .  .  .    ■  ■  .  .
 .  .  .  .  → .  .  .  .
 .  .  .  .    .  .  .  .
```

**Kind**: global function  
**Returns**: <code>array</code> - new 2D array  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

<a name="left"></a>

## left(panel) ⇒ <code>array</code>
Remove a left side of the panel and append an empty column to the right of the panel

```
before:           after:
 .  ■  .  .  .    ■  .  .  .  .
 .  ■  .  .  .    ■  .  .  .  .
 .  ■  .  .  .  → ■  .  .  .  .
 .  .  .  .  .    .  .  .  .  .
```

**Kind**: global function  
**Returns**: <code>array</code> - new 2D array  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

<a name="right"></a>

## right(panel) ⇒ <code>array</code>
Remove a right side of the panel and append an empty column to the left of the panel

```
before:           after:
 ■  .  .  .  .    .  ■  .  .  .
 ■  .  .  .  .    .  ■  .  .  .
 ■  .  .  .  .  → .  ■  .  .  .
 .  .  .  .  .    .  .  .  .  .
```

**Kind**: global function  
**Returns**: <code>array</code> - new 2D array  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

<a name="rotate"></a>

## rotate(panel) ⇒ <code>array</code>
Rotate some items which have a zeroPoint attribute (90° clockwise around the zeroPoint)

```
before (● = zeroPoint):    after:
 .  .  ■  .  .              .  .  .  .  .
 .  .  ■  .  .              .  .  .  .  .
 .  .  ●  ■  .            → .  .  ●  ■  ■
 .  .  .  .  .              .  .  ■  .  .
 .  .  .  .  .              .  .  .  .  .
```

**Kind**: global function  
**Returns**: <code>array</code> - new 2D array  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

<a name="overlap"></a>

## overlap(dPanel, sPanel) ⇒ <code>array</code>
Two panels will be overlap

```
dPanel:      sPanel:      result:
 ■  ■  .      .  .  .      ■  ■  .
 .  .  .  +   .  .  ■  =   .  .  ■
 .  .  ■      .  ■  .      .  ■  ■
```

**Kind**: global function  
**Returns**: <code>array</code> - new 2D array  

| Param | Type | Description |
| --- | --- | --- |
| dPanel | <code>array</code> | the panel is a 2D array which some items have a color attribute |
| sPanel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

<a name="add"></a>

## add(panelAry) ⇒ <code>array</code>
All panels will be overlap. (panelA + panelB + ... = newPanel)

```
A:           B:           C:           add([A,B,C]):
 ■  .  .      .  ■  .      .  .  ■      ■  ■  ■
 ■  .  .  +   .  ■  .  +   .  .  ■  =   ■  ■  ■
 ■  .  .      .  ■  .      .  .  ■      ■  ■  ■
```

**Kind**: global function  
**Returns**: <code>array</code> - new 2D array  

| Param | Type | Description |
| --- | --- | --- |
| panelAry | <code>array</code> | A array of panel |

<a name="sub"></a>

## sub(aPanel, bPanel) ⇒ <code>array</code>
Two panels will be "subtracted". (aPanel - bPanel = newPanel)

```
aPanel:      bPanel:      result:
 ■  ■  ■      ■  .  .      .  ■  ■
 ■  .  ■  -   .  .  ■  =   ■  .  .
 .  ■  ■      .  ■  .      .  .  ■
```

**Kind**: global function  
**Returns**: <code>array</code> - new 2D array  

| Param | Type | Description |
| --- | --- | --- |
| aPanel | <code>array</code> | the panel is a 2D array which some items have a color attribute |
| bPanel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

<a name="getTopMargin"></a>

## getTopMargin(panel) ⇒ <code>number</code>
Return a distance from some items that has a color attribute to the top of the panel

```
panel:         getTopMargin → 2
 .  .  .  .
 .  .  .  .
 ■  ■  .  .
 .  .  .  .
```

**Kind**: global function  
**Returns**: <code>number</code> - number of blank rows from the top  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

<a name="getBottomMargin"></a>

## getBottomMargin(panel) ⇒ <code>number</code>
Return a distance from some items that has a color attribute to the bottom of the panel

```
panel:         getBottomMargin → 2
 .  .  .  .
 ■  ■  .  .
 .  .  .  .
 .  .  .  .
```

**Kind**: global function  
**Returns**: <code>number</code> - number of blank rows from the bottom  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

<a name="adjustToTop"></a>

## adjustToTop(panel) ⇒ <code>array</code>
Move some items that has a color attribute to the top of the panel

```
before:        after:
 .  .  .  .    ■  ■  .  .
 ■  ■  .  .    .  .  .  .
 .  .  .  .  → .  .  .  .
 .  .  .  .    .  .  .  .
```

**Kind**: global function  
**Returns**: <code>array</code> - new 2D array  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

<a name="adjustToBottom"></a>

## adjustToBottom(panel) ⇒ <code>array</code>
Move some items that has a color attribute to the bottom of the panel

```
before:        after:
 ■  ■  .  .    .  .  .  .
 .  .  .  .    .  .  .  .
 .  .  .  .  → .  .  .  .
 .  .  .  .    ■  ■  .  .
```

**Kind**: global function  
**Returns**: <code>array</code> - new 2D array  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

<a name="adjustToCenter"></a>

## adjustToCenter(panel) ⇒ <code>array</code>
Move some items to the horizontal center of the panel

```
before:              after:
 ■  ■  .  .  .  .    .  ■  ■  .  .  .
 .  .  .  .  .  .  → .  .  .  .  .  .
 .  .  .  .  .  .    .  .  .  .  .  .
```

**Kind**: global function  
**Returns**: <code>array</code> - new 2D array  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

<a name="adjustToRandomCenter"></a>

## adjustToRandomCenter(panel) ⇒ <code>array</code>
Move some items to a random horizontal position within the available space

```
before:              after (one possibility):
 ■  ■  .  .  .  .    .  .  ■  ■  .  .
 .  .  .  .  .  .  → .  .  .  .  .  .
 .  .  .  .  .  .    .  .  .  .  .  .
```

**Kind**: global function  
**Returns**: <code>array</code> - new 2D array  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

<a name="snapshot"></a>

## snapshot(history, panel) ⇒ <code>array</code>
Append the current panel state to a history array (immutably)

```
panel (p2):           snapshot(history, panel):
 .  ■  .               history: [p0, p1] → [p0, p1, p2]
 .  ■  .
 .  .  .

Each call returns a new array — the original history is never mutated.
```

**Kind**: global function  
**Returns**: <code>array</code> - new history array with panel appended  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>array</code> | array of past panel states |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

**Example**  
```js
let history = [];
history = snapshot(history, panel0); // [panel0]
history = snapshot(history, panel1); // [panel0, panel1]
history = snapshot(history, panel2); // [panel0, panel1, panel2]
```
<a name="rewind"></a>

## rewind(history, steps) ⇒ <code>array</code>
Retrieve a panel state from N steps ago in the history

```
history: [ p0,       p1,       p2      ]
           oldest              latest

p0:        p1:        p2 (latest):
 ■  .  .    .  ■  .    .  .  ■
 .  .  .    .  .  .    .  .  .

rewind(history, 0) → p2   (current)
rewind(history, 1) → p1   (1 step ago)
rewind(history, 2) → p0   (2 steps ago)
```

**Kind**: global function  
**Returns**: <code>array</code> - panel state from N steps ago (cloned)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| history | <code>array</code> |  | array of past panel states |
| steps | <code>number</code> | <code>1</code> | number of steps to go back (default: 1) |

**Example**  
```js
rewind(history, 0); // latest panel
rewind(history, 1); // one step ago
rewind(history);    // one step ago (default)
```
<a name="trace"></a>

## trace(fns) ⇒ <code>function</code>
Apply a pipeline of panel transformations and capture every intermediate state

```
trace([right, down])(panel):

step 0:      step 1 (right):  step 2 (down):
 ■  .  .      .  ■  .          .  .  .
 .  .  .  →   .  .  .    →     .  ■  .
 .  .  .      .  .  .          .  .  .

→ { panel: step2, history: [step0, step1, step2] }
```

Since every fp-panel function is pure, each step produces an independent
snapshot — replaying or rewinding is as simple as indexing into history.

**Kind**: global function  
**Returns**: <code>function</code> - a function that takes an initial panel and returns { panel, history }  

| Param | Type | Description |
| --- | --- | --- |
| fns | <code>array</code> | array of panel-transform functions to apply in sequence |

**Example**  
```js
const { panel, history } = trace([right, right, down])(initialPanel);
// panel   — final result after all transforms
// history — [initial, afterRight, afterRight2, afterDown]
rewind(history, 1); // → afterRight2 (one step before final)
```
<a name="canRotate"></a>

## canRotate(bgPanel, toolPanel) ⇒ <code>boolean</code>
Check if a tool panel can be rotated without clipping or overlapping the background

```
bgPanel:     toolPanel:     canRotate → true
 .  .  .      .  ■  .       (rotation stays in bounds and doesn't hit bg)
 .  .  .      .  ●  .
 .  .  .      .  .  .

bgPanel:     toolPanel:     canRotate → false
 ■  ■  ■      .  ■  .       (rotated piece overlaps bgPanel)
 .  .  .      .  ●  .
 .  .  .      .  .  .
```

**Kind**: global function  
**Returns**: <code>boolean</code> - true if the rotation is valid, otherwise false  

| Param | Type | Description |
| --- | --- | --- |
| bgPanel | <code>array</code> | the fixed background panel |
| toolPanel | <code>array</code> | the moving piece panel (must contain a zeroPoint cell) |

<a name="removeFullRows"></a>

## removeFullRows(panel) ⇒ <code>array</code>
Remove all full rows from a panel and pad the top with empty rows

A row is considered full when every cell is filled (no grey cells remain).
The panel height is preserved: for each removed row, one empty row is added at the top.

```
before (columns=4):      after:
 .  ■  .  .               .  .  .  .   ← new empty row
 ■  ■  ■  ■   (full)  →   .  ■  .  .
 .  ■  .  ■               .  ■  .  ■
```

**Kind**: global function  
**Returns**: <code>array</code> - new 2D array with full rows removed and empty rows prepended  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

