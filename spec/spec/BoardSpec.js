describe("Board", function() {

  beforeEach(function() {
    board = new Board(3, 3);
  });

  describe("#setNeighbors", function() {
    it ("includes the right neighbors", function() {
      board.setNeighbors();
      var subject = board.cell(0, 0);
      var neighbors = [board.cell(1, 0), board.cell(1, 1), board.cell(0, 1)];
      for (var i = 0; i < neighbors.length; i++) {
        expect(subject.neighbors.indexOf(neighbors[i]) > -1).toBe(true);
      }
    });

    it ("excludes the right neighbors", function() {
      board.setNeighbors();
      var subject = board.cell(0, 0);
      var notNeighbors = [board.cell(2, 0), board.cell(1, 2), board.cell(2, 2)];
      for (var i = 0; i < notNeighbors.length; i++) {
        expect(subject.neighbors.indexOf(notNeighbors[i]) == -1).toBe(true);
      }
    });

    it("excludes itself", function() {
      board.setNeighbors();
      var subject = board.cell(0, 0);
      expect(subject.neighbors.indexOf(subject) == -1).toBe(true);
    });
  });

  describe("#step", function() {
    it ("spawns the right cells", function() {
      board.cell(1, 0).spawn();
      board.cell(1, 1).spawn();
      board.cell(0, 1).spawn();
      board.step();
      expect(board.cell(0, 0).isAlive()).toBe(true);
    });

    it ("kills the right cells", function() {
      board.cell(0, 0).spawn();
      board.cell(1, 0).spawn();
      board.step();
      expect(board.cell(0, 0).isAlive()).toBe(false);
    });
  });

});
