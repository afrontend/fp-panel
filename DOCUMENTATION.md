# [fp-panel](https://github.com/afrontend) *0.0.5*

> library for fp-block


### lib/index.js


#### createItem(color) 

Create an object, which has a color attribute




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| color | `string`  | The color of item | &nbsp; |




##### Examples

```javascript
createItem('pink');
// return { color: 'pink' }
```


##### Returns


- `object`  this object has color attribute



#### createZeroItem(color) 

Create an object, which has color, zeroPoint attribute




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| color | `string`  | The color of item | &nbsp; |




##### Examples

```javascript
createZeroItem('pink');
// return { color: 'pink', zeroPoint: true }
```


##### Returns


- `object`  this object has two attributes: color, zeroPoint



#### createPanel(rows, columns) 

Create a 2D array, which has a default value as { color: 'grey' }




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| rows | `number`  | rows of new 2D array | &nbsp; |
| columns | `number`  | columns of new 2D array | &nbsp; |




##### Examples

```javascript
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


##### Returns


- `array`  2D array with color initial value



#### isItem(item) 

Check if an item color is NOT 'grey'




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| item | `object`  | a object which has a color attribute | &nbsp; |




##### Examples

```javascript
isItem({ color: 'grey' });
// return false
isItem({ color: 'pink' });
// return true
```


##### Returns


- `boolean`  true if an item color is NOT 'grey', otherwise false



#### isBlankItem(item) 

Check if an item color is 'grey'




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| item | `object`  | a object which has a color attribute | &nbsp; |




##### Examples

```javascript
isBlankItem({ color: 'grey' });
// return true
isBlankItem({ color: 'pink' });
// return false
```


##### Returns


- `boolean`  true if an item color is 'grey', otherwise false



#### isBlankPanel(panel) 

Check if all items color in panel is 'grey'




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| panel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |




##### Examples

```javascript
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


##### Returns


- `boolean`  true if all item color is 'grey', otherwise false



#### isOverlap(aPanel, bPanel) 

Check if panels were overlapped




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| aPanel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |
| bPanel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |




##### Examples

```javascript
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


##### Returns


- `boolean`  true if two panels were overlapped, otherwise false



#### isOnTheLeftEdge(panel) 

Check if some color item is on the left edge of a panel




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| panel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |




##### Examples

```javascript
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


##### Returns


- `boolean`  true if some item is on the left edge of a panel, otherwise false



#### isOnTheRightEdge(panel) 

Check if some color item is on the right edge of a panel




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| panel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |




##### Examples

```javascript
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


##### Returns


- `boolean`  true if some item is on the right edge of a panel, otherwise false



#### isOnTheBottomEdge(panel) 

Check if some color item is on the bottom edge of a panel




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| panel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |




##### Examples

```javascript
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


##### Returns


- `boolean`  true if some item is on the bottom edge of a panel, otherwise false



#### getZeroPoints(panel) 

Collect all item, which zeroPoint attribute is true, from a panel




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| panel | `array`  | Some items of the 2D array has a zeroPoint attribute | &nbsp; |




##### Returns


- `array`  a structure of each array element is { row: x, column: y }



#### paint(panel, posAry, color) 

Change a color attribute of some item of a panel




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| panel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |
| posAry | `array`  | each items has 'row' and 'column' attribute. | &nbsp; |
| color | `string`  | a color string, for example 'pink', 'orange' | &nbsp; |




##### Returns


- `array`  new 2D array



#### up(panel) 

Remove a top row of the panel and append an empty row to the bottom of the panel




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| panel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |




##### Returns


- `array`  new 2D array



#### down(panel) 

Remove a bottom row of the panel and append an empty row to the top of the panel




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| panel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |




##### Returns


- `array`  new 2D array



#### left(panel) 

Remove a left side of the panel and append an empty column to the right of the panel




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| panel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |




##### Returns


- `array`  new 2D array



#### right(panel) 

Remove a right side of the panel and append an empty column to the left of the panel




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| panel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |




##### Returns


- `array`  new 2D array



#### rotate(panel) 

Rotate some items which have a zeroPoint attribute




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| panel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |




##### Returns


- `array`  new 2D array



#### overlap(dPanel, sPanel) 

Two panels will be overlap




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| dPanel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |
| sPanel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |




##### Returns


- `array`  new 2D array



#### add(panelAry) 

All panels will be overlap. (panelA + panelB + ... = newPanel)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| panelAry | `array`  | A array of panel | &nbsp; |




##### Returns


- `array`  new 2D array



#### sub(aPanel, bPanel) 

Two panels will be "subtracted". (aPanel - bPanel = newPanel)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| aPanel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |
| bPanel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |




##### Returns


- `array`  new 2D array



#### getTopMargin(panel) 

Return a distance from some tiems that has a color attribute to the top of the panel




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| panel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |




##### Returns


- `array`  new 2D array



#### getBottomMargin(panel) 

Return a distance from some tiems that has a color attribute to the bottom of the panel




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| panel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |




##### Returns


- `array`  new 2D array



#### adjustToTop(panel) 

Move some items that has a color attribute to the top of the panel




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| panel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |




##### Returns


- `array`  new 2D array



#### adjustToBottom(panel) 

Move some items that has a color attribute to the bottom of the panel




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| panel | `array`  | the panel is a 2D array which some items have a color attribute | &nbsp; |




##### Returns


- `array`  new 2D array




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
