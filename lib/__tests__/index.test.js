const assert = require("assert");
const p = require("../index.js");
const _ = require("lodash");

describe("panel", () => {
  describe("create item and panel", () => {
    it("createItem", () => {
      assert.deepEqual(
        p.createItem("red"),
        { color: "red" },
        "createItem return color item"
      );
    });
    it("createZeroItem", () => {
      assert.deepEqual(
        p.createZeroItem("red"),
        { color: "red", zeroPoint: true },
        "createZeroItem return color item with zeroPoint"
      );
    });
    it("createPanel", () => {
      assert(
        p.createPanel().length === 0,
        "createPanel return zero size array"
      );
      assert(
        p.createPanel(1, 1).length === 1,
        "createPanel return 1 size array"
      );
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
  });

  describe("check item and panel", () => {
    it("isBlankItem", () => {
      assert(
        p.isBlankItem({ color: "grey" }),
        "should be a blank item (color is grey)"
      );
      assert(p.isBlankItem(null), "should be a blank item, if null");
    });
    it("isBlankPanel", () => {
      const pa = p.createItem;
      const aPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      assert(p.isBlankPanel(aPanel), "should be a blank panel (color is grey)");
    });
    it("isOverlap", () => {
      const pa = p.createItem;
      const aPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("red"), pa("red"), pa("red"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      const bPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("red"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("red"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("red"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      assert(p.isOverlap(aPanel, bPanel), "should be overlap with panels");
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

  describe("draw in panel", () => {
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
  });

  describe("change panel", () => {
    it("up", () => {
      const panel = p.paint(
        p.createPanel(10, 10),
        [
          { row: 1, column: 0 },
          { row: 1, column: 1 },
          { row: 1, column: 2 },
          { row: 1, column: 3 },
          { row: 1, column: 4 },
          { row: 1, column: 5 },
          { row: 1, column: 6 },
          { row: 1, column: 7 },
          { row: 1, column: 8 },
          { row: 1, column: 9 }
        ],
        "red"
      );
      assert(
        _.every(_.first(p.up(panel)), item => item.color === "red"),
        "should remove a top edge of panel"
      );
    });
    it("down", () => {
      const panel = p.paint(
        p.createPanel(10, 10),
        [
          { row: 8, column: 0 },
          { row: 8, column: 1 },
          { row: 8, column: 2 },
          { row: 8, column: 3 },
          { row: 8, column: 4 },
          { row: 8, column: 5 },
          { row: 8, column: 6 },
          { row: 8, column: 7 },
          { row: 8, column: 8 },
          { row: 8, column: 9 }
        ],
        "red"
      );
      assert(
        _.every(_.last(p.down(panel)), item => item.color === "red"),
        "should remove a bottom edge of panel"
      );
    });
    it("left", () => {
      const panel = p.paint(
        p.createPanel(10, 10),
        [
          { row: 0, column: 1 },
          { row: 1, column: 1 },
          { row: 2, column: 1 },
          { row: 3, column: 1 },
          { row: 4, column: 1 },
          { row: 5, column: 1 },
          { row: 6, column: 1 },
          { row: 7, column: 1 },
          { row: 8, column: 1 },
          { row: 9, column: 1 }
        ],
        "red"
      );
      assert(
        _.every(p.left(panel), item => _.first(item).color === "red"),
        "should remove a left edge of panel"
      );
    });
    it("right", () => {
      const panel = p.paint(
        p.createPanel(10, 10),
        [
          { row: 0, column: 8 },
          { row: 1, column: 8 },
          { row: 2, column: 8 },
          { row: 3, column: 8 },
          { row: 4, column: 8 },
          { row: 5, column: 8 },
          { row: 6, column: 8 },
          { row: 7, column: 8 },
          { row: 8, column: 8 },
          { row: 9, column: 8 }
        ],
        "red"
      );
      assert(
        _.every(p.right(panel), item => _.last(item).color === "red"),
        "should remove a right edge of panel"
      );
    });
    it("rotate", () => {
      const pa = p.createItem;
      const ze = p.createZeroItem;
      const aPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("red"), pa("grey")],
        [pa("grey"), pa("red"), pa("grey"), pa("red"), pa("grey")],
        [pa("red"), pa("red"), ze("red"), pa("red"), pa("red")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      const bPanel = [
        [pa("grey"), pa("grey"), pa("red"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("red"), pa("red"), pa("grey")],
        [pa("grey"), pa("grey"), ze("red"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("red"), pa("red"), pa("red")],
        [pa("grey"), pa("grey"), pa("red"), pa("grey"), pa("grey")]
      ];
      assert.deepEqual(
        p.rotate(aPanel),
        bPanel,
        "should rotate color items of panel"
      );
    });
    it("overlap", () => {
      const pa = p.createItem;
      const ze = p.createZeroItem;
      const aPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("red"), pa("grey")],
        [pa("grey"), pa("red"), pa("grey"), pa("red"), pa("grey")],
        [pa("red"), pa("red"), ze("red"), pa("red"), pa("red")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      const bPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("red"), pa("red"), pa("red")],
        [pa("grey"), pa("grey"), pa("grey"), ze("red"), pa("grey")],
        [pa("grey"), pa("grey"), pa("red"), pa("red"), pa("red")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      const cPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("red"), pa("grey")],
        [pa("grey"), pa("red"), pa("red"), pa("red"), pa("red")],
        [pa("red"), pa("red"), ze("red"), ze("red"), pa("red")],
        [pa("grey"), pa("grey"), pa("red"), pa("red"), pa("red")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      assert.deepEqual(
        p.overlap(aPanel, bPanel),
        cPanel,
        "should overlap a panel to another panel"
      );
    });
    it("add", () => {
      const pa = p.createItem;
      const aPanel = [
        [pa("red"), pa("grey"), pa("grey"), pa("grey"), pa("red")],
        [pa("red"), pa("red"), pa("grey"), pa("grey"), pa("red")],
        [pa("red"), pa("grey"), pa("red"), pa("grey"), pa("red")],
        [pa("red"), pa("grey"), pa("grey"), pa("red"), pa("red")],
        [pa("red"), pa("grey"), pa("grey"), pa("grey"), pa("red")]
      ];
      const bPanel = [
        [pa("grey"), pa("red"), pa("grey"), pa("red"), pa("grey")],
        [pa("grey"), pa("red"), pa("red"), pa("red"), pa("grey")],
        [pa("grey"), pa("red"), pa("grey"), pa("red"), pa("grey")],
        [pa("grey"), pa("red"), pa("red"), pa("red"), pa("grey")],
        [pa("grey"), pa("red"), pa("grey"), pa("red"), pa("grey")]
      ];
      const cPanel = [
        [pa("grey"), pa("grey"), pa("red"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("red"), pa("grey"), pa("grey")],
        [pa("red"), pa("red"), pa("red"), pa("red"), pa("red")],
        [pa("grey"), pa("grey"), pa("red"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("red"), pa("grey"), pa("grey")]
      ];
      const dPanel = [
        [pa("red"), pa("red"), pa("red"), pa("red"), pa("red")],
        [pa("red"), pa("red"), pa("red"), pa("red"), pa("red")],
        [pa("red"), pa("red"), pa("red"), pa("red"), pa("red")],
        [pa("red"), pa("red"), pa("red"), pa("red"), pa("red")],
        [pa("red"), pa("red"), pa("red"), pa("red"), pa("red")]
      ];
      assert.deepEqual(
        p.add([aPanel, bPanel, cPanel]),
        dPanel,
        "should make a union panel"
      );
    });
    it("sub", () => {
      const pa = p.createItem;
      const aPanel = [
        [pa("red"), pa("grey"), pa("grey"), pa("grey"), pa("red")],
        [pa("red"), pa("red"), pa("grey"), pa("grey"), pa("red")],
        [pa("red"), pa("grey"), pa("red"), pa("grey"), pa("red")],
        [pa("red"), pa("grey"), pa("grey"), pa("red"), pa("red")],
        [pa("red"), pa("grey"), pa("grey"), pa("grey"), pa("red")]
      ];
      const bPanel = [
        [pa("grey"), pa("red"), pa("grey"), pa("red"), pa("grey")],
        [pa("grey"), pa("red"), pa("red"), pa("red"), pa("grey")],
        [pa("grey"), pa("red"), pa("grey"), pa("red"), pa("grey")],
        [pa("grey"), pa("red"), pa("red"), pa("red"), pa("grey")],
        [pa("grey"), pa("red"), pa("grey"), pa("red"), pa("grey")]
      ];
      const cPanel = [
        [pa("red"), pa("grey"), pa("grey"), pa("grey"), pa("red")],
        [pa("red"), pa("grey"), pa("grey"), pa("grey"), pa("red")],
        [pa("red"), pa("grey"), pa("red"), pa("grey"), pa("red")],
        [pa("red"), pa("grey"), pa("grey"), pa("grey"), pa("red")],
        [pa("red"), pa("grey"), pa("grey"), pa("grey"), pa("red")]
      ];
      assert.deepEqual(
        p.sub(aPanel, bPanel),
        cPanel,
        "should make a relative complement of B in A"
      );
    });
    it("adjustToBottom", () => {
      const pa = p.createItem;
      const aPanel = [
        [pa("grey"), pa("red"), pa("grey"), pa("grey"), pa("grey")],
        [pa("red"), pa("red"), pa("red"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      const bPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("red"), pa("grey"), pa("grey"), pa("grey")],
        [pa("red"), pa("red"), pa("red"), pa("grey"), pa("grey")]
      ];
      assert.deepEqual(
        p.adjustToBottom(aPanel),
        bPanel,
        "should move items to bottom of panel"
      );
    });
    it("adjustToCenter", () => {
      const pa = p.createItem;
      const aPanel = [
        [pa("grey"), pa("red"), pa("grey"), pa("grey"), pa("grey")],
        [pa("red"), pa("red"), pa("red"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      const bPanel = [
        [pa("grey"), pa("grey"), pa("red"), pa("grey"), pa("grey")],
        [pa("grey"), pa("red"), pa("red"), pa("red"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      assert.deepEqual(
        p.adjustToCenter(aPanel),
        bPanel,
        "should move items to center of panel"
      );
    });
  });
});
