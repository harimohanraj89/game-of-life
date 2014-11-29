function Board(rows, cols) {
  this.rows = rows;
  this.cols = cols;
  this.generateCells();
}

Board.prototype.cell = function(row, col) {
  return cells[row][col];
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
