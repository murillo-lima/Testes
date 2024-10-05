// script.js

function generateCombination() {
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

    let secretCopy = [...secret];
    let guessCopy = [...guess];

    for (let i = 0; i < 4; i++) {
        if (guess[i] === secret[i]) {
            correctPosition++;
            secretCopy[i] = guessCopy[i] = null;
        }
    }

    for (let i = 0; i < 4; i++) {
        if (guessCopy[i] !== null && secretCopy.includes(guessCopy[i])) {
            correctNumberWrongPosition++;
            secretCopy[secretCopy.indexOf(guessCopy[i])] = null;
        }
    }

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

    const guessInput = document.getElementById('guessInput');
    const submitButton = document.getElementById('submitGuess');
    const feedbackDiv = document.getElementById('feedback');
    const attemptsDiv = document.getElementById('attempts');

    submitButton.addEventListener('click', () => {
        const guess = guessInput.value.split('').map(Number);

        if (guess.length !== 4 || guess.some(isNaN)) {
            feedbackDiv.textContent = "Please enter a valid 4-digit number.";
            return;
        }

        attempts++;
        const feedback = getFeedback(secretCombination, guess);

        feedbackDiv.innerHTML = `
            <p>Correct numbers in the correct position: ${feedback.correctPosition}</p>
            <p>Correct numbers in the wrong position: ${feedback.correctNumberWrongPosition}</p>
            <p>Wrong numbers: ${feedback.wrongNumbers}</p>
        `;

        attemptsDiv.textContent = `Attempts: ${attempts}`;

        if (feedback.correctPosition === 4) {
            feedbackDiv.innerHTML += `<p>🎉 Parabéns! Você acertou a combinação correta em ${attempts} tentativas.</p>`;
            submitButton.disabled = true;
            guessInput.disabled = true;
        }

        guessInput.value = '';
    });
}

// Inicia o jogo
playGame();
