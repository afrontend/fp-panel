const assert = require("assert");
const p = require("../index.js");

describe("panel", () => {
  it("createPanel should return 2 dim array ", () => {
    assert(p.createPanel().length === 0, "createPanel return zero size array");
    assert(p.createPanel(1, 1).length === 1, "createPanel return 1 size array");
    assert(
      p.createPanel(1, 100).length === 1,
      "createPanel return 1 size array"
    );
    assert(
      p.createPanel(1, 1)[0].length === 1,
      "createPanel return 1 size array"
    );
    assert(
      p.createPanel(100, 1)[0].length === 1,
      "createPanel return 1 size array"
    );
    assert(
      p.createPanel(17, 100).length === 17,
      "createPanel return 1 size array"
    );
    assert(
      p.createPanel(100, 18)[0].length === 18,
      "createPanel return 1 size array"
    );
  });
  it("paint", () => {
    const paintPanel = p.paint(
      p.createPanel(10, 10),
      [{ row: 0, column: 0 }],
      "red"
    );
    assert(
      paintPanel[0][0].color === "red",
      "shound change color of panel item"
    );
  });
});
