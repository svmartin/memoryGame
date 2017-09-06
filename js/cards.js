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

class Cards {
  constructor() {

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
    // let cards = '';
    let deck = document.querySelector(".deck");

    cards.forEach((card) => {
      let li = document.createElement("li");
      li.addEventListener("click", clickCard, false);
      li.className = "card";
      let i = document.createElement("i");
      i.className = card;
      deck
        .appendChild(li)
        .appendChild(i);
    });
    // return cards;
  }
  // createDeckHTML(shuffle(cardDeck));
  
  // let tempOpenCards = [];
  // let matchedCards = [];
  // let card;
  // let moveCount = 0;

  clickCard(event) {
    event
      .target
      .classList
      .add("open", "show");
    card = event.target.children[0].className;
    tempOpenCards.push(card);

    if (tempOpenCards.length === 2 && compareCards(tempOpenCards)) {
      addMatchedCards();
      console.log("matched cards", matchedCards);
      console.log("temp open cards", tempOpenCards);
    } else if (tempOpenCards.length === 2) {
      emptyTempCards();
      console.log("matched cards", matchedCards);
      console.log("temp open cards", tempOpenCards);
    }
    addMove();
    displayMoves();

    console.log("move count", moveCount);
    // console.log("card", card); console.log("hereeee", event.target.className);
    // console.log(event.target.value);
  }

  addMatchedCards() {
    matchedCards = tempOpenCards.splice(0, 2);
  }

  emptyTempCards() {
    tempOpenCards = [];
  }

  displaySymbol() {

  }

   addCard(card) {
    openCards.push(card);
  }

  removeCard(card) {
    openCards.pop(card);
  }
}
const newDeck = Cards.cardDeck;

console.log(newDeck);