// blackbox class
// have grid data
// passing start launch point
// store end point on the grid
import Ray from "./ray.js";

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
    this.initiateBoard();
  }

  initiateBoard() {
    this._board = Array.from({ length: this._size }, () =>
      new Array(this._size).fill(0)
    );
    this.generateAtomCoordinates();
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
    this._atomCoords = atoms;
  }

  placeAtoms() {
    this._atomCoords.forEach((coord) => {
      const [row, col] = coord.split(", ");
      this._board[Number(row)][Number(col)] = 1;

      // for testing
      let cell = document.querySelector(`.cell[row="${row}"][col="${col}"]`);
      cell.style.backgroundColor = "red";
    });
  }

  shootRay(direction, index) {
    console.log(`shootRay from ${direction} at ${index}`);
    const ray = new Ray(direction, index, this._board);
    const endPoint = ray.moveRay();
    console.log(endPoint);
  }

  // class close bracket
}

// const blackbox = new Blackbox(8, 4, 25);
// blackbox.initiateBoard();

export default Blackbox;
