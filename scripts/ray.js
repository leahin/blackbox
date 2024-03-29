// ray class
// take start launch point and grid data from the black box
// move ray
// check collision
// return the end point of the ray

const directions = {
  toTop: [-1, 0],
  toBottom: [1, 0],
  toLeft: [0, -1],
  toRight: [0, 1],
};

class Ray {
  constructor(entryPoint, board) {
    this._entryPoint = entryPoint;
    this._board = board;
    this._size = board.length;
    this._row = null;
    this._col = null;
    this._dx = null;
    this._dy = null;

    this.initiateRay();
  }

  initiateRay() {
    switch (this._entryPoint[0]) {
      case "top":
        this._row = -1;
        this._col = this._entryPoint[1];
        [this._dx, this._dy] = directions.toBottom;
        break;
      case "bottom":
        this._row = this._size;
        this._col = this._entryPoint[1];
        [this._dx, this._dy] = directions.toTop;
        break;
      case "left":
        this._row = this._entryPoint[1];
        this._col = -1;
        [this._dx, this._dy] = directions.toRight;
        break;
      case "right":
        this._row = this._entryPoint[1];
        this._col = this._size;
        [this._dx, this._dy] = directions.toLeft;
        break;
    }
  }

  checkAtomFront() {
    if (this._board[this._row + this._dx][this._col + this._dy] === 1) {
      return true;
    }
    return false;
  }

  checkAtomDiagonalLeft() {
    if (
      this._dx !== 0 &&
      this._col - 1 > 0 &&
      this._board[this._row + this._dx][this._col - 1] === 1
    ) {
      return true;
    } else if (
      this._dy !== 0 &&
      this._row - 1 > 0 &&
      this._board[this._row - 1][this._col + this._dy] === 1
    ) {
      return true;
    }
    return false;
  }

  checkAtomDiagonalRight() {
    if (
      this._dx !== 0 &&
      this._col + 1 < this._board &&
      this._board[this._row + this._dx][this._col + 1] === 1
    ) {
      return true;
    } else if (
      this._dy !== 0 &&
      this._row + 1 < this._board &&
      this._board[this._row + 1][this._col + this._dy] === 1
    ) {
      return true;
    }
    return false;
  }

  getNextDirection() {
    let isAtomDiagonalLeft = this.checkAtomDiagonalLeft();
    let isAtomDiagonalRight = this.checkAtomDiagonalRight();
    if (isAtomDiagonalLeft && isAtomDiagonalRight) {
      // turn direction to 180 degree
      return;
    } else if (isAtomDiagonalLeft) {
      // turn direction to 90 degree
    } else if (isAtomDiagonalRight) {
      // turn direction to -90 degree
    } else {
      // keep moving in the same direction
    }
  }

  moveRay() {
    while (
      this._row >= -1 &&
      this._row <= this._size &&
      this._col >= -1 &&
      this._col <= this._size
    ) {
      if (this.checkAtomFront()) {
        return "hit";
      }
      [this._dx, this._dy] = this.getNextDirection();
      this._row += this._dx;
      this._col += this._dy;
    }
    // return exit point
  }
}

export default Ray;
