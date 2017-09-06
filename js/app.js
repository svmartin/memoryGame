/*jshint esversion: 6 */

/*
 * Create a list that holds all of your cards
 * note to self: classes: card, match,open show
 */
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
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// function createDeckHTML(deck) {
//     let cards = '';
//     deck.forEach((card) => {
//         cards += `<li class="card">`;
//         cards += `<i class="${card}"></i>`;
//         cards += `</li>`;
//     });
//     return cards;
// }
function createDeckHTML(cards) {
    // let cards = '';
    let deck = document.querySelector(".deck");
    
    cards.forEach((card) => {
        let li = document.createElement("li");
        li.addEventListener("click", clickCard);
        li.className = "card";
        let i = document.createElement("i");
        i.className = card;
        deck.appendChild(li).appendChild(i);
    });
    // return cards;
}
createDeckHTML(shuffle(cardDeck));
// let deckHTML = document.querySelector(".deck");
// deckHTML.innerHTML = createDeckHTML(shuffle(cardDeck));

// set up event listener for card
// * set up the event listener for a card.If a card is clicked : * -display the card 's symbol (put this functionality in another function that you call from this one' +
//     ')'
function clickCard() {
    console.log("I've been clicked.");
}

function displaySymbol() {

}

// * -add the card to a * list * of "open" cards(put this functionality in another function that you call from this one)
function addCard() {
    
}

function removeCard() {

}

// * -if the list already has another card,
// check to see if the two cards match * + if the cards do 
//     match,
//     lock the cards in the open position(put this functionality in another function that you call from this one)

// if the cards do 
//  not match, remove the cards from the list and hide the card 's symbol
// (put this functionality in another function that you call from this one' +
// 
function cardsMatch() {
    //lockOpen();
}

function lockOpen() {

}

// increment the move counter and display it on the page(put this functionality in another function that you call from this one)

function addMove() {

}

function displayMoves() {

}

// if all cards have matched,
// display a message with the final score(put this functionality in another function that you call from this one)
function gameOver() {

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */