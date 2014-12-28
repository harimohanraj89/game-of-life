describe("Board", function() {

  beforeEach(function() {
    board = new Board(3, 3);
  });

  describe("cell", function() {
    it("returns a boolean for valid coordinates", function() {
      expect(typeof board.cell(2, 1)).toBe("boolean");
    });

    it("returns null for out-of-bounds coordinates", function() {
      expect(board.cell(4, 5)).toBe(null);
    });

    it("returns null for negative coordinates", function() {
      expect(board.cell(-3, 1)).toBe(null);
    });

  });

  describe("toggle", function() {
    it("returns toggles the living state of a cell", function() {
      board.toggle(2, 1);
      expect(board.cell(2,1)).toBe(true);
    });
  });

  describe("step", function() {
    it("performs one step of game of life", function() {
      var from = [
        [false, true,  false],
        [false, false, true ],
        [true,  false, false]
      ]

      var to = [
        [false, false, true ],
        [true,  true,  false],
        [false, true,  false]
      ]

      // set up board
      for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
          if (board.cell(row, col) !== from[row][col]) {
            board.toggle(row, col);
          }
        }
      }
      board.step();

      // check state
      for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
          expect(board.cell(row, col)).toBe(to[row][col]);
        }
      }
    });
  });

});
