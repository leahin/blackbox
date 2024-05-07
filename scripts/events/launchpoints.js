// LaunchPointEvents class
// Click LaunchPoint triggers shoot ray from the launch point and
// render the result on the board.

class LaunchPointEvents {
  // A collection of evetns for launch points and its helper functions.
  constructor(blackboxModule) {
    this._blackboxModule = blackboxModule;
    this._blackbox = blackboxModule.getInstance();
  }

  onClickLaunchPoint(e) {
    // Shoot ray from the launch point.
    // Return the exit point for removing its event listener.
    const direction = e.target.getAttribute("direction");
    const row = e.target.getAttribute("row");
    const col = e.target.getAttribute("col");
    const [result, exitRow, exitCol] = this._blackbox.shootRay(
      direction,
      row,
      col
    );
    const exitPoint = document.querySelector(
      `.launch-point[row="${exitRow}"][col="${exitCol}"]`
    );
    this.renderResult(e.target, result, exitPoint);

    return exitPoint;
  }

  renderResult(entryPoint, result, exitPoint) {
    // Render the result of the ray on the board.
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
        spanElement.textContent = "D" + this._blackbox.deflectionCount;
        entryPoint.appendChild(spanElement.cloneNode(true));
        exitPoint.appendChild(spanElement);
        break;
      case "miss":
        spanElement.className = "miss-text";
        spanElement.textContent = "M" + this._blackbox.missCount;
        entryPoint.appendChild(spanElement.cloneNode(true));
        exitPoint.appendChild(spanElement);
        break;
      default:
        console.log("Invalid result");
    }
  }
}

export default LaunchPointEvents;
