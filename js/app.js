//Variables
let time = 0;
let timerId = 0;
let timerOut = true;
let moves = 0;
let heartCount = 3;
let openCard = [];
let matched = [];

//Elements in a variable
const timer = document.querySelector("#timer");
const restart = document.querySelector("#restart");
const mover = document.querySelector("#moves");
const cards = document.querySelectorAll(".card");
const hearts = document.getElementById("heart");
 
//call function
startGame(); 
startMatch();


//////////////////////////////////////////////////////////////////////
//this function shuffle cards
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


//this function to startGame with shuffle cards
 function startGame () {
const deck = document.querySelectorAll(".card");
let arrCards = Array.from(deck);
let shuffledCards = Array.from(Array(arrCards.length).keys());
shuffle(shuffledCards);
arrCards.forEach((arrCard, index) =>{
arrCard.style.order = shuffledCards[index];});
}


//this function to close cards when restart
const removeCard = () =>{
    for (let cards of deck.children)
    {
        cards.classList.remove("open", "match");
    }
}



//////////////////////////////////////////////////////////////////////
//use this function to start the timer
const startTime = () => {
    timerOut = false;
    timerId  = setInterval(() => {
        time++; 
        timerCount();}, 1000);
 }


//this function update the timer values
const timerCount = () => {
    const min = Math.floor(time/60);
    const sec = time % 60;
    if (sec < 10)
    {
        timer.innerHTML =`${min}:0${sec}`;
    }
    else {
        timer.innerHTML = `${min}:${sec}`;
    }
}


//this function stop the timer count
const stopClock = () => {
    clearInterval (timerId);
    timerOut = true;
    timerCount();
}



//////////////////////////////////////////////////////////////////////
// Counter of moves
const movesCounter = () => {
    moves++;
        mover.innerHTML =`${moves}moves`;
       // mover.innerHTML = parseInt(mover.innerHTML) + 1 +  "moves"; 
        heartRating();
     }


     // heart rating when 
function heartRating() {
	if (moves === 16) {
		hearts.children[2].firstElementChild.classList.remove("bi-heart-fill", "bi");
		heartCount--;
	}
	if (moves === 24) {
		hearts.children[1].firstElementChild.classList.remove("bi-heart-fill", "bi");
		heartCount--;
	}
    if (moves === 36) {
		hearts.children[0].firstElementChild.classList.remove("bi-heart-fill", "bi");
		heartCount--;
	}
}


// when finish game appear alert massage
function winGame() {
if (matched.length === 16) {
		stopClock();
        alert("Congratulations!! you won" + "🍺" + " with "   
        + moves + " moves " + heartCount + " hearts " + time + " sec");
	}
}


// when press restart the game will be agin game
function resetEverything() {
    clearInterval (timerId);
    timerOut = true;
    time = 0;
    timerCount();
    hearts.children[0].firstElementChild.classList.add("bi-heart-fill", "bi");
    hearts.children[1].firstElementChild.classList.add("bi-heart-fill", "bi");
    hearts.children[2].firstElementChild.classList.add("bi-heart-fill", "bi");
	heartCount = 3;
    moves = 0;
    mover.innerHTML =`${moves}moves`;
    openCard = [];
	matched = [];
	removeCard();
	startGame();
}


// here function to open cards and compar between them if matched or not
function startMatch (){
    for (const element of cards)
  {
    element.addEventListener("click", function(event){   
    event.target.classList.add("open");
    openCard.push(event.target);
    var len = openCard.length;
        if(len === 2){
         match();
         movesCounter();
        }
        if(timerOut){
            startTime(); 
            } 
            setTimeout(() =>{
            winGame();
        }, 900)
  } );
  
  }
}

  const match = () =>{
	if (openCard[0].children[0].className == openCard[1].children[0].className) {
        openCard[0].classList.add("match");
        openCard[1].classList.add("match");
        matched.push(...openCard);
        openCard=[];
    }
  else{
      setTimeout(() =>{
        openCard[0].classList.remove("open");
        openCard[1].classList.remove("open");
        openCard=[]}, 500)
    } 
};


//....................................................................................................//
// event listener
restart.addEventListener("click", function(){
    resetEverything();
});
