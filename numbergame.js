let randomNumber = Math.floor(Math.random() * 100) + 1;
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

// Create a small question icon image
const icon = document.createElement("img");
icon.src = "images/question.png";
icon.style.width = "60px";
icon.style.height = "60px";
icon.style.marginTop = "15px";
icon.style.display = "none";
document.querySelector(".container").appendChild(icon);

guessBtn.addEventListener("click", () => {
  const guess = Number(guessInput.value);

  if (!guess || guess < 1 || guess > 100) {
    message.textContent = "Please enter a valid number between 1 and 100.";
    message.style.color = "yellow";
    return;
  }

  // Disable input temporarily and show the question icon
  guessBtn.disabled = true;
  guessInput.disabled = true;
  message.textContent = "Thinking...";
  message.style.color = "white";
  icon.style.display = "inline";

  // Delay reveal by 1 second
  setTimeout(() => {
    icon.style.display = "none";

    if (guess === randomNumber) {
      message.textContent = `🎉 Correct! The number was ${randomNumber}.`;
      message.style.color = "lightgreen";
      guessBtn.disabled = true;
    } else if (guess < randomNumber) {
      message.textContent = "Too low! Try again.";
      message.style.color = "orange";
    } else {
      message.textContent = "Too high! Try again.";
      message.style.color = "orange";
    }

    guessBtn.disabled = false;
    guessInput.disabled = false;
    guessInput.value = "";
  }, 1000); // 1 second delay before answer appears
});

restartBtn.addEventListener("click", () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  message.textContent = "";
  guessInput.value = "";
  guessBtn.disabled = false;
  guessInput.disabled = false;
  icon.style.display = "none";
});
