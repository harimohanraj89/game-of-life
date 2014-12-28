function Board(rows, cols) {
  this.rows = rows;
  this.cols = cols;
  this.generateCells();
  this.setNeighbors();
}

Board.prototype.cell = function(row, col) {
  if (this.validCell(row, col)) {
    return this.cells[row][col].alive;
  }
  return null;
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
  for(var row = 0; row < this.rows; row++) {
    for (var col = 0; col < this.cols; col++) {
      var neighbors = [];

      for (var nRow = Math.max(row-1, 0); nRow <= Math.min(row+1, this.rows-1); nRow++) {
        for (var nCol = Math.max(col-1, 0); nCol <= Math.min(col+1, this.cols-1); nCol++) {
          if (nRow !== row || nCol !== col) {
            neighbors.push(this.cells[nRow][nCol]);
          }
        }
      }

      this.cells[row][col].setNeighbors(neighbors);
    }
  }
};

Board.prototype.toggle = function(row, col) {
  if (this.validCell(row, col)) {
    this.cells[row][col].toggle();
  }
};

Board.prototype.validCell = function(row, col) {
  return (row >= 0 && row < this.rows) && (col >= 0 && col < this.cols)
}

Board.prototype.step = function() {
  var nextState = [];
  for(var row = 0; row < this.rows; row++) {
    var rowOfStates = [];
    for (var col = 0; col < this.cols; col++) {
      rowOfStates.push(this.cells[row][col].shouldLive());
    }
    nextState.push(rowOfStates);
  }

  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      board.cells[row][col].setLife(nextState[row][col]);
    }
  }
}
