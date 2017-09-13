/*jshint esversion: 6 */
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

class Game {
  constructor() {
    this.tempOpenCards = [];
    this.matchedCards = [];
    this.numberCardsFlipped = 0;
    this.moveCount = 0;
    this.deck = Game.cardDeck;
  }

  static get cardDeck() {
    return cardDeck;
  }

  get count() {
    return Math.floor((this.moveCount / 2));
  }

  set count(value) {
    this.moveCount = this.moveCount + value;
  }

  addMatchedCards(cards) {
    this
      .matchedCards
      .push(cards.splice(0, 2));
  }

  addOneMove() {
    this.moveCount += 1;  
  }

  clickCard(event) {
    // event.target.classList.add("open", "show", "flipped"); let card =
    // event.target.children[0].className;
    let card = event.target;
    card.classList.add("open", "show", "flipped", "no-match");
    let cardClass = event.target.children[0].className;
    this.tempOpenCards.push(cardClass);

    this.isWinner(card);
    // this.loser();
    this.count = 1;
    this.updateMovesHTML();
    this.isArrayFull();
    // console.log("card", card); console.log("hereeee", event.target.className);
    // console.log(event.target.value);
  }

  compareCards(cards) {
    return cards[0] === cards[1] ? true : false;
    //lockOpen();
    }

    // disableClick() {   this.deck.forEach(() => {     li.remove   }); }

    emptyTempCards(cards) {
    cards = [];
  }

  createDeckHTML(cards) {
    let deck = document.querySelector(".deck");

    cards.forEach((card) => {
      let li = document.createElement("li");
      li.addEventListener("click", (event) => this.clickCard(event), false);
      li.className = "card";
      let i = document.createElement("i");
      i.className = card;

      deck.appendChild(li).appendChild(i);
    });
  }

  flipCardsToBlack() {
    return Promise((resolve) => {
      resolve();
      setTimeout(() => {
        let el3 = document.querySelectorAll("li.flipped")[0];
        let el4 = document.querySelectorAll("li.flipped")[1];
        el3.classList.remove("open", "show", "flipped");
        el4.classList.remove("open", "show", "flipped");
        // this.tempOpenCards = []; console.log("hi"); console.log("matched else if
        // setTime", this.matchedCards); console.log("temp open cards else if setTime",
        // this.tempOpenCards);
      }, 2000);
    });
  }

  isArrayFull() {
    if (this.matchedCards.length === 8) {
      console.log("Array is FULL");
    }
  }

  reset() {
    this.moveCount = 0;
    let deck = document.querySelector(".deck");
    let startButton = document.querySelector("header button");
    startButton.addEventListener("click", () => {
      this.createDeckHTML(this.deck);
    });
  }

  // Shuffle function from http://stackoverflow.com/a/2450976
  shuffle(array) {
    var currentIndex = array.length,
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

  

  startTimer() {
    let startTime = performance.now();
    return startTime;
  }

  stopTimer(startTime) {
    let stopTime = performance.now();
    let gameTime = stopTime - startTime;
    return gameTime;
  }
  

  

  // disableClick() {
  //   // idea from: http://jsfiddle.net/yahavbr/ByM6h/
  //   let allCards = document.querySelectorAll(".card .li");
  //   allCards.forEach((card) => {
  //     card.classList.remove("card li");
  //     window.setTimeout(() => {
  //       card.classList.add("card li");
  //     }, 2000);
  //   });
  // }

  updateMovesHTML() {
    let movesHTML = document.querySelector(".moves");
    movesHTML.innerHTML = this.count;
  }

  isWinner(card) {
    if (this.tempOpenCards.length === 2 && this.compareCards(this.tempOpenCards)) {
      this.addMatchedCards(this.tempOpenCards);
      let el1 = document.querySelectorAll("li.flipped")[0];
      let el2 = document.querySelectorAll("li.flipped")[1];
      console.log(el1.classList);
      el1.classList.remove("no-match");
      // // el1.classList.add("match");
      el2.classList.remove("no-match");
      // el2.classList.add("match");
      console.log("matched cards if", this.matchedCards);
      console.log("temp open cards if", this.tempOpenCards);
    } else if (this.tempOpenCards.length === 2) {
      // let el3 = document.querySelectorAll("li.flipped")[0];
      // let el4 = document.querySelectorAll("li.flipped")[1];
        //remove click event listener
      let cards = document.querySelectorAll("li.no-match");
      setTimeout(() => {
        cards.forEach((card) => {
          card.classList.remove("open", "show");
        });
        this.tempOpenCards = [];
      }, 500);
  
        
        // this.emptyTempCards(this.tempOpenCards);
        console.log("matched cards else if", this.matchedCards);
        console.log("temp open cards else if", this.tempOpenCards);
    }
  }
} // close class Game

// need to shuffle, but for testing easier to know where cards are
document.addEventListener("DOMContentLoaded", () => {
  let game = new Game();
  game.reset();
});