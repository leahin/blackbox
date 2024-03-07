const onClickNew = (e) => {
  console.log('New button clicked');
};

const onClickReset = (e) => {
  console.log('Reset button clicked');
};

const onClickShow = (e) => {
  console.log('Show button clicked');
};

const newButton = document.getElementById('new-btn');
newButton.addEventListener('click', onClickNew);
const resetButton = document.getElementById('reset-btn');
resetButton.addEventListener('click', onClickReset);
const showButton = document.getElementById('show-btn');
showButton.addEventListener('click', onClickShow);

const onClickLaunchPoint = (e) => {
  const className = e.target.className.split('-').slice(-2);
  const direction = className[0];
  const index = className[1];
  console.log(direction, index);
};

const launchPoints = document.querySelectorAll('.launch-point');
launchPoints.forEach((point) => {
  point.addEventListener('click', onClickLaunchPoint);
});
