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

const directionMap = {
  toTop: {
    left: directions.toLeft,
    right: directions.toRight,
    back: directions.toBottom,
  },
  toBottom: {
    left: directions.toRight,
    right: directions.toLeft,
    back: directions.toTop,
  },
  toLeft: {
    left: directions.toBottom,
    right: directions.toTop,
    back: directions.toRight,
  },
  toRight: {
    left: directions.toTop,
    right: directions.toBottom,
    back: directions.toLeft,
  },
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
    this._directionMap = null;

    this.initiateRay();
  }

  initiateRay() {
    switch (this._entryPoint[0]) {
      case "top":
        this._row = -1;
        this._col = this._entryPoint[1];
        [this._dx, this._dy] = directions.toBottom;
        this._directionMap = directionMap.toBottom;
        break;
      case "bottom":
        this._row = this._size;
        this._col = this._entryPoint[1];
        [this._dx, this._dy] = directions.toTop;
        this._directionMap = directionMap.toTop;
        break;
      case "left":
        this._row = this._entryPoint[1];
        this._col = -1;
        [this._dx, this._dy] = directions.toRight;
        this._directionMap = directionMap.toRight;
        break;
      case "right":
        this._row = this._entryPoint[1];
        this._col = this._size;
        [this._dx, this._dy] = directions.toLeft;
        this._directionMap = directionMap.toLeft;
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

  setNextDirection() {
    let isAtomDiagonalLeft = this.checkAtomDiagonalLeft();
    let isAtomDiagonalRight = this.checkAtomDiagonalRight();
    if (isAtomDiagonalLeft && isAtomDiagonalRight) {
      // turn direction to 180 degree
      this._directionMap = [this._dx, this._dy] = this._directionMap.back;
      return this._directionMap.back;
    } else if (isAtomDiagonalLeft) {
      // turn direction to 90 degree
      [this._dx, this._dy] = this._directionMap.left;
    } else if (isAtomDiagonalRight) {
      // turn direction to -90 degree
      [this._dx, this._dy] = this._directionMap.right;
    } else {
      this._row += this._dx;
      this._col += this._dy;
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
    return [this._row, this._col];
  }
}

export default Ray;
