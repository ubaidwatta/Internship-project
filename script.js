const choices = document.querySelectorAll(".choice");
const playerIcon = document.getElementById("player-icon");
const computerIcon = document.getElementById("computer-icon");
const winnerText = document.getElementById("winner");
const restartBtn = document.getElementById("restartBtn");

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const playerChoice = choice.dataset.choice;

    // Disable inputs temporarily
    choices.forEach(c => c.style.pointerEvents = "none");

    // Show question marks before reveal
    playerIcon.src = "images/question.png";
    computerIcon.src = "images/question.png";
    winnerText.textContent = "";

    // Add suspense delay
    setTimeout(() => {
      const options = ["rock", "paper", "scissors"];
      const computerChoice = options[Math.floor(Math.random() * options.length)];

      // Show both choices simultaneously after delay
      playerIcon.src = `images/${playerChoice}.png`;
      computerIcon.src = `images/${computerChoice}.png`;

      const winner = getWinner(playerChoice, computerChoice);
      winnerText.textContent = winner;

      // Re-enable inputs
      choices.forEach(c => c.style.pointerEvents = "auto");
    }, 1000); // 1 second suspense delay
  });
});

restartBtn.addEventListener("click", () => {
  playerIcon.src = "images/question.png";
  computerIcon.src = "images/question.png";
  winnerText.textContent = "";
});

function getWinner(player, computer) {
  if (player === computer) return "It's a Draw! 🤝";

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "You Win! 🎉";
  } else {
    return "Computer Wins 😈";
  }
}
