import './App.css';

function generateCombination() {
  // Gera uma combinação aleatória de 4 números entre 0 e 9
  let combination = [];
  for (let i = 0; i < 4; i++) {
      combination.push(Math.floor(Math.random() * 10));
  }
  return combination;
}

function getFeedback(secret, guess) {
  let correctPosition = 0;
  let correctNumberWrongPosition = 0;
  let wrongNumbers = 0;

  // Faz uma cópia dos arrays para evitar modificar os originais
  let secretCopy = [...secret];
  let guessCopy = [...guess];

  // Primeiro, verifica os números que estão no lugar certo
  for (let i = 0; i < 4; i++) {
      if (guess[i] === secret[i]) {
          correctPosition++;
          secretCopy[i] = guessCopy[i] = null; // Remove os números verificados
      }
  }

  // Agora verifica os números que estão corretos mas no lugar errado
  for (let i = 0; i < 4; i++) {
      if (guessCopy[i] !== null && secretCopy.includes(guessCopy[i])) {
          correctNumberWrongPosition++;
          secretCopy[secretCopy.indexOf(guessCopy[i])] = null; // Remove os números verificados
      }
  }

  // Calcula quantos números estão errados
  wrongNumbers = 4 - (correctPosition + correctNumberWrongPosition);

  return {
      correctPosition: correctPosition,
      correctNumberWrongPosition: correctNumberWrongPosition,
      wrongNumbers: wrongNumbers
  };
}

function playGame() {
  const secretCombination = generateCombination();
  let attempts = 0;
  let guessed = false;

  console.log("Welcome to the Number Combination Guessing Game!");
  console.log("Try to guess the 4-number combination. Each number is between 0 and 9.");

  while (!guessed) {
      let guess = prompt("Enter your 4-digit guess (e.g., 1234):");

      // Verifica se o palpite é válido
      if (guess.length !== 4 || !/^\d+$/.test(guess)) {
          console.log("Invalid input. Please enter exactly 4 digits.");
          continue;
      }

      // Converte o palpite em um array de números
      guess = guess.split("").map(Number);
      attempts++;

      // Avalia o palpite
      const feedback = getFeedback(secretCombination, guess);

      console.log(`Correct numbers in the correct position: ${feedback.correctPosition}`);
      console.log(`Correct numbers in the wrong position: ${feedback.correctNumberWrongPosition}`);
      console.log(`Wrong numbers: ${feedback.wrongNumbers}`);

      // Verifica se o jogador acertou a combinação
      if (feedback.correctPosition === 4) {
          guessed = true;
          console.log(`Congratulations! You guessed the correct combination in ${attempts} attempts.`);
      } else {
          console.log("Try again!\n");
      }
  }
}

// Inicia o jogo
playGame();
