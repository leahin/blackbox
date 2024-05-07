// Events for the game
// Button events for new, reset, show, hide.
// Add event listeners to the buttons, launch points and cells.

import BlackboxModule from "./blackbox.js";
import LaunchPointEvents from "./events/launchpoints.js";
import CellEvents from "./events/cells.js";

const blackboxInstance = BlackboxModule();

const onClickNew = (e) => {
  // Start a new blackbox game.
  const confirmed = window.confirm(
    "Are you sure you want to start a new game?"
  );
  if (!confirmed) {
    return;
  }
  blackboxInstance.resetInstance();
  resetBoard();
};

const onClickReset = (e) => {
  // Reset the current game.
  const confirmed = window.confirm("Are you sure you want to reset the game?");
  if (!confirmed) {
    return;
  }
  const blackbox = blackboxInstance.getInstance();
  blackbox.reset();
  resetBoard();
};

const onClickShow = (e) => {
  // Show the atoms on the board
  const atomText = document.querySelector(".atom-text");
  if (!atomText) {
    showAtomText();
  }
  e.target.textContent = "Hide";
  e.target.addEventListener("click", onClickHide);
  e.target.removeEventListener("click", onClickShow);
};

const showAtomText = () => {
  // Show the atoms on the board
  const blackbox = blackboxInstance.getInstance();
  const atoms = blackbox.atoms;
  atoms.forEach((coord) => {
    const [row, col] = coord.split(",");
    const cell = document.querySelector(`.cell[row="${row}"][col="${col}"]`);
    if (!cell.querySelector(".correct-guess-text")) {
      const spanElement = document.createElement("span");
      spanElement.className = "atom-text";
      spanElement.textContent = "A";
      cell.appendChild(spanElement);
    }
  });
};

const onClickHide = (e) => {
  // Hide the atoms on the board
  const atomTextNodes = document.querySelectorAll(".atom-text");
  atomTextNodes.forEach((node) => {
    node.parentNode.removeChild(node);
  });

  e.target.textContent = "Show";
  e.target.addEventListener("click", onClickShow);
  e.target.removeEventListener("click", onClickHide);
};

const resetBoard = () => {
  // Reset the rendered board for reset and new game.
  renderScore();
  resetShowButton();
  hideAtomText();
  hideResultText();
  addEventListenerToLanchPoints();
  addEventListenerToCells();
};

const renderScore = () => {
  // Render the current score on the page
  const blackbox = blackboxInstance.getInstance();
  const scoreSpan = document.getElementById("current-score");
  scoreSpan.textContent = blackbox.score;
};

const resetShowButton = () => {
  // Reset the show button if it is "Hide".
  const showButton = document.getElementById("show-btn");
  if (showButton.textContent === "Hide") {
    showButton.textContent = "Show";
    showButton.removeEventListener("click", onClickHide);
    showButton.addEventListener("click", onClickShow);
  }
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

const hideAtomText = () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    const atomText = cell.querySelector(".atom-text");
    const correctGuessText = cell.querySelector(".correct-guess-text");
    const wrongGuessText = cell.querySelector(".wrong-guess-text");
    if (atomText) {
      cell.removeChild(atomText);
    }
    if (correctGuessText) {
      cell.removeChild(correctGuessText);
    }
    if (wrongGuessText) {
      cell.removeChild(wrongGuessText);
    }
  });
};

const onClickLaunchPoint = (e) => {
  // A callback function for clicking on a launch point.
  // Shoot a ray from the launch point and then update score.
  const launchPointEvents = new LaunchPointEvents(blackboxInstance);
  const exitPoint = launchPointEvents.onClickLaunchPoint(e);
  renderScore();

  // Remove the event listner for the pair.
  e.target.removeEventListener("click", onClickLaunchPoint);
  if (exitPoint) {
    exitPoint.removeEventListener("click", onClickLaunchPoint);
  }
};

const onClickCell = (e) => {
  // A callback function for clicking on a cell.
  // Check if the cell is an atom and then update the score.
  const cellEvents = new CellEvents(blackboxInstance);
  const cell = cellEvents.onClickCell(e);
  renderScore();

  // Checks if all atoms are found.
  const blackbox = blackboxInstance.getInstance();
  if (
    cellEvents.checkAllAtomsDiscovered() === true &&
    !blackbox.foundAllAtoms
  ) {
    blackbox.foundAllAtoms = true;
    setTimeout(() => {
      displayCongratulation();
    }, 0); // Place alerts at the end of the event queue.
  }
  cell.removeEventListener("click", onClickCell);
};

const displayCongratulation = () => {
  // Display a congratulation message when all atoms are found.
  alert("Congratulations! You have discovered all atoms.");

  // Start a new blackbox game.
  const confirmed = window.confirm("Do you want to start a new game?");
  if (!confirmed) {
    return;
  }
  blackboxInstance.resetInstance();
  resetBoard();
};

const addEventListenerToLanchPoints = () => {
  // Add event listeners to launch points
  const launchPoints = document.querySelectorAll(".launch-point");
  launchPoints.forEach((point) => {
    point.addEventListener("click", onClickLaunchPoint);
  });
};

const addEventListenerToCells = () => {
  // Add event listeners to cells
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", onClickCell);
  });
};

const addButtonEvent = (buttonId, onClickEvent) => {
  // Add an event listener to a button
  const button = document.getElementById(buttonId);
  button.addEventListener("click", onClickEvent);
};

addEventListenerToLanchPoints();
addEventListenerToCells();
addButtonEvent("new-btn", onClickNew);
addButtonEvent("reset-btn", onClickReset);
addButtonEvent("show-btn", onClickShow);
renderScore();
