function Board(rows, cols) {
  this.rows = rows;
  this.cols = cols;
  this.initialize();
}

Board.prototype.inBounds = function(row, col) {
  return (row >= 0 && row < this.rows && col >= 0 && col < this.cols);
}

Board.prototype.cell = function(row, col) {
  return this.inBounds(row, col) ? this.cells[row][col] : null;
};

Board.prototype.initialize = function() {
  this.generateCells();
  this.setNeighbors();
}

Board.prototype.generateCells = function() {
  this.cells = [];
  if (this.rows === undefined || this.cols === undefined) {
    return;
  }
  for(var row = 0; row < this.rows; row++) {
    var rowOfCells = [];
    for (var col = 0; col < this.cols; col++) {
      rowOfCells.push(new Cell());
    }
    this.cells.push(rowOfCells);
  }
};

Board.prototype.setNeighbors = function() {
  var neighborLocs = [
    [-1,  0], [-1,  1], [ 0,  1], [ 1,  1],
    [ 1,  0], [ 1, -1], [ 0, -1], [-1, -1]
  ];
  for (var row = 0; row < this.rows; row++) {
    for (var col = 0; col < this.rows; col++) {
      var neighbors = [];
      neighborLocs.forEach(function(neighbor) {
        if (this.cell(row + neighbor[0], col + neighbor[1]) !== null) {
          neighbors.push(this.cell(row + neighbor[0], col + neighbor[1]));
        }
      }, this);
      this.cell(row, col).setNeighbors(neighbors);
    }
  }
}

Board.prototype.step = function() {
  var nextState = [];
  for(var row = 0; row < this.rows; row++) {
    var rowOfStates = [];
    for (var col = 0; col < this.cols; col++) {
      rowOfStates.push(this.cell(row, col).shouldLive());
    }
    nextState.push(rowOfStates);
  }

  for(var row = 0; row < this.rows; row++) {
    for(var col = 0; col < this.cols; col++) {
      nextState[row][col] ? this.cell(row, col).spawn() : this.cell(row, col).kill();
    }
  }
}
