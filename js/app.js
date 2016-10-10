'use strict';

function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.state = '';
}

Cell.prototype.handleClick = function() {
  this.onClick(this);
  if (this.state === 'X') {
    this.elem.addClass('board__cell_X');
  }
  if (this.state === 'Y') {
    this.elem.addClass('board__cell_y');
  }
};

Cell.prototype.createElement = function() {
  this.elem = $('<div class="board__cell"></div>');
  if (this.x < 2) {
    this.elem.addClass('board__cell_right-border');
  }
  if (this.y < 2) {
    this.elem.addClass('board__cell_bottom-border');
  }
  this.elem.click(this.handleClick.bind(this));
  return this.elem;
};

function Board(cells) {
  this.cells = cells;
  this.turn = 'X';
  this.gameOver = false;
}

Board.prototype.handleCellClick = function(cell) {
  if (cell.state !== '' || this.gameOver) {
    return;
  }
  cell.state = this.turn;
  // TODO: Check win conditions
};

Board.prototype.createElement = function() {
  var elem = $('<div class="board board-wrapper__board"></div>');
  for (var i = 0; i < this.cells.length; i++) {
    var cell = this.cells[i];
    cell.onClick = this.handleCellClick.bind(this);
    elem.append(cell.createElement());
  }
  return elem;
};

$(function() {
  var cells = [];
  for (var y = 0; y < 3; y++) {
    for (var x = 0; x < 3; x++) {
      cells.push(new Cell(x, y));
    }
  }
  var board = new Board(cells);
  $('#js-board-wrapper').append(board.createElement());
});
