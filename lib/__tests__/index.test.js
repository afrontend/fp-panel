const assert = require("assert");
const p = require("../index.js");
const _ = require("lodash");

describe("panel", () => {
  describe("create item and panel", () => {
    it("createItem", () => {
      assert.deepEqual(
        p.createItem("pink"),
        { color: "pink" },
        "createItem return color item"
      );
    });
    it("createZeroItem", () => {
      assert.deepEqual(
        p.createZeroItem("pink"),
        { color: "pink", zeroPoint: true },
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
    it("isFilled", () => {
      assert(
        p.isFilled({ color: "pink" }) === true,
        "should return a true if not grey color "
      );
      assert(
        p.isFilled({ color: "grey" }) === false,
        "should return a false if grey color "
      );
    });
    it("isItem (deprecated)", () => {
      const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

      assert(
        p.isItem({ color: "pink" }) === true,
        "should return true for filled item (same as isFilled)"
      );
      assert(
        p.isItem({ color: "grey" }) === false,
        "should return false for blank item (same as isFilled)"
      );
      assert(
        warnSpy.mock.calls.length === 1,
        "should emit deprecation warning"
      );
      assert(
        warnSpy.mock.calls[0][0].includes("isItem"),
        "warning should mention isItem"
      );

      // warnOnce: second call must not emit another warning
      p.isItem({ color: "pink" });
      assert(
        warnSpy.mock.calls.length === 1,
        "should not repeat the deprecation warning"
      );

      warnSpy.mockRestore();
    });
    it("isBlankItem", () => {
      assert(
        p.isBlankItem({ color: "grey" }) === true,
        "should return a true if grey color "
      );
      assert(p.isBlankItem(null) === true, "should return a true if null ");
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
      assert(p.isBlankPanel(aPanel), "should be a blank panel (grey color)");

      const bPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("pink"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      assert(p.isBlankPanel(bPanel) === false, "should not be a blank panel when colored item exists");
    });
    it("isOverlap", () => {
      const pa = p.createItem;
      const a1 = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("pink"), pa("pink"), pa("pink"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      const b1 = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("pink"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("pink"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("pink"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      assert(p.isOverlap(a1, b1) === true, "should be overlap with panels");

      const a2 = [[pa("grey")]];
      const b2 = [[pa("pink")]];
      assert(p.isOverlap(a2, b2) === false, "should be overlap with panels");
    });
    it("isOverlap with multiple array", () => {
      const pa = p.createItem;
      const a1 = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("pink"), pa("pink"), pa("pink"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      const b1 = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("pink"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("pink"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("pink"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      const b2 = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("pink"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("pink"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("pink"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      const b3 = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("pink"), pa("pink"), pa("pink")]
      ];
      assert(
        p.isOverlapPanels(a1, [b1, b2, b3]) === true,
        "should be overlap with panels"
      );
    });
    it("isOnTheLeftEdge", () => {
      const pa = p.createItem;
      const aPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("pink"), pa("pink"), pa("pink"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      assert(
        p.isOnTheLeftEdge(aPanel) === true,
        "should return true if some items is on the left edge of the panel"
      );
      const bPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("pink"), pa("pink"), pa("pink"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      assert(
        p.isOnTheLeftEdge(bPanel) === false,
        "should return false if any item is not on the left edge of the panel"
      );
    });
    it("isOnTheRightEdge", () => {
      const pa = p.createItem;
      const aPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("pink"), pa("pink"), pa("pink"), pa("pink"), pa("pink")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      assert(
        p.isOnTheRightEdge(aPanel) === true,
        "should return true if some items is on the right edge of the panel"
      );
      const bPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("pink"), pa("pink"), pa("pink"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      assert(
        p.isOnTheRightEdge(bPanel) === false,
        "should return false if any item is not on the right edge of the panel"
      );
    });
    it("isOnTheBottomEdge", () => {
      const pa = p.createItem;
      const aPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("pink"), pa("pink"), pa("pink"), pa("pink"), pa("pink")],
        [pa("grey"), pa("grey"), pa("pink"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("pink"), pa("grey"), pa("grey")]
      ];
      assert(
        p.isOnTheBottomEdge(aPanel) === true,
        "should return true if some items is on the bottom edge of the panel"
      );
      const bPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("pink"), pa("pink"), pa("pink"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      assert(
        p.isOnTheBottomEdge(bPanel) === false,
        "should return false if any item is not on the bottom edge of the panel"
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
        "pink"
      );
      assert(
        Array.isArray(p.getZeroPoints(panel)),
        "should get a array of zeroPoint"
      );
      assert(
        p.getZeroPoints(panel).length === 1,
        "should check a number of zeroPoint"
      );

      const blankPanel = p.createPanel(5, 5);
      assert.deepEqual(
        p.getZeroPoints(blankPanel),
        [],
        "should return empty array when no zeroPoints exist"
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
        "pink"
      );
      assert(Array.isArray(panel), "should return a array");
      assert(
        panel[0][0].color === "pink" &&
          panel[1][1].color === "pink" &&
          panel[2][2].color === "pink" &&
          panel[3][3].color === "pink",
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
        "pink"
      );
      assert(
        panelWithZeroPoint[2][2].color === "pink" &&
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
        "pink"
      );
      assert(
        _.every(_.first(p.up(panel)), item => item.color === "pink"),
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
        "pink"
      );
      assert(
        _.every(_.last(p.down(panel)), item => item.color === "pink"),
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
        "pink"
      );
      assert(
        _.every(p.left(panel), item => _.first(item).color === "pink"),
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
        "pink"
      );
      assert(
        _.every(p.right(panel), item => _.last(item).color === "pink"),
        "should remove a right edge of panel"
      );
    });
    it("rotate", () => {
      const pa = p.createItem;
      const ze = p.createZeroItem;
      const aPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("pink"), pa("grey")],
        [pa("grey"), pa("pink"), pa("grey"), pa("pink"), pa("grey")],
        [pa("pink"), pa("pink"), ze("pink"), pa("pink"), pa("pink")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      const bPanel = [
        [pa("grey"), pa("grey"), pa("pink"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("pink"), pa("pink"), pa("grey")],
        [pa("grey"), pa("grey"), ze("pink"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("pink"), pa("pink"), pa("pink")],
        [pa("grey"), pa("grey"), pa("pink"), pa("grey"), pa("grey")]
      ];
      assert.deepEqual(
        p.rotate(aPanel),
        bPanel,
        "should rotate color items of panel"
      );

      // single zeroPoint: rotates around a 5x5 region centered on the zeroPoint
      const singleZero = p.paint(
        p.createPanel(7, 7),
        [{ row: 3, column: 3, zeroPoint: true }],
        "pink"
      );
      const rotated = p.rotate(singleZero);
      assert(
        rotated[3][3].zeroPoint === true,
        "zeroPoint item should remain after rotation with single zeroPoint"
      );
      assert(
        rotated[3][3].color === "pink",
        "zeroPoint item should keep its color after rotation"
      );

      // no zeroPoint: rotates region (0,0)-(0,0), panel should be unchanged
      const noZero = p.paint(
        p.createPanel(5, 5),
        [{ row: 2, column: 2 }],
        "pink"
      );
      assert.deepEqual(
        p.rotate(noZero),
        noZero,
        "should return equivalent panel when no zeroPoints exist"
      );

      // rotateRegion out-of-bounds: single zeroPoint near edge so rotation area exceeds panel boundary
      const edgeZero = p.paint(
        p.createPanel(5, 5),
        [{ row: 0, column: 0, zeroPoint: true }],
        "pink"
      );
      const edgeRotated = p.rotate(edgeZero);
      assert(
        Array.isArray(edgeRotated),
        "should return a valid panel when rotation area exceeds panel boundary"
      );
    });
    it("overlap", () => {
      const pa = p.createItem;
      const ze = p.createZeroItem;
      const aPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("pink"), pa("grey")],
        [pa("grey"), pa("pink"), pa("grey"), pa("pink"), pa("grey")],
        [pa("pink"), pa("pink"), ze("pink"), pa("pink"), pa("pink")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      const bPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("pink"), pa("pink"), pa("pink")],
        [pa("grey"), pa("grey"), pa("grey"), ze("pink"), pa("grey")],
        [pa("grey"), pa("grey"), pa("pink"), pa("pink"), pa("pink")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      const cPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("pink"), pa("grey")],
        [pa("grey"), pa("pink"), pa("pink"), pa("pink"), pa("pink")],
        [pa("pink"), pa("pink"), ze("pink"), ze("pink"), pa("pink")],
        [pa("grey"), pa("grey"), pa("pink"), pa("pink"), pa("pink")],
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
        [pa("pink"), pa("grey"), pa("grey"), pa("grey"), pa("pink")],
        [pa("pink"), pa("pink"), pa("grey"), pa("grey"), pa("pink")],
        [pa("pink"), pa("grey"), pa("pink"), pa("grey"), pa("pink")],
        [pa("pink"), pa("grey"), pa("grey"), pa("pink"), pa("pink")],
        [pa("pink"), pa("grey"), pa("grey"), pa("grey"), pa("pink")]
      ];
      const bPanel = [
        [pa("grey"), pa("pink"), pa("grey"), pa("pink"), pa("grey")],
        [pa("grey"), pa("pink"), pa("pink"), pa("pink"), pa("grey")],
        [pa("grey"), pa("pink"), pa("grey"), pa("pink"), pa("grey")],
        [pa("grey"), pa("pink"), pa("pink"), pa("pink"), pa("grey")],
        [pa("grey"), pa("pink"), pa("grey"), pa("pink"), pa("grey")]
      ];
      const cPanel = [
        [pa("grey"), pa("grey"), pa("pink"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("pink"), pa("grey"), pa("grey")],
        [pa("pink"), pa("pink"), pa("pink"), pa("pink"), pa("pink")],
        [pa("grey"), pa("grey"), pa("pink"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("pink"), pa("grey"), pa("grey")]
      ];
      const dPanel = [
        [pa("pink"), pa("pink"), pa("pink"), pa("pink"), pa("pink")],
        [pa("pink"), pa("pink"), pa("pink"), pa("pink"), pa("pink")],
        [pa("pink"), pa("pink"), pa("pink"), pa("pink"), pa("pink")],
        [pa("pink"), pa("pink"), pa("pink"), pa("pink"), pa("pink")],
        [pa("pink"), pa("pink"), pa("pink"), pa("pink"), pa("pink")]
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
        [pa("pink"), pa("grey"), pa("grey"), pa("grey"), pa("pink")],
        [pa("pink"), pa("pink"), pa("grey"), pa("grey"), pa("pink")],
        [pa("pink"), pa("grey"), pa("pink"), pa("grey"), pa("pink")],
        [pa("pink"), pa("grey"), pa("grey"), pa("pink"), pa("pink")],
        [pa("pink"), pa("grey"), pa("grey"), pa("grey"), pa("pink")]
      ];
      const bPanel = [
        [pa("grey"), pa("pink"), pa("grey"), pa("pink"), pa("grey")],
        [pa("grey"), pa("pink"), pa("pink"), pa("pink"), pa("grey")],
        [pa("grey"), pa("pink"), pa("grey"), pa("pink"), pa("grey")],
        [pa("grey"), pa("pink"), pa("pink"), pa("pink"), pa("grey")],
        [pa("grey"), pa("pink"), pa("grey"), pa("pink"), pa("grey")]
      ];
      const cPanel = [
        [pa("pink"), pa("grey"), pa("grey"), pa("grey"), pa("pink")],
        [pa("pink"), pa("grey"), pa("grey"), pa("grey"), pa("pink")],
        [pa("pink"), pa("grey"), pa("pink"), pa("grey"), pa("pink")],
        [pa("pink"), pa("grey"), pa("grey"), pa("grey"), pa("pink")],
        [pa("pink"), pa("grey"), pa("grey"), pa("grey"), pa("pink")]
      ];
      assert.deepEqual(
        p.sub(aPanel, bPanel),
        cPanel,
        "should make a relative complement of B in A"
      );
    });
    it("adjustToTop", () => {
      const pa = p.createItem;
      const aPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("pink"), pa("grey"), pa("grey"), pa("grey")],
        [pa("pink"), pa("pink"), pa("pink"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      const bPanel = [
        [pa("grey"), pa("pink"), pa("grey"), pa("grey"), pa("grey")],
        [pa("pink"), pa("pink"), pa("pink"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      assert.deepEqual(
        p.adjustToTop(aPanel),
        bPanel,
        "should move items to top of the panel"
      );
    });
    it("adjustToBottom", () => {
      const pa = p.createItem;
      const aPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("pink"), pa("grey"), pa("grey"), pa("grey")],
        [pa("pink"), pa("pink"), pa("pink"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      const bPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("pink"), pa("grey"), pa("grey"), pa("grey")],
        [pa("pink"), pa("pink"), pa("pink"), pa("grey"), pa("grey")]
      ];
      assert.deepEqual(
        p.adjustToBottom(aPanel),
        bPanel,
        "should move items to bottom of the panel"
      );
    });
    it("snapshot", () => {
      const panel0 = p.createPanel(3, 3);
      const panel1 = p.paint(panel0, [{ row: 0, column: 0 }], "pink");
      const panel2 = p.paint(panel0, [{ row: 2, column: 2 }], "blue");

      let history = [];
      history = p.snapshot(history, panel0);
      assert(history.length === 1, "should append panel to empty history");

      history = p.snapshot(history, panel1);
      history = p.snapshot(history, panel2);
      assert(history.length === 3, "should accumulate snapshots");

      assert.deepEqual(
        history[0],
        panel0,
        "first snapshot should equal panel0"
      );
      assert.deepEqual(
        history[2],
        panel2,
        "last snapshot should equal panel2"
      );

      // snapshot is immutable: original history must not be mutated
      const before = [...history];
      p.snapshot(history, panel0);
      assert(
        history.length === before.length,
        "snapshot should not mutate the original history array"
      );

      // snapshot stores a deep clone: mutating original panel must not affect stored snapshot
      const mutablePanel = p.createPanel(2, 2);
      const h = p.snapshot([], mutablePanel);
      mutablePanel[0][0].color = "red";
      assert(
        h[0][0][0].color !== "red",
        "snapshot should store a deep clone, not a reference"
      );
    });

    it("rewind", () => {
      const panel0 = p.paint(p.createPanel(3, 3), [{ row: 0, column: 0 }], "pink");
      const panel1 = p.paint(p.createPanel(3, 3), [{ row: 1, column: 1 }], "blue");
      const panel2 = p.paint(p.createPanel(3, 3), [{ row: 2, column: 2 }], "orange");

      let history = [];
      history = p.snapshot(history, panel0);
      history = p.snapshot(history, panel1);
      history = p.snapshot(history, panel2);

      assert.deepEqual(
        p.rewind(history, 0),
        panel2,
        "steps=0 should return the latest panel"
      );
      assert.deepEqual(
        p.rewind(history, 1),
        panel1,
        "steps=1 should return 1 step ago"
      );
      assert.deepEqual(
        p.rewind(history, 2),
        panel0,
        "steps=2 should return 2 steps ago"
      );

      // default steps is 1
      assert.deepEqual(
        p.rewind(history),
        panel1,
        "default steps should be 1"
      );

      // clamp to oldest when steps exceeds history length
      assert.deepEqual(
        p.rewind(history, 99),
        panel0,
        "should clamp to the oldest snapshot when steps exceeds history length"
      );

      // rewind returns a deep clone: mutating result must not affect history
      const result = p.rewind(history, 0);
      result[0][0].color = "mutated";
      assert(
        history[2][0][0].color !== "mutated",
        "rewind should return a deep clone, not a reference"
      );
    });

    it("trace", () => {
      const initial = p.paint(p.createPanel(3, 3), [{ row: 0, column: 0 }], "pink");

      // basic structure
      const { panel, history } = p.trace([p.right, p.down])(initial);
      assert(Array.isArray(panel), "panel should be a 2D array");
      assert(Array.isArray(history), "history should be an array");
      assert(
        history.length === 3,
        "history length should be fns.length + 1 (initial + each step)"
      );

      // history[0] is the initial panel
      assert.deepEqual(
        history[0],
        initial,
        "history[0] should equal the initial panel"
      );

      // final panel equals last history entry
      assert.deepEqual(
        panel,
        history[history.length - 1],
        "final panel should equal the last history entry"
      );

      // each step is correctly applied
      assert.deepEqual(
        history[1],
        p.right(initial),
        "history[1] should equal right(initial)"
      );
      assert.deepEqual(
        history[2],
        p.down(p.right(initial)),
        "history[2] should equal down(right(initial))"
      );

      // empty fns: history contains only the initial panel
      const { panel: p0, history: h0 } = p.trace([])(initial);
      assert.deepEqual(p0, initial, "empty fns should return initial panel");
      assert(h0.length === 1, "empty fns should produce history of length 1");

      // trace does not mutate the input panel
      const copy = _.cloneDeep(initial);
      p.trace([p.right, p.down])(initial);
      assert.deepEqual(initial, copy, "trace should not mutate the input panel");
    });

    it("canRotate", () => {
      const pa = p.createItem;
      const ze = p.createZeroItem;

      // T-piece centered in a clear board → rotation is valid
      const bgClear = p.createPanel(5, 5);
      const toolPanel = [
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("pink"), pa("grey"), pa("grey")],
        [pa("grey"), pa("pink"), ze("pink"), pa("pink"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
      ];
      assert(
        p.canRotate(bgClear, toolPanel) === true,
        "should return true when rotation is valid on a clear board"
      );

      // rotation would overlap bgPanel → false
      const bgBlocked = p.paint(bgClear, [{ row: 1, column: 2 }], "blue");
      assert(
        p.canRotate(bgBlocked, toolPanel) === false,
        "should return false when rotated piece overlaps bgPanel"
      );

      // vertical 5-cell piece with zeroPoint at the left edge:
      // cells below the zeroPoint rotate to negative columns → clipped
      const toolNearEdge = [
        [ze("pink"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("pink"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("pink"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("pink"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("pink"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
      ];
      assert(
        p.canRotate(bgClear, toolNearEdge) === false,
        "should return false when rotation clips cells outside the panel"
      );
    });

    it("removeFullRows", () => {
      const pa = p.createItem;

      // one full row → removed, one empty row prepended
      const panel = [
        [pa("grey"), pa("pink"), pa("grey")],
        [pa("pink"), pa("pink"), pa("pink")],
        [pa("grey"), pa("pink"), pa("pink")],
      ];
      const result = p.removeFullRows(panel);
      assert(result.length === 3, "should keep the same number of rows");
      assert(
        result[0].every((cell) => cell.color === "grey"),
        "first row should be empty (prepended)"
      );
      assert(
        result[1].some((cell) => cell.color === "grey"),
        "original non-full rows should be preserved"
      );

      // no full rows → panel unchanged
      const noFullRows = [
        [pa("grey"), pa("pink"), pa("grey")],
        [pa("pink"), pa("grey"), pa("pink")],
      ];
      assert.deepEqual(
        p.removeFullRows(noFullRows),
        noFullRows,
        "should return an equivalent panel when no rows are full"
      );

      // multiple full rows → all removed, same count of empty rows at top
      const allFull = [
        [pa("pink"), pa("pink")],
        [pa("pink"), pa("pink")],
        [pa("grey"), pa("pink")],
      ];
      const allFullResult = p.removeFullRows(allFull);
      assert(allFullResult.length === 3, "should keep the same number of rows");
      assert(
        allFullResult[0].every((cell) => cell.color === "grey"),
        "row 0 should be empty"
      );
      assert(
        allFullResult[1].every((cell) => cell.color === "grey"),
        "row 1 should be empty"
      );
      assert(
        allFullResult[2][1].color === "pink",
        "surviving row should be at the bottom"
      );
    });

    it("adjustToCenter", () => {
      const pa = p.createItem;
      const aPanel = [
        [pa("grey"), pa("pink"), pa("grey"), pa("grey"), pa("grey")],
        [pa("pink"), pa("pink"), pa("pink"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      const bPanel = [
        [pa("grey"), pa("grey"), pa("pink"), pa("grey"), pa("grey")],
        [pa("grey"), pa("pink"), pa("pink"), pa("pink"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")],
        [pa("grey"), pa("grey"), pa("grey"), pa("grey"), pa("grey")]
      ];
      assert.deepEqual(
        p.adjustToCenter(aPanel),
        bPanel,
        "should move items to center of panel"
      );

      // items already span full width: no shift needed (shift = 0 branch)
      const mk = p.createItem;
      const fullWidth = [
        [mk("pink"), mk("pink"), mk("pink"), mk("pink"), mk("pink")],
        [mk("grey"), mk("grey"), mk("grey"), mk("grey"), mk("grey")],
        [mk("grey"), mk("grey"), mk("grey"), mk("grey"), mk("grey")],
        [mk("grey"), mk("grey"), mk("grey"), mk("grey"), mk("grey")],
        [mk("grey"), mk("grey"), mk("grey"), mk("grey"), mk("grey")]
      ];
      assert.deepEqual(
        p.adjustToCenter(fullWidth),
        fullWidth,
        "should not shift when items already span full width"
      );
    });
  });
});
