const board = document.getElementById("board");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restart");
const modeRadios = document.querySelectorAll('input[name="mode"]');

let spaces = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;
let mode = "pvp"; // default mode

// Listen for mode changes
modeRadios.forEach(radio => {
  radio.addEventListener("change", e => {
    mode = e.target.value;
    createBoard();
  });
});

function createBoard() {
  board.innerHTML = "";
  spaces = Array(9).fill(null);
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's Turn";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleMove(i));
    board.appendChild(cell);
  }
}

function handleMove(index) {
  if (!gameActive || spaces[index]) return;

  spaces[index] = currentPlayer;
  board.children[index].textContent = currentPlayer;

  if (checkWinner(currentPlayer)) {
    statusText.textContent = `${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }

  if (spaces.every(space => space)) {
    statusText.textContent = "It's a Draw! 😐";
    gameActive = false;
    return;
  }

  if (mode === "pvp") {
    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  } else {
    // Player vs Computer
    currentPlayer = "O";
    statusText.textContent = "Computer's Turn...";
    setTimeout(computerMove, 700);
  }
}

function computerMove() {
  if (!gameActive) return;

  const available = spaces
    .map((v, i) => (v === null ? i : null))
    .filter(v => v !== null);

  if (available.length === 0) return;

  // Random computer move
  const move = available[Math.floor(Math.random() * available.length)];
  spaces[move] = "O";
  board.children[move].textContent = "O";

  if (checkWinner("O")) {
    statusText.textContent = "Computer Wins 😈";
    gameActive = false;
    return;
  }

  if (spaces.every(space => space)) {
    statusText.textContent = "It's a Draw! 😐";
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  statusText.textContent = "Your Turn (X)";
}

function checkWinner(player) {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return wins.some(([a,b,c]) => {
    return spaces[a] === player && spaces[b] === player && spaces[c] === player;
  });
}

restartBtn.addEventListener("click", createBoard);

createBoard();
