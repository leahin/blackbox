const directions = {
  toTop: (-1, 0),
  toBottom: (1, 0),
  toLeft: (0, -1),
  toRight: (0, 1),
};

// blackbox class
// have grid data
// passing start launch point
// store end point on the grid

function generateIndex() {
  return Math.floor(Math.random() * 8);
}

class Blackbox {
  constructor(size, numAtoms, score) {
    this._size = size;
    this._numAtoms = numAtoms;
    this._score = score;
    this._board = null;
    this._atomCoords = null;
    this._currentEntryPoint = null;
  }

  initiateBoard() {
    this._board = Array.from({ length: this._size }, () =>
      new Array(this._size).fill(0)
    );
    this.placeAtoms();
    console.log([...this._board]);
  }

  generateAtomCoordinates() {
    const atoms = new Set();
    while (atoms.size < this._numAtoms) {
      let row = generateIndex();
      let col = generateIndex();
      atoms.add(`${row}, ${col}`);
    }
    console.log(atoms);
    return atoms;
  }

  placeAtoms() {
    const atoms = this.generateAtomCoordinates();
    atoms.forEach((coord) => {
      const [row, col] = coord.split(',');
      this._board[Number(row)][Number(col)] = 1;
    });
  }
  // class close bracket
}

const blackbox = new Blackbox(8, 4, 25);
blackbox.initiateBoard();

class Ray {
  constructor(entryPoint, board) {
    this._entryPoint = entryPoint;
    this._board = board;
    this._size = board.length;
    this.directions = {
      toTop: [-1, 0],
      toBottom: [1, 0],
      toLeft: [0, -1],
      toRight: [0, 1],
    };
  }

  getInitialDirection() {
    if (this._entryPoint[0] === 'top') {
      return this.directions.toBottom;
    } else if (this._entryPoint[0] === 'bottom') {
      return this.directions.toTop;
    } else if (this._entryPoint[1] === 'left') {
      return this.directions.toRight;
    } else {
      return this.directions.toLeft;
    }
  }

  checkAtomFront(row, col, dx, dy) {
    if (this._board[row + dx][col + dy] === 1) {
      return true;
    }
    return false;
  }

  checkAtomDiagonalLeft(row, col, dx, dy) {
    if (dx !== 0 && col - 1 > 0 && this._board[row + dx][col - 1] === 1) {
      return true;
    } else if (
      dy !== 0 &&
      row - 1 > 0 &&
      this._board[row - 1][col + dy] === 1
    ) {
      return true;
    }
    return false;
  }

  checkAtomDiagonalRight(row, col, dx, dy) {
    if (
      dx !== 0 &&
      col + 1 < this._board &&
      this._board[row + dx][col + 1] === 1
    ) {
      return true;
    } else if (
      dy !== 0 &&
      row + 1 < this._board &&
      this._board[row + 1][col + dy] === 1
    ) {
      return true;
    }
    return false;
  }

  moveRay() {
    let [row, col] = this._entryPoint;
    let [dx, dy] = this.getInitialDirection(row, col);
    while (row >= 0 && row < this._size && col >= 0 && col < this._size) {
      row += dx;
      col += dy;
      // check front for atom
      // check diagonal for atom
    }
  }
}

// ray class
// take start launch point and grid data from the black box
// move ray
// check collision
// return the end point of the ray
