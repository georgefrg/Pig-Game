"use strict";

// Selecting Elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playingGame = true;

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
};

//Rolling dice functanality
rollDiceBtn.addEventListener("click", function () {
  if (playingGame) {
    //1. generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Dispay dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //3. Check rolled 1: IF true,switch player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
  }
});

holdBtn.addEventListener("click", function () {
  if (playingGame) {
    //1. Add currentScore to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if score is 100>=
    if (scores[activePlayer] >= 10) {
      //finish game
      playingGame = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }

    //3. if not, change player
    switchPlayer();
  }
});

newGameBtn.addEventListener("click", function () {
  //1.remove player scores and acitve player overlay
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player1El.classList.remove("player--winner");
  player0El.classList.remove("player--winner");
});
