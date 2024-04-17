// trigger events for the game

import Blackbox from "./blackbox.js";

const SIZE = 8;
const ATOM_NUM = 4;
const SCORE = 25;
const DEBUG_MODE = true;

let blackbox = new Blackbox(SIZE, ATOM_NUM, SCORE);

const onClickLaunchPoint = (e) => {
  // LaunchPoint Div Element Event
  // Shoot ray from the launch point
  hideRay(DEBUG_MODE);
  const direction = e.target.getAttribute("direction");
  const row = e.target.getAttribute("row");
  const col = e.target.getAttribute("col");
  const [result, exitRow, exitCol] = blackbox.shootRay(direction, row, col);
  renderResult(e.target, result, exitRow, exitCol);
  renderScore();
};

const renderResult = (entryPoint, result, exitRow, exitCol) => {
  // Render the result of the ray on the board
  const exitPoint = document.querySelector(
    `.launch-point[row="${exitRow}"][col="${exitCol}"]`
  );
  console.log(exitRow, exitCol);
  const spanElement = document.createElement("span");
  switch (result) {
    case "hit":
      spanElement.className = "hit-text";
      spanElement.textContent = "H";
      exitPoint.appendChild(spanElement);
      break;
    case "reflect":
      spanElement.className = "reflect-text";
      spanElement.textContent = "R";
      entryPoint.appendChild(spanElement);
      break;
    case "deflect":
      spanElement.className = "deflect-text";
      spanElement.textContent = "D" + blackbox.deflectionCount;
      entryPoint.appendChild(spanElement.cloneNode(true));
      exitPoint.appendChild(spanElement);
      break;
    case "miss":
      spanElement.className = "miss-text";
      spanElement.textContent = "M" + blackbox.missCount;
      entryPoint.appendChild(spanElement.cloneNode(true));
      exitPoint.appendChild(spanElement);
      break;
  }

  // Remove event to not allow more rays from the same launch/exit points
  entryPoint.removeEventListener("click", onClickLaunchPoint);
  if (exitPoint) exitPoint.removeEventListener("click", onClickLaunchPoint);
};

const onClickNew = (e) => {
  // New button event
  // Start a new blackbox game
  const confirmed = window.confirm(
    "Are you sure you want to start a new game?"
  );
  if (!confirmed) {
    return;
  }
  blackbox = new Blackbox(SIZE, ATOM_NUM, SCORE);
  resetBoard();
};

const onClickReset = (e) => {
  // Reset button event
  // Reset the current game
  const confirmed = window.confirm("Are you sure you want to reset the game?");
  if (!confirmed) {
    return;
  }
  blackbox.reset();
  resetBoard();
};

const onClickShow = (e) => {
  // Show button event
  // Show the atoms on the board
  // TODO: handle atoms that are already discovered.
  // TODO: hide button?
  const atomText = document.querySelector(".atom-text");
  if (!atomText) {
    showAtomText();
  }
};

const resetBoard = () => {
  // Reset the rendered board for reset and new game.
  hideRay(DEBUG_MODE);
  renderScore();
  hideAtomText();
  hideResultText();
  addEventListenerToLanchPoints();
};

const renderScore = () => {
  // Render the current score on the page
  const scoreSpan = document.getElementById("current-score");
  scoreSpan.textContent = blackbox.score;
};

const hideResultText = () => {
  const launchPoints = document.querySelectorAll(".launch-point");
  launchPoints.forEach((point) => {
    const textNode = point.querySelector("span");
    if (textNode) {
      point.removeChild(textNode);
    }
  });
};

const showAtomText = () => {
  const atoms = blackbox.atoms;
  atoms.forEach((coord) => {
    const [row, col] = coord.split(",");
    const cell = document.querySelector(`.cell[row="${row}"][col="${col}"]`);
    const spanElement = document.createElement("span");
    spanElement.className = "atom-text";
    spanElement.textContent = "A";
    cell.appendChild(spanElement);
  });
};

const hideAtomText = () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    const atomText = cell.querySelector(".atom-text");
    if (atomText) {
      cell.removeChild(atomText);
    }
  });
};

const addEventListenerToLanchPoints = () => {
  // Add event listeners to launch points
  const launchPoints = document.querySelectorAll(".launch-point");
  launchPoints.forEach((point) => {
    point.addEventListener("click", onClickLaunchPoint);
  });
};
addEventListenerToLanchPoints();

const newButton = document.getElementById("new-btn");
newButton.addEventListener("click", onClickNew);
const resetButton = document.getElementById("reset-btn");
resetButton.addEventListener("click", onClickReset);
const showButton = document.getElementById("show-btn");
showButton.addEventListener("click", onClickShow);
renderScore();

// Testing functions
const hideRay = (debugMode) => {
  // Display ray on the board
  if (!debugMode) {
    return;
  }
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "#bbb";
  });
};

const addEventListenerToCells = (debugMode) => {
  // Display cell clicked on console.
  if (!debugMode) {
    return;
  }
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      console.log(e.target);
    });
  });
};

addEventListenerToCells(DEBUG_MODE);
