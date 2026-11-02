const { runGameContract, REQUIRED_EXPORTS } = require("../testing.js");
const panel = require("../index.js");

// 계약을 만족하는 가장 작은 가짜 게임
const createFakeGame = (name) => {
  const init = (rows = 3, columns = 4) => {
    const opts = typeof rows === "object" ? rows : { rows, columns };
    const clamp = (n, d) => Math.min(500, Math.max(1, Number.isInteger(n) ? n : d));
    const r = clamp(opts.rows, 3);
    const c = clamp(opts.columns, 4);
    return { rows: r, columns: c, paused: false, pause: false };
  };
  return {
    init,
    tick: (state) => ({ ...state }),
    key: (key, state) => (key === "space" ? { ...state, paused: true, pause: true } : state),
    join: (state) => panel.createPanel(state.rows, state.columns),
    toArray: () => [],
    isBlank: (cell) => cell.color === "grey",
    getTickInterval: () => 100,
    serializeState: (state) => ({ game: name, version: 1, state }),
    restoreState: (snapshot) => {
      if (snapshot.game !== name) throw new Error("다른 게임 스냅숏");
      return snapshot.state;
    },
  };
};

describe("runGameContract", () => {
  it("공통 API 목록을 내보낸다", () => {
    expect(REQUIRED_EXPORTS).toContain("serializeState");
  });

  it("name 이 없으면 바로 실패한다", () => {
    expect(() => runGameContract(createFakeGame("x"), {})).toThrow("options.name");
  });

  it("describe 가 없으면 바로 실패한다", () => {
    expect(() => runGameContract(createFakeGame("x"), { name: "x", api: {} })).toThrow("describe");
  });
});

runGameContract(createFakeGame("fp-fake"), { name: "fp-fake" });
