const SIZE = 8;

function renderBlackbox() {
  const blackbox = document.getElementById("blackbox");
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      let cell = document.createElement("div");
      cell.className = `cell`;
      cell.setAttribute("row", i.toString());
      cell.setAttribute("col", j.toString());
      blackbox.appendChild(cell);
    }
  }
}

function renderLaunchPoints(direction) {
  const launchPointRow = document.getElementById(
    `launch-point-row-${direction}`
  );
  for (let i = 0; i < SIZE; i++) {
    let launchPoint = document.createElement("div");
    launchPoint.className = `launch-point`;
    launchPoint.setAttribute("direction", direction);
    launchPoint.setAttribute("index", i);
    launchPointRow.appendChild(launchPoint);
  }
}

renderLaunchPoints("top");
renderLaunchPoints("bottom");
renderLaunchPoints("left");
renderLaunchPoints("right");
renderBlackbox();
