// ray class
// take start launch point and grid data from a blackbox object
// move ray, check collision, return the result and end point of the ray

const directions = {
  toTop: [-1, 0],
  toBottom: [1, 0],
  toLeft: [0, -1],
  toRight: [0, 1],
};

const directionMap = {
  toTop: {
    left: "toLeft",
    right: "toRight",
    back: "toBottom",
  },
  toBottom: {
    left: "toLeft",
    right: "toRight",
    back: "toTop",
  },
  toLeft: {
    left: "toTop",
    right: "toBottom",
    back: "toRight",
  },
  toRight: {
    left: "toTop",
    right: "toBottom",
    back: "toLeft",
  },
};

class Ray {
  constructor(direction, row, col, board) {
    this._entryRow = Number(row);
    this._entryCol = Number(col);
    this._entryDirection = direction;
    this._board = board;
    this._size = board.length;
    this._row = this._entryRow;
    this._col = this._entryCol;
    this._dx = null;
    this._dy = null;
    this._directionMap = null;
    this._isDeflected = false;

    this.initiateRay();
  }

  initiateRay() {
    switch (this._entryDirection) {
      case "top":
        [this._dx, this._dy] = directions.toBottom;
        this._directionMap = directionMap.toBottom;
        break;
      case "bottom":
        [this._dx, this._dy] = directions.toTop;
        this._directionMap = directionMap.toTop;
        break;
      case "left":
        [this._dx, this._dy] = directions.toRight;
        this._directionMap = directionMap.toRight;
        break;
      case "right":
        [this._dx, this._dy] = directions.toLeft;
        this._directionMap = directionMap.toLeft;
        break;
    }
  }

  checkAtomFront() {
    const row = this._row + this._dx;
    const col = this._col + this._dy;
    if (
      row >= 0 &&
      row < this._size &&
      col >= 0 &&
      col < this._size &&
      this._board[row][col] === 1
    ) {
      return true;
    }
    return false;
  }

  checkAtomDiagonalLeft() {
    const row = this._row + this._dx;
    const col = this._col + this._dy;
    if (
      this._dx !== 0 &&
      row >= 0 &&
      row < this._size &&
      this._col - 1 >= 0 &&
      this._board[row][this._col - 1] === 1
    ) {
      return true;
    } else if (
      this._dy !== 0 &&
      col >= 0 &&
      col < this._size &&
      this._row - 1 >= 0 &&
      this._board[this._row - 1][col] === 1
    ) {
      return true;
    }
    return false;
  }

  checkAtomDiagonalRight() {
    const row = this._row + this._dx;
    const col = this._col + this._dy;
    if (
      this._dx !== 0 &&
      row >= 0 &&
      row < this._size &&
      this._col + 1 < this._size &&
      this._board[row][this._col + 1] === 1
    ) {
      return true;
    } else if (
      this._dy !== 0 &&
      col >= 0 &&
      col < this._size &&
      this._row + 1 < this._size &&
      this._board[this._row + 1][col] === 1
    ) {
      return true;
    }
    return false;
  }

  setNextDirection() {
    let isAtomDiagonalLeft = this.checkAtomDiagonalLeft();
    let isAtomDiagonalRight = this.checkAtomDiagonalRight();
    let newDirection = null;
    if (isAtomDiagonalLeft && isAtomDiagonalRight) {
      newDirection = this._directionMap.back;
    } else if (isAtomDiagonalLeft) {
      newDirection = this._directionMap.right;
    } else if (isAtomDiagonalRight) {
      newDirection = this._directionMap.left;
    } else {
      return;
    }
    this._isDeflected = true;
    this._directionMap = directionMap[newDirection];
    [this._dx, this._dy] = directions[newDirection];
  }

  moveRay() {
    // initial checkup
    if (this.checkAtomFront()) {
      return ["hit", this._entryRow, this._entryCol];
    }
    if (this.checkAtomDiagonalLeft() || this.checkAtomDiagonalRight()) {
      return ["reflect", this._entryRow, this._entryCol];
    }
    this._row += this._dx;
    this._col += this._dy;

    while (
      this._row >= 0 &&
      this._row < this._size &&
      this._col >= 0 &&
      this._col < this._size
    ) {
      if (this.checkAtomFront()) {
        return ["hit", this._entryRow, this._entryCol];
      }
      this.setNextDirection();
      this._row += this._dx;
      this._col += this._dy;
    }

    if (this._col === this._entryCol && this._row === this._entryRow) {
      return ["reflect", this._entryRow, this._entryCol];
    } else if (this._isDeflected) {
      return ["deflect", this._row, this._col];
    } else {
      return ["miss", this._row, this._col];
    }
  }
}

export default Ray;
