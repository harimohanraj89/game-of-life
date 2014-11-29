describe("Cell", function() {
  var player;
  var song;

  beforeEach(function() {
    cell = new Cell();
  });

  it("should start off dead", function() {
    expect(cell.alive).toBe(false);
  });

  describe("#setLife", function() {
    it("should be able to set the cell to live", function() {
      cell.setLife(true);
      expect(cell.alive).toBe(true);
    });

    it("should be able to set the cell to die", function() {
      cell.setLife(false);
      expect(cell.alive).toBe(false);
    });
  });

  describe("#spawn", function() {
    it("should set the cell to live", function() {
      cell.spawn();
      expect(cell.alive).toBe(true);
    });
  });

  describe("#set", function() {
    it("should be able to set the cell to live", function() {
      cell.setLife(true);
      cell.kill();
      expect(cell.alive).toBe(false);
    });
  });

  describe("#livingNeighbors", function() {
    it("should return the number of living neighbors around a cell", function() {
      neighors = [new Cell(), new Cell(), new Cell()];
      neighbors[2].spawn();
      neighbors[3].spawn();
      cell.setNeighbors([neighbor1, neighbor2, neighbor3]);
      expect(cell.livingNeighbors()).toBe(2);
    });
  });

  describe("#shouldLive", function() {
    it("should return true for 2 neighbors", function() {
      neighbors = [new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()];
      neighbors[0].spawn();
      neighbors[2].spawn();
      cell.setNeighbors(neighbors);
      expect(cell.shouldLive()).toBe(true);
    });

    it("should return true for 3 neighbors", function() {
      neighbors = [new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()];
      neighbors[1].spawn();
      neighbors[3].spawn();
      neighbors[5].spawn();
      cell.setNeighbors(neighbors);
      expect(cell.shouldLive()).toBe(true);
    });

    it("should return false for less than 2 neighbors", function() {
      neighbors = [new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()];
      neighbors[4].spawn();
      cell.setNeighbors(neighbors);
      expect(cell.shouldLive()).toBe(false);
    });

    it("should return false for more than 3 neighbors", function() {
      neighbors = [new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()];
      neighbors[1].spawn();
      neighbors[2].spawn();
      neighbors[3].spawn();
      neighbors[4].spawn();
      neighbors[5].spawn();
      cell.setNeighbors(neighbors);
      expect(cell.shouldLive()).toBe(false);
    });
  });
});
