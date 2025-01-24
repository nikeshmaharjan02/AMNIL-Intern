let secretNumber;
let attempts;

const startGame = (req, res) => {
  secretNumber = Math.floor(Math.random() * 20) + 1
  attempts = 5

  res.json({ message: "Game started! Try to guess the number between 1 to 20!", attempts: attempts })
};

const makeGuess = (req, res) => {
  const guess = parseInt(req.params.number)
  attempts--

  let responseMessage = ""
  if (guess === secretNumber) {
    responseMessage = "You've got it right! You Won!"
  } else if (guess < secretNumber) {
    responseMessage = "Too small!";
  } else if (guess > secretNumber) {
    responseMessage = "Too big!";
  }

  if (attempts === 0) {
    responseMessage = `Game over! The secret number was ${secretNumber}.`;
  }

  res.json({ message: responseMessage, attempts: attempts });
};

module.exports = { startGame, makeGuess };
