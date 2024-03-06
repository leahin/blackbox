const SIZE = 8;

function renderBlackbox() {
  const blackbox = document.getElementById('blackbox');
  for (let i = 0; i < SIZE; i++) {
    let row = document.createElement('div');
    row.className = `row-${i}`;
    for (let j = 0; j < SIZE; j++) {
      let cell = document.createElement('div');
      cell.className = `cell cell-${i}-${j}`;
      row.appendChild(cell);
    }
    blackbox.appendChild(row);
  }
}

function renderLaunchPoints(direction) {
  const launchPointRow = document.getElementById(
    `launch-point-row-${direction}`
  );
  for (let i = 0; i < SIZE; i++) {
    let launchPoint = document.createElement('div');
    launchPoint.className = `launch-point launch-point-${direction}-${i}`;
    launchPointRow.appendChild(launchPoint);
  }
}

renderLaunchPoints('top');
renderLaunchPoints('bottom');
renderLaunchPoints('left');
renderLaunchPoints('right');
renderBlackbox();
