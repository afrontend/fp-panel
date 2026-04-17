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
</dd>
<dt><a href="#isItem">isItem(item)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if an item color is NOT &#39;grey&#39;</p>
</dd>
<dt><a href="#isBlankItem">isBlankItem(item)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if an item color is &#39;grey&#39;</p>
</dd>
<dt><a href="#isBlankPanel">isBlankPanel(panel)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if all items color in panel is &#39;grey&#39;</p>
</dd>
<dt><a href="#isOverlap">isOverlap(aPanel, bPanel)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if panels were overlapped</p>
</dd>
<dt><a href="#isOverlapPanels">isOverlapPanels(aPanel, panels)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if panels were overlapped</p>
</dd>
<dt><a href="#isOnTheLeftEdge">isOnTheLeftEdge(panel)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if some color item is on the left edge of a panel</p>
</dd>
<dt><a href="#isOnTheRightEdge">isOnTheRightEdge(panel)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if some color item is on the right edge of a panel</p>
</dd>
<dt><a href="#isOnTheBottomEdge">isOnTheBottomEdge(panel)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if some color item is on the bottom edge of a panel</p>
</dd>
<dt><a href="#getZeroPoints">getZeroPoints(panel)</a> ⇒ <code>array</code></dt>
<dd><p>Collect all item, which zeroPoint attribute is true, from a panel</p>
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
</dd>
<dt><a href="#getBottomMargin">getBottomMargin(panel)</a> ⇒ <code>number</code></dt>
<dd><p>Return a distance from some items that has a color attribute to the bottom of the panel</p>
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
<a name="isItem"></a>

## isItem(item) ⇒ <code>boolean</code>
Check if an item color is NOT 'grey'

**Kind**: global function  
**Returns**: <code>boolean</code> - true if an item color is NOT 'grey', otherwise false  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>object</code> | a object which has a color attribute |

**Example**  
```js
isItem({ color: 'grey' });
// return false
isItem({ color: 'pink' });
// return true
```
<a name="isBlankItem"></a>

## isBlankItem(item) ⇒ <code>boolean</code>
Check if an item color is 'grey'

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

**Kind**: global function  
**Returns**: <code>number</code> - number of blank rows from the top  

| Param | Type | Description |
| --- | --- | --- |
| panel | <code>array</code> | the panel is a 2D array which some items have a color attribute |

<a name="getBottomMargin"></a>

## getBottomMargin(panel) ⇒ <code>number</code>
Return a distance from some items that has a color attribute to the bottom of the panel

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

