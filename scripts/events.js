import Blackbox from "./blackbox.js";

let blackbox = new Blackbox(8, 4, 25);

const onClickNew = (e) => {
  console.log("New button clicked");
  blackbox = new Blackbox(8, 4, 25);
};

const onClickReset = (e) => {
  console.log("Reset button clicked");
};

const onClickShow = (e) => {
  console.log("Show button clicked");
};

const newButton = document.getElementById("new-btn");
newButton.addEventListener("click", onClickNew);
const resetButton = document.getElementById("reset-btn");
resetButton.addEventListener("click", onClickReset);
const showButton = document.getElementById("show-btn");
showButton.addEventListener("click", onClickShow);

const onClickLaunchPoint = (e) => {
  const direction = e.target.getAttribute("direction");
  const index = e.target.getAttribute("index");
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    if (cell.style.backgroundColor !== "red") {
      cell.style.backgroundColor = "#bbb";
    }
  });
  blackbox.shootRay(direction, index);
};

const launchPoints = document.querySelectorAll(".launch-point");
launchPoints.forEach((point) => {
  point.addEventListener("click", onClickLaunchPoint);
});

// for testing
const onClickCell = (e) => {
  console.log(e.target);
};
const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("click", onClickCell);
});
