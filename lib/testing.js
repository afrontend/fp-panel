/**
 * Shared contract tests for fp-* game libraries.
 *
 * Usage (vitest with `globals: true`, or jest):
 *
 *   const { runGameContract } = require("fp-panel/testing");
 *   runGameContract(require("../index.js"), { name: "fp-tetris", pauseKey: "p" });
 *
 * It uses the global `describe` / `it` / `expect` unless they are passed in `options.api`.
 */

const REQUIRED_EXPORTS = [
  "init",
  "tick",
  "key",
  "join",
  "toArray",
  "isBlank",
  "getTickInterval",
  "serializeState",
  "restoreState",
];

const OTHER_GAME_SNAPSHOT = { game: "fp-other-game", version: 1, state: {} };

/**
 * Register the common game API contract as a test suite
 * @param {object} game The game library module (`require("../index.js")`)
 * @param {object} options
 * @param {string} options.name Package name written to snapshots, e.g. 'fp-tetris'
 * @param {string} [options.pauseKey='space'] Key name that toggles pause
 * @param {boolean} [options.sizedInit=true] Whether `init` accepts rows/columns (false when the size comes from a level map)
 * @param {boolean} [options.turnBased=false] Whether `getTickInterval` returns null
 * @param {function} [options.createState] Factory for the initial state (default `game.init()`)
 * @param {object} [options.api] `{ describe, it, expect }`, default the test runner globals
 * @example
 * runGameContract(game, { name: 'fp-sokoban', sizedInit: false, turnBased: true });
 */
const runGameContract = (game, options = {}) => {
  const {
    name,
    pauseKey = "space",
    sizedInit = true,
    turnBased = false,
    createState = () => game.init(),
    api = globalThis,
  } = options;
  const { describe, it, expect } = api;

  if (!name) throw new Error("runGameContract: options.name 이 필요합니다");
  if (typeof describe !== "function") {
    throw new Error("runGameContract: describe/it/expect 전역이 없습니다 (vitest globals: true 또는 options.api)");
  }

  describe(`${name} 공통 게임 계약`, () => {
    it("공통 API 를 함수로 내보낸다", () => {
      const missing = REQUIRED_EXPORTS.filter((fn) => typeof game[fn] !== "function");
      expect(missing).toEqual([]);
    });

    it("init 은 rows/columns 를 가진 상태를 돌려준다", () => {
      const state = createState();
      expect(Number.isInteger(state.rows)).toBe(true);
      expect(Number.isInteger(state.columns)).toBe(true);
    });

    if (sizedInit) {
      it("객체와 위치 인자 초기화를 모두 지원한다", () => {
        const byObject = game.init({ rows: 6, columns: 7 });
        const byArgs = game.init(6, 7);
        expect([byObject.rows, byObject.columns]).toEqual([6, 7]);
        expect([byArgs.rows, byArgs.columns]).toEqual([6, 7]);
      });

      it("크기를 1~500 범위로 보정한다", () => {
        const state = game.init({ rows: 0, columns: 999 });
        expect([state.rows, state.columns]).toEqual([1, 500]);
      });
    }

    it("join 결과는 rows×columns 패널이다", () => {
      const state = createState();
      const panel = game.join(state);
      expect(panel).toHaveLength(state.rows);
      panel.forEach((row) => expect(row).toHaveLength(state.columns));
    });

    it("일시정지 키는 paused 와 deprecated pause 를 함께 갱신한다", () => {
      const paused = game.key(pauseKey, createState());
      expect(paused.paused).toBe(true);
      expect(paused.pause).toBe(true);
    });

    it("tick 은 상태 객체를 돌려준다", () => {
      const next = game.tick(createState());
      expect(typeof next).toBe("object");
      expect(next).not.toBeNull();
    });

    it("렌더링 도우미 toArray / isBlank 의 반환 형식", () => {
      const state = createState();
      expect(Array.isArray(game.toArray(state))).toBe(true);
      expect(typeof game.isBlank(state)).toBe("boolean");
    });

    it(turnBased ? "턴제 게임은 tick 주기가 null 이다" : "tick 주기는 양수(ms)다", () => {
      const interval = game.getTickInterval(createState());
      if (turnBased) {
        expect(interval).toBeNull();
      } else {
        expect(interval).toBeGreaterThan(0);
      }
    });

    it("스냅숏은 JSON 왕복 후 같은 화면으로 복원된다", () => {
      const state = createState();
      const snapshot = JSON.parse(JSON.stringify(game.serializeState(state)));
      expect(snapshot.game).toBe(name);
      expect(snapshot.version).toBe(1);
      expect(game.join(game.restoreState(snapshot))).toEqual(game.join(state));
    });

    it("다른 게임 스냅숏을 거부한다", () => {
      expect(() => game.restoreState(OTHER_GAME_SNAPSHOT)).toThrow();
    });
  });
};

module.exports = { runGameContract, REQUIRED_EXPORTS };
