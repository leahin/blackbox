// Cell's click events.
// Used to guess the atom in the cell.

class CellEvents {
  constructor(blackboxModule) {
    this._blackboxModule = blackboxModule;
    this._blackbox = blackboxModule.getInstance();
  }

  onClickCell(e) {
    // Show text "O" for correct guess, "X" for wrong guess.
    // Return cell for make sure the right target is selected for removing event listner.
    let cell = e.target;

    // Make sure that the cell is clicked.
    if (e.target.className != "cell") {
      cell = e.target.parentElement;
    }

    const row = cell.getAttribute("row");
    const col = cell.getAttribute("col");
    const isAtom = this._blackbox.guessAtom(row, col);
    const spanElement = document.createElement("span");
    if (isAtom) {
      const atomTextSpan = cell.querySelector(".atom-text");
      if (atomTextSpan) {
        cell.removeChild(atomTextSpan);
      }
      spanElement.className = "correct-guess-text";
      spanElement.textContent = "O";
    } else {
      spanElement.className = "wrong-guess-text";
      spanElement.textContent = "X";
    }
    cell.appendChild(spanElement);

    return cell;
  }

  checkAllAtomsDiscovered() {
    // Check if all atoms are discovered.
    const atoms = this._blackbox.atoms;
    const atomTextNodes = document.querySelectorAll(".correct-guess-text");
    return atoms.size == atomTextNodes.length;
  }
}

export default CellEvents;
