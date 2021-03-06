function Cell() {
  this.alive = false;
  this.neighbors = [];
}

Cell.prototype.isAlive = function() {
  return this.alive;
};

Cell.prototype.setLife = function(lifeState) {
  this.alive = lifeState;
};

Cell.prototype.spawn = function() {
  this.setLife(true);
};

Cell.prototype.kill = function() {
  this.setLife(false);
};

Cell.prototype.toggle = function() {
  this.alive ? this.kill() : this.spawn();
};

Cell.prototype.setNeighbors = function(neighbors) {
  this.neighbors = neighbors;
};

Cell.prototype.livingNeighbors = function() {
  return this.neighbors.reduce(function(count, neighbor) {
    // Add one to count if neighbor is alive
    return neighbor.alive ? count + 1 : count;
  }, 0);
};

Cell.prototype.shouldLive = function() {
  if (this.isAlive()) {
    return (this.livingNeighbors() === 2 || this.livingNeighbors() === 3);
  } else {
    return (this.livingNeighbors() === 3);
  }
};
