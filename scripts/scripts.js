// render the board and buttons.

const SIZE = 8;

function renderBlackbox() {
  const blackbox = document.getElementById("blackbox");
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      let cell = document.createElement("div");
      cell.className = `cell`;
      cell.setAttribute("row", i);
      cell.setAttribute("col", j);
      blackbox.appendChild(cell);
    }
  }
}

function renderLaunchPoints(direction) {
  const launchPointRow = document.getElementById(
    `launch-point-row-${direction}`
  );
  const getCoord = (direction, i) => {
    switch (direction) {
      case "top":
        return [-1, i];
      case "bottom":
        return [SIZE, i];
      case "left":
        return [i, -1];
      case "right":
        return [i, SIZE];
    }
  };

  for (let i = 0; i < SIZE; i++) {
    let launchPoint = document.createElement("div");
    let [row, col] = getCoord(direction, i);
    launchPoint.className = `launch-point`;
    launchPoint.setAttribute("direction", direction);
    launchPoint.setAttribute("row", row);
    launchPoint.setAttribute("col", col);
    launchPointRow.appendChild(launchPoint);
  }
}

renderLaunchPoints("top");
renderLaunchPoints("bottom");
renderLaunchPoints("left");
renderLaunchPoints("right");
renderBlackbox();
