// blackbox class
// store board data and atom coordinates
// passing start launch point coordinate to ray class

import Ray from "./ray.js";

class Blackbox {
  /**
   * @param {*} size - size of the board
   * @param {*} numAtoms - number of atoms
   * @param {*} score - initial score
   * _size: size of the board
   * _initialScore: initial score of the game
   * _score: current score of the game
   * _board: 2D array representing the board
   * _atoms: set of atoms coordinates
   * _deflectionCount: number of deflections. The number is used to indicate
   *    the pair of start and end points of the deflected ray.
   * _missCount: number of misses. The number is used to mark the pair of
   *    start and end points of the missed ray.
   */

  constructor(size, numAtoms, score) {
    this._size = size;
    this._numAtoms = numAtoms;
    this._initialScore = score;
    this._score = score;
    this._board = null;
    this._atoms = null;
    this._deflectionCount = 0;
    this._missCount = 0;
    this._foundAllAtoms = false;
    this.initiateBoard();
  }

  initiateBoard() {
    // Generate atom coordinates and then store them on the board.
    this._board = Array.from({ length: this._size }, () =>
      new Array(this._size).fill(0)
    );
    this.generateAtoms();
    this.placeAtoms();
  }

  generateAtoms() {
    // Generate atom coordinates.
    // The number of atoms is set by _numAtoms.
    const atoms = new Set();
    while (atoms.size < this._numAtoms) {
      let row = Math.floor(Math.random() * this._size);
      let col = Math.floor(Math.random() * this._size);
      atoms.add(`${row},${col}`);
    }
    this._atoms = atoms;
  }

  placeAtoms() {
    // Enter 1 on the board where the atoms are placed.
    this._atoms.forEach((coord) => {
      const [row, col] = coord.split(",");
      this._board[Number(row)][Number(col)] = 1;
    });
  }

  shootRay(direction, row, col) {
    // Implement the ray shooting logic.
    // Create a new ray object and then record the result.
    // Decrease the current score by 1.
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

  guessAtom(row, col) {
    // Guess the atom at the given coordinates and return ture if the guess is correct. Otherwise return false.
    // If the guess is correct, increase the score by 5. Otherwise, decrease it by 5.
    if (this._board[row][col] === 1) {
      this._score += 5;
      return true;
    }
    this._score -= 5;
    return false;
  }

  reset() {
    // Reset the game.
    this._score = this._initialScore;
    this._deflectionCount = 0;
    this._missCount = 0;
    this._foundAllAtoms = false;
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
  get foundAllAtoms() {
    return this._foundAllAtoms;
  }
  set foundAllAtoms(value) {
    this._foundAllAtoms = value;
  }
}

const BlackboxModule = () => {
  let instance = null;

  return {
    getInstance: (size = 8, numAtoms = 4, score = 25) => {
      if (!instance) {
        instance = new Blackbox(size, numAtoms, score);
      }
      return instance;
    },
    resetInstance: (size = 8, numAtoms = 4, score = 25) => {
      instance = new Blackbox(size, numAtoms, score);
    },
  };
};

export default BlackboxModule;
