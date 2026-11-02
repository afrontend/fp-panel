# Changelog

## [Unreleased]

### Fixed
- `runGameContract` checks `isBlank` with a cell (`{ color }`) instead of the whole state, matching how every game exports it (`isBlankItem`).

## [0.1.6] - 2026-11-02

### Added
- `fp-panel/testing` — `runGameContract(game, options)` registers the shared game API contract tests for fp-* game libraries.
- `exports` map: `fp-panel`, `fp-panel/testing`, `fp-panel/lib/*`, `fp-panel/package.json`.

### Changed
- Tests run on Vitest 5 instead of Jest; `lib/__tests__` is no longer published.

## [0.1.0] - 2026-04-22

### Added
- `isFilled(cell)` — replaces `isItem`. Returns `true` if a cell's color is not `'grey'`.

### Deprecated
- `isItem` — use `isFilled` instead. Calling `isItem` now emits a Node.js `DeprecationWarning` at runtime (`DEP_IS_ITEM`). The function remains fully functional and will be removed in a future major version.

## [0.0.9] - previous
