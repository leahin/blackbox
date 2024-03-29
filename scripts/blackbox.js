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

// ray class
// take start launch point and grid data from the black box
// move ray
// check collision
// return the end point of the ray
