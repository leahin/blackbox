function renderBoard(size) {
  for (let i = 0; i < size; i++) {
    let row = document.createElement('div');
    row.className = `row-${i}`;
    for (let j = 0; j < size; j++) {
      let cell = document.createElement('div');
      cell.className = `cell-${i}-${j}`;
      row.appendChild(cell);
    }
    document.getElementById('board').appendChild(row);
  }
}

renderBoard(8);
