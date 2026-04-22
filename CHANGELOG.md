# Changelog

## [0.1.0] - 2026-04-22

### Added
- `isFilled(cell)` — replaces `isItem`. Returns `true` if a cell's color is not `'grey'`.

### Deprecated
- `isItem` — use `isFilled` instead. Calling `isItem` now emits a Node.js `DeprecationWarning` at runtime (`DEP_IS_ITEM`). The function remains fully functional and will be removed in a future major version.

## [0.0.9] - previous
