function DomInterface(options) {
  this.rows = options.rows;
  this.cols = options.cols;

  if (typeof options.container === 'string') {
    this.container = document.getElementById(options.container);
  } else {
    this.container = options.container;
  }

  if (typeof options.stepper === 'string') {
    this.stepper = document.getElementById(options.stepper);
  } else {
    this.stepper = options.stepper;
  }

  if (typeof options.resetter === 'string') {
    this.resetter = document.getElementById(options.resetter);
  } else {
    this.resetter = options.resetter;
  }

  this.initialize();
}

DomInterface.prototype.initialize = function() {
  this.makeBoard();
  this.generateDom();
  this.listen();
  this.render();
};

DomInterface.prototype.makeBoard = function() {
  this.board = new Board(this.rows, this.cols);
};

DomInterface.prototype.generateDom = function() {
  if (this.rows && this.cols) {
    for (var row = 0; row < this.rows; row++) {
      var rowDiv = document.createElement('div');
      rowDiv.classList.add('row');
      for (var col = 0; col < this.cols; col++) {
        var cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = row + '-' + col;
        cell.dataset.row = row;
        cell.dataset.col = col;
        rowDiv.appendChild(cell);
      }
      this.container.appendChild(rowDiv);
    }
  }
};

DomInterface.prototype.listen = function() {
  var self = this;
  if (this.container) {
    this.container.addEventListener('click', function(e) {
      if (e.target && e.target.classList.contains('cell') > 0) {
        var row = e.target.dataset.row;
        var col = e.target.dataset.col;
        self.board.toggle(row, col);
        self.render();
      }
    });
  }

  if (this.stepper) {
    this.stepper.addEventListener('click', function(e) {
      self.board.step();
      self.render();
    });
  }

  if (this.resetter) {
    this.resetter.addEventListener('click', function(e) {
      self.board.reset();
      self.render();
    });
  }
};

DomInterface.prototype.render = function() {
  for (var row = 0; row < this.rows; row++) {
    for (var col = 0; col < this.cols; col++) {
      var cell = document.getElementById(row + '-' + col);
      if (this.board.cell(row, col)) {
        cell.classList.add('alive');
        cell.classList.remove('dead');
      } else {
        cell.classList.remove('alive');
        cell.classList.add('dead');
      }
    }
  }
};
