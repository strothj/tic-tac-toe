'use strict';

function Cell(x, y, board) {
  this.piece = '';

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
  this.piece = piece;
  this.element.addClass('board__cell_' + piece);
};

function Board() {
  this.grid = [];
  this.turn = 'X';
  this.turnCounter = 0;
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
  if (this.gameOver || this.grid[y][x].piece !== '') {
    return;
  }
  this.grid[y][x].setPiece(this.turn);
  this.turnCounter++;

  // Check for horizontal win condition
  for (var i = 0; i < 2; i++) {
    if (this.grid[i][0].piece === this.turn &&
      this.grid[i][1].piece === this.turn &&
      this.grid[i][2].piece === this.turn) {
      this.declareWinner(this.turn);
      return;
    }
  }

  // Check for vertical win condition
  for (i = 0; i < 2; i++) {
    if (this.grid[0][i].piece === this.turn &&
      this.grid[1][i].piece === this.turn &&
      this.grid[2][i].piece === this.turn) {
      this.declareWinner(this.turn);
      return;
    }
  }

  // Check for diagonal win condition
  if (this.grid[0][0].piece === this.turn &&
    this.grid[1][1].piece === this.turn &&
    this.grid[2][2].piece === this.turn) {
    this.declareWinner(this.turn);
    return;
  }

  // Check for reverse diagonal win condition
  if (this.grid[0][2].piece === this.turn &&
    this.grid[1][1].piece === this.turn &&
    this.grid[2][0].piece === this.turn) {
    this.declareWinner(this.turn);
    return;
  }

  // Detect draw condition
  if (this.turnCounter === 9) {
    this.declareDraw();
    return;
  }

  this.turn = this.turn === 'X' ? 'O' : 'X';
};

$(function() {
  var board = new Board();
  board.declareWinner = function(winner) {
    $('#js-status').text(winner + ' won the game!');
  };
  board.declareDraw = function() {
    $('#js-status').text('The game is a draw!');
  };
  $('#js-board-wrapper').append(board.element);
});
