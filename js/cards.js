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
    this.moveCount = 0;
    this.deck = Game.cardDeck;
  }

  static get cardDeck() {
    return cardDeck;
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

  createDeckHTML(cards) {
    let deck = document.querySelector(".deck");

    cards.forEach((card) => {
      let li = document.createElement("li");
      li.addEventListener("click", event => this.clickCard(event), false);
      li.className = "card";
      let i = document.createElement("i");
      i.className = card;
      deck
        .appendChild(li)
        .appendChild(i);
    });
  }

  clickCard(event) {
    event.target.classList.add("open", "show");
    let card = event.target.children[0].className;
    this.tempOpenCards.push(card);

    this.winner();
    this.addOneMove();
    this.updateMovesHTML();    
    // console.log("card", card); console.log("hereeee", event.target.className);
    // console.log(event.target.value);
  }


  compareCards(cards) {
    return cards[0] === cards[1] ? true : false;
    //lockOpen();
  }

  emptyTempCards(cards) {
    cards = [];
  }

  addMatchedCards(cards) {
    this.matchedCards.push(cards.splice(0, 2));
  }

  addOneMove() {
    this.moveCount += 1;
  }

  updateMovesHTML() {
    let movesHTML = document.querySelector(".moves");
    movesHTML.innerHTML = this.moveCount;
  }

  winner() {
    if (this.tempOpenCards.length === 2 && this.compareCards(this.tempOpenCards)) {
      this.addMatchedCards(this.tempOpenCards);
      console.log("matched cards", this.matchedCards);
      console.log("temp open cards", this.tempOpenCards);
    } else if (this.tempOpenCards.length === 2) {
      this.emptyTempCards(this.tempOpenCards);
      console.log("matched cards", this.matchedCards);
      console.log("temp open cards", this.tempOpenCards);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let game = new Game();
  game.createDeckHTML(game.deck);
});