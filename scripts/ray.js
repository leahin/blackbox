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
  constructor(direction, index, board) {
    this._entryDirection = direction;
    this._entryIndex = Number(index);
    this._board = board;
    this._size = board.length;
    this._row = null;
    this._col = null;
    this._dx = null;
    this._dy = null;
    this._directionMap = null;
    this._isDeflected = false;

    this.initiateRay();
  }

  initiateRay() {
    switch (this._entryDirection) {
      case "top":
        this._row = -1;
        this._col = this._entryIndex;
        [this._dx, this._dy] = directions.toBottom;
        this._directionMap = directionMap.toBottom;
        break;
      case "bottom":
        this._row = this._size;
        this._col = this._entryIndex;
        [this._dx, this._dy] = directions.toTop;
        this._directionMap = directionMap.toTop;
        break;
      case "left":
        this._row = this._entryIndex;
        this._col = -1;
        [this._dx, this._dy] = directions.toRight;
        this._directionMap = directionMap.toRight;
        break;
      case "right":
        this._row = this._entryIndex;
        this._col = this._size;
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
      return ["hit", this._entryDirection, this._entryIndex];
    }
    if (this.checkAtomDiagonalLeft() || this.checkAtomDiagonalRight()) {
      return ["reflect", this._entryDirection, this._entryIndex];
    }
    this._row += this._dx;
    this._col += this._dy;

    // for testing
    let cell = document.querySelector(
      `.cell[row="${this._row}"][col="${this._col}"]`
    );
    if (cell) {
      cell.style.backgroundColor = "green";
    }

    while (
      this._row >= 0 &&
      this._row < this._size &&
      this._col >= 0 &&
      this._col < this._size
    ) {
      if (this.checkAtomFront()) {
        return ["hit", this._entryDirection, this._entryIndex];
      }
      this.setNextDirection();
      this._row += this._dx;
      this._col += this._dy;

      // for testing
      let cell = document.querySelector(
        `.cell[row="${this._row}"][col="${this._col}"]`
      );
      if (cell) {
        cell.style.backgroundColor = "green";
      }
    }

    let direction = null;
    let exitIndex = null;
    if (this._row === -1) {
      direction = "top";
      exitIndex = this._col;
    } else if (this._row === this._size) {
      direction = "bottom";
      exitIndex = this._col;
    } else if (this._col === -1) {
      direction = "left";
      exitIndex = this._row;
    } else {
      direction = "right";
      exitIndex = this._row;
    }

    if (
      direction === this._entryDirection &&
      (this._col === this._entryIndex || this._row === this._entryIndex)
    ) {
      return ["reflect", direction, exitIndex];
    } else if (this._isDeflected) {
      return ["deflect", direction, exitIndex];
    } else {
      return ["miss", direction, exitIndex];
    }
  }
}

export default Ray;
