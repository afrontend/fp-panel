const assert = require("assert");
const p = require("../index.js");

describe("panel", () => {
  it("createPanel", () => {
    assert(p.createPanel().length === 0, "createPanel return zero size array");
    assert(p.createPanel(1, 1).length === 1, "createPanel return 1 size array");
    assert(
      p.createPanel(1, 100).length === 1,
      "createPanel should return 1 row panel"
    );
    assert(
      p.createPanel(1, 1)[0].length === 1,
      "createPanel should return 1 column panel"
    );
    assert(
      p.createPanel(100, 1)[0].length === 1,
      "createPanel should return 1 column panel"
    );
    assert(
      p.createPanel(17, 100).length === 17,
      "createPanel should return 17 row panel"
    );
    assert(
      p.createPanel(100, 18)[0].length === 18,
      "createPanel should return 18 column panel"
    );
  });
  it("paint", () => {
    const panel = p.paint(
      p.createPanel(10, 10),
      [
        { row: 0, column: 0 },
        { row: 1, column: 1 },
        { row: 2, column: 2 },
        { row: 3, column: 3 }
      ],
      "red"
    );
    assert(Array.isArray(panel), "should return a array");
    assert(
      panel[0][0].color === "red" &&
        panel[1][1].color === "red" &&
        panel[2][2].color === "red" &&
        panel[3][3].color === "red",
      "should change a color of panel item"
    );
    const panelWithZeroPoint = p.paint(
      p.createPanel(10, 10),
      [
        { row: 0, column: 0 },
        { row: 1, column: 1 },
        { row: 2, column: 2, zeroPoint: true },
        { row: 3, column: 3 }
      ],
      "red"
    );
    assert(
      panelWithZeroPoint[2][2].color === "red" &&
        panelWithZeroPoint[2][2].zeroPoint === true,
      "should change a zeroPoint of panel item"
    );
  });
  it("getZeroPoints", () => {
    const panel = p.paint(
      p.createPanel(10, 10),
      [
        { row: 0, column: 0 },
        { row: 1, column: 1 },
        { row: 2, column: 2, zeroPoint: true },
        { row: 3, column: 3 }
      ],
      "red"
    );
    assert(
      Array.isArray(p.getZeroPoints(panel)),
      "should get a array of zeroPoint"
    );
    assert(
      p.getZeroPoints(panel).length === 1,
      "should check a number of zeroPoint"
    );
  });
});
