// blackbox class
// have grid data
// passing start launch point
// store end point on the grid
import Ray from "./ray.js";

class Blackbox {
  constructor(size, numAtoms, score) {
    this._size = size;
    this._numAtoms = numAtoms;
    this._initialScore = score;
    this._score = score;
    this._board = null;
    this._atoms = null;
    this._deflectionCount = 0;
    this._missCount = 0;
    this.initiateBoard();
  }

  initiateBoard() {
    this._board = Array.from({ length: this._size }, () =>
      new Array(this._size).fill(0)
    );
    this.generateAtoms();
    this.placeAtoms();
  }

  generateAtoms() {
    // Randomly generate atom coordinates
    const atoms = new Set();
    while (atoms.size < this._numAtoms) {
      let row = Math.floor(Math.random() * this._size);
      let col = Math.floor(Math.random() * this._size);
      atoms.add(`${row},${col}`); // to prevent duplicate atoms
    }
    this._atoms = atoms;
  }

  placeAtoms() {
    this._atoms.forEach((coord) => {
      const [row, col] = coord.split(",");
      this._board[Number(row)][Number(col)] = 1;
    });
  }

  shootRay(direction, row, col) {
    const ray = new Ray(direction, row, col, this._board);
    const result = ray.moveRay();
    if (result[0] === "deflect") {
      this._deflectionCount++;
    } else if (result[0] === "miss") {
      this._missCount++;
    }
    this._score--;
    return result;
  }

  reset() {
    this._score = this._initialScore;
    this._deflectionCount = 0;
    this._missCount = 0;
  }

  get atoms() {
    return this._atoms;
  }

  get score() {
    return this._score;
  }

  get deflectionCount() {
    return this._deflectionCount;
  }
  get missCount() {
    return this._missCount;
  }
}

export default Blackbox;
