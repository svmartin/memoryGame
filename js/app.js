const cardDeck = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bomb"
];

const deckHTML = document.querySelector(".deck");
let isGameOff = true;
let matchedCards = [];
let moveCount = 0;
let openCards = [];
let gameStats;
let totalSeconds;
let starRating;
let startTime, endingTime;
let timer = new Timer();

function createDeckHTML(cards) {
  let deck = document.querySelector(".deck");

  cards.forEach(card => {
    let li = document.createElement("li");
    li.addEventListener("click", clickCard, false);
    li.className = "card";
    let i = document.createElement("i");
    i.className = card;
    deck.appendChild(li).appendChild(i);
  });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function addCardToOpen(card) {
  openCards.push(card);
}

function addMatchClass() {
  let flippedCards = document.querySelectorAll(".card.open.show");
  flippedCards.forEach(card => {
    card.classList.add("match");
  });
}

function addMove() {
  moveCount += 1;
}

function addToMatchedCards() {
  openCards.forEach(card => {
    matchedCards.push(card);
  });
  emptyOpenCards();
}

function checkIfWinner() {
  if (compareCards(openCards)) {
    addToMatchedCards();
    addMatchClass();
    removeFromOpenCards();
  } else {
    setTimeout(flipBack, 700);
  }
}

function clickCard(event) {
  let card = event.target;
  if (isClickable(card)) {

    displayCard(card);
    addCardToOpen(card.firstElementChild.classList.value);
    addMove();
    displayMoveCount();

    if (openCards.length === 2) {
      checkIfWinner();
      if (moveCount === 18 || moveCount === 34) {
        removeStar();
      }
      isGameOver();
    }
  }
}

function compareCards(cards) {
  let card1 = cards[0];
  let card2 = cards[1];

  return card1 === card2 ? true : false;
}

function displayCard(card) {
  card.classList.add("open", "show");
}

function displayMoveCount() {
  let moves = document.querySelector(".moves");
  moves.innerHTML = moveCount;
}

function displayStarRating() {
  if (moveCount <= 16) {
    starRating = 3;
  } else if (moveCount <= 32) {
    starRating = 2;
  } else {
    starRating = 1;
  }
  return starRating;
}

function displayWinningMessage() {
  let theModal = document.querySelector(".modal");
  theModal.classList.add("is-active");

  let gameDetails = document.querySelector(".modal-card-body");
  let gameStats = `It took you ${moveCount} moves and ${totalTime()} seconds.
      Your star rating is ${displayStarRating()}.
      Would you like to play again to try to better your score?`;
  gameDetails.innerHTML = gameStats;

  let playAgainButton = document.querySelector(".button.is-success");
  let closeButton = document.querySelector('button.delete');

  playAgainButton.addEventListener('click', function() {
    theModal.classList.remove("is-active");
    startGame();

  });

  closeButton.addEventListener('click', function() {
    theModal.classList.remove("is-active");
  });
}

function emptyOpenCards() {
  openCards = [];
}

function flipBack() {
  let flippedCards = document.querySelectorAll(".card.open.show");
  flippedCards.forEach(card => {
    card.classList.remove("open", "show");
  });
  removeFromOpenCards();
}

function isClickable(card) {
  if (openCards.length === 2) {
    return false;
  } else if (isGameOff) {
    return false
  } else if (card.classList.contains("open")) {
    return false;
  } else {
    return true;
  }
}

function isGameOver() {
  if (matchedCards.length === 16) {
    stopTimer();
    totalSeconds = totalTime();
    displayWinningMessage();
  }
}

function moves() {
  return moveCount;
}

function removeFromOpenCards() {
  emptyOpenCards();
}

function removeStar() {
  let star = document.querySelector(".stars").lastElementChild;
  star.parentNode.removeChild(star);
}

function startToRefresh() {
  let startH2 = document.querySelector("header").lastElementChild;
  let startButton = document.querySelector(".start");

  startButton.innerHTML = "Restart";
  startH2.innerHTML = "Press 'RESTART' to play again";
}

function startGame() {
  timer.reset();
  deckHTML.innerHTML = "";
  openCards = [];
  matchedCards = [];
  moveCount = 0;
  displayMoveCount();
  isGameOff = false;
  createDeckHTML(shuffle(cardDeck)); // add shuffle before final..shuffle off for testing
  startTimer();
  startToRefresh();
  threeStarsToStart();
  timer.start(); // easyTimer
}

function startTimer() {
  startTime = performance.now();
}

function stopTimer() {
  endingTime = performance.now();
}

function totalTime() {
  return Math.ceil((endingTime - startTime) / 1000);
}

// if all cards have matched, display a message with the final score (put this
// functionality in another function that you call from this one)
function threeStarsToStart() {
  let threeStars = document.querySelector('.stars');
  let threeStarsHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
  threeStars.innerHTML = threeStarsHTML;
}

let timerClock = document.getElementById('basicUsage');
timer.addEventListener('secondsUpdated', function(e) {
  timerClock.innerHTML = timer.getTimeValues().toString();
});

let startButton = document.querySelector(".start");
startButton.addEventListener("click", startGame, false);
