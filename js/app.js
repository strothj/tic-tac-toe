'use strict';

function Cell(x, y, board) {
  this.state = '';

  this.element = $('<div class="board__cell"></div>');
  if (x < 2) {
    this.element.addClass('board__cell_right-border');
  }
  if (y < 2) {
    this.element.addClass('board__cell_bottom-border');
  }

  this.element.click(function() {
    board.handleClick(x, y);
  });
}

Cell.prototype.setPiece = function(piece) {
  this.state = piece;
  this.element.addClass('board__cell_' + piece);
};

function Board() {
  this.grid = [];
  this.turn = 'X';
  this.gameOver = false;

  this.element = $('<div class="board board-wrapper__board"></div>');
  for (var y = 0; y < 3; y++) {
    var row = [];
    for (var x = 0; x < 3; x++) {
      var cell = new Cell(x, y, this);
      row.push(cell);
      this.element.append(cell.element);
    }
    this.grid.push(row);
  }
}

Board.prototype.handleClick = function(x, y) {
  if (this.gameOver || this.grid[y][x].state !== '') {
    return;
  }
  this.grid[y][x].setPiece(this.turn);
};

$(function() {
  var board = new Board();
  $('#js-board-wrapper').append(board.element);
});
