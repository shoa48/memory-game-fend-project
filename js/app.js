/*
* Create a list that holds all of your cards
*/
// import swal from 'sweetalert';
let card = document.getElementsByClassName("card");
let cards = [...card];
const deck = document.querySelector('.deckk');
let moveCounter = document.getElementById("moves");
let moves;
let stars;
let matched;
var openedCards = [];

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

document.body.onload = newGame();
function newGame() {
	let shflCards = shuffle(cards);
/*	
* reset the cards, moves, timer
* loop through each card and create its HTML
* add each card's HTML to the page
*/
	deck.innerHTML = "";
	for (var i = 0; i < shflCards.length; i++){
		deck.appendChild(shflCards[i]);
		shflCards[i].classList.remove("show", "open", "match", "disabled");
	}
	moves = 0;
	moveCounter.innerHTML = moves;
	var starUl = document.querySelector(".stars");
	for (i= stars; i<3; i++){
		console.log(stars);
		var starLi = document.createElement('li');
		starLi.innerHTML = '<li><i class="fa fa-star"></i></li>';
		starUl.appendChild(starLi);
	}
	stars=3;
	second = 0;
	minute = 0; 
	var timer = document.querySelector(".time");
	timer.innerHTML = "00:0";
	clearInterval(interval);
	startTimer();
	matched=0;
}

var showCard = function (evt){
	var selectedCard = evt.target;
	selectedCard.classList.add('open');
	selectedCard.classList.add('show');
	selectedCard.classList.add('disabled');
};

var openCard = function (evt){
	var selectedCard = evt.target;
	openedCards.push(selectedCard);
	var length = openedCards.length;
	if(length == 2){
		movesInc();
	if(openedCards[0].innerHTML === openedCards[1].innerHTML){
		match();
	} else {
		noMatch();
	}
}};

function match() {
	matched++;
	openedCards[0].classList.add("match","disabled");
	openedCards[1].classList.add("match","disabled");
	openedCards[0].classList.remove("show", "open");
	openedCards[1].classList.remove("show", "open");
	openedCards = [];
	if(matched==8) {
		gameFinished();
	}
}

function noMatch(){
	openedCards[0].classList.add("unmatched","disabled");
	openedCards[1].classList.add("unmatched","disabled");
	disable();
	setTimeout(function(){
		openedCards[0].classList.remove("show", "open","unmatched","disabled");
		openedCards[1].classList.remove("show", "open", "unmatched","disabled");
		enable();
		openedCards = [];
	},450);
}
/**
* @description count the moves
*/
function movesInc() {
	moves++;
	moveCounter.innerHTML = moves;
	if(moves == 14) {
		removeStar();
	}
	if(moves == 24) {
		removeStar();
	}
}
/**
* @description remove one star and sutract stars
*/
function removeStar() {
	var filledStar = document.querySelector(".fa-star");
	filledStar.parentNode.removeChild(filledStar);
	stars -=1;
}

var second = 0, minute = 0;
var timer = document.querySelector(".time");
var interval;
function startTimer(){
	interval = setInterval(function(){
		timer.innerHTML = minute+":"+second;
		second++;
		if(second == 60){
			minute++;
			second=0;
		}
	},1000);
}

for (var i = 0; i < cards.length; i++){
	let card=cards[i];
	card.addEventListener("click", showCard);
	card.addEventListener("click", openCard);
}

/*
* PopUp messages from: https://sweetalert.js.org
*/
function gameFinished(){
	clearInterval(interval);
	console.log(interval);
	swal({
		title: "Good job! You Won!",
		text: "with "+moves+" moves and "+stars+" stars.\n Within "+minute+" mins and "+second+" secs",
		icon: "success",
		button: "Play Again!",
		}).then((playAgain) => {
		if (playAgain) {
			newGame();
		}
	});	
}



/**
* @description disable cards temporarily
* source:https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript
*/
function disable() {
	let card = document.getElementsByClassName("card");
	Array.prototype.filter.call(card, function (card) {
	card.classList.add("disabled");
	});
}
/**
* @description enable cards and disable matched cards
*/
function enable() {
	let card = document.getElementsByClassName("card");
	Array.prototype.filter.call(card, function (card) {
	card.classList.remove("disabled");
	});
}