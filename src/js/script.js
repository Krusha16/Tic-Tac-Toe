//Stroring status of the game into a variable
const currentStatus = document.querySelector('.current-status');

//Declaring some variable which I will use to track status of the game
let isActive = true;
let currentPlayer = "X";
let currentState = ["", "", "", "", "", "", "", "", ""];

//This will display whose turn is it 
currentStatus.innerHTML = `${currentPlayer}'s turn`;

//Defining winning conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

//Adding event listeners to each cells and restart button
document.querySelectorAll('.column').forEach(column => column.addEventListener('click', clickTheColumn));
document.querySelector('.reset').addEventListener('click', reset);

function playedColumn(clickedColumn, clickedColumnIndex) {

  //update played move to current status of the game
  currentState[clickedColumnIndex] = currentPlayer;
  clickedColumn.innerHTML = currentPlayer;
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentStatus.innerHTML = `${currentPlayer}'s turn`;
}

function checkResult() {
  let won = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = currentState[winCondition[0]];
    let b = currentState[winCondition[1]];
    let c = currentState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      won = true;
      break
    }
  }

  if (won) {
    alert(`Player ${currentPlayer} is a winner!`);
    isActive = false;
    return;
  }

  //Game Ended in a draw
  let draw = !currentState.includes("");
  if (draw) {
    alert(`No Winner!`);
    isActive = false;
    return;
  }

  //Game is still running
  switchPlayer();
}

function clickTheColumn(clickedColumnEvent) {
  const clickedColumn = clickedColumnEvent.target;

  //store "data-cell-index" attribute of clicked cell in a variable
  const clickedColumnIndex = parseInt(clickedColumn.getAttribute('data-cell-index'));

  //check if cell is already played or game is paused or not
  if (currentState[clickedColumnIndex] !== "" || !isActive) {
    return;
  }

  playedColumn(clickedColumn, clickedColumnIndex);
  checkResult();
}

function reset() {
  isActive = true;
  currentPlayer = "X";
  currentState = ["", "", "", "", "", "", "", "", ""];
  currentStatus.innerHTML = `${currentPlayer}'s turn`;
  document.querySelectorAll('.column').forEach(column => column.innerHTML = "");
}
