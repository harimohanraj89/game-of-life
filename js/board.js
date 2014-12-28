function Board(rows, cols) {
  this.rows = rows;
  this.cols = cols;
  this.initialize();
}

Board.prototype.initialize = function() {
  this.generateCells();
  this.setNeighbors();
};

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
  this.eachCell(function(cell, row, col) {
    var neighbors = [];
    for (var nRow = Math.max(row-1, 0); nRow <= Math.min(row+1, this.rows-1); nRow++) {
      for (var nCol = Math.max(col-1, 0); nCol <= Math.min(col+1, this.cols-1); nCol++) {
        if (nRow !== row || nCol !== col) {
          neighbors.push(this.cells[nRow][nCol]);
        }
      }
    }
    cell.setNeighbors(neighbors);
  });
};

Board.prototype.cell = function(row, col) {
  return this.validCell(row, col) ? this.cells[row][col].isAlive() : null;
};

Board.prototype.toggle = function(row, col) {
  if (this.validCell(row, col)) {
    this.cells[row][col].toggle();
  }
};

Board.prototype.validCell = function(row, col) {
  return (row >= 0 && row < this.rows) && (col >= 0 && col < this.cols)
};

Board.prototype.step = function() {
  var nextState = this.mapCells(function(cell) {
    return cell.shouldLive();
  });

  this.eachCell(function(cell, row, col) {
    cell.setLife(nextState[row][col]);
  });
};

Board.prototype.eachCell = function(callback) {
  if (typeof callback === "function") {
    for (var row = 0; row < this.rows; row++) {
      for (var col = 0; col < this.cols; col++) {
        callback.call(this, this.cells[row][col], row, col);
      }
    }
  }
};

Board.prototype.mapCells = function(callback) {
  if (typeof callback === "function") {
    var mapped = [];
    for (var row = 0; row < this.rows; row++) {
      mapped.push([]);
    }

    for (var row = 0; row < this.rows; row++) {
      for (var col = 0; col < this.cols; col++) {
        mapped[row][col] = callback.call(this, this.cells[row][col], row, col);
      }
    }
    return mapped;
  }
}
