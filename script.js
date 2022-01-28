'use strict';

////////////////////////////////////////////////////////////////
// ELEMENT SELECTION
////////////////////////////////////////////////////////////////

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

////////////////////////////////////////////////////////////////
// VARIABLE DECLARATION
////////////////////////////////////////////////////////////////

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

////////////////////////////////////////////////////////////////
// FUNCTIONS -- need to fix
////////////////////////////////////////////////////////////////

// Initializes game elements and variables
const init = function () {
  // Variables
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  // Classes
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  // Scores
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;

  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;
  }
};

// Displays active player's currentScore
const displayCurrentScore = function (activePlayer, currentScore) {
  // let active = activePlayer;
  // let score = currentScore;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

// Zeros currentScore and switches the player
const switchPlayers = function () {
  currentScore = 0;
  displayCurrentScore(activePlayer, currentScore);
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

////////////////////////////////////////////////////////////////
// GAME LOGIC
////////////////////////////////////////////////////////////////

// Initializes game
init();

// Resetting the game
btnNew.addEventListener('click', init);

// Rolling the dice
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    const dice = Math.trunc(Math.random() * 6 + 1);

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      displayCurrentScore(activePlayer, currentScore);
    } else {
      switchPlayers();
    }
  }
});

// Holding dice
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      isPlaying = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayers();
    }
  }
});
