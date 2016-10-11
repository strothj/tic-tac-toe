'use strict';

function Cell(x, y) {
  this.state = '';
  
  this.element = $('<div class="board__cell"></div>');
  if (x < 2) {
    this.element.addClass('board__cell_right-border');
  }
  if (y < 2) {
    this.element.addClass('board__cell_bottom-border');
  }
}

Cell.prototype.setX = function() {
  this.state = 'X';
  this.element.addClass('board__cell_X');
};

Cell.prototype.setO = function() {
  this.state = 'O';
  this.element.addClass('board__cell_O');
};

function Board() {
  var grid = [];

  var boardElem = $('<div class="board board-wrapper__board"></div>');
  for (var y = 0; y < 3; y++) {
    var row = [];
    for (var x = 0; x < 3; x++) {
      var cell = new Cell(x, y);
      row.push(cell);
      boardElem.append(cell.element);
    }
    grid.push(row);
  }

  this.element = boardElem;
}

$(function() {
  var board = new Board();
  $('#js-board-wrapper').append(board.element);
});
