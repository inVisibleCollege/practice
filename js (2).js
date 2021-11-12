// Challenge 1: Age in Days

function ageInDays() {
  var birthYear = prompt("What is your Birth Year?");
  var AgeInDayss = (2021 - birthYear) * 365;
  var h1 = document.createElement(`h1`);
  var textAnswer = document.createTextNode(
    "You are " + AgeInDayss + " days old."
  );
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("Flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageInDays").remove();
}

//Challenge 2: Cat Generator
function generateCat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src = "https://cdn2.thecatapi.com/images/e7a.jpg";
  div.appendChild(image);
}

//reload date.time
document.getElementById("date").innerHTML = "Reloaded Last: " + Date();

//Challenge 3: Paper, Rock, Scissors
function rpsGame(yourChoice) {
  console.log(yourChoice);
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randomToRpsInt());
  console.log("Computer Choice:", botChoice);
  results = decideWinner(humanChoice, botChoice);
  console.log(results);
  var message = finalMessage(results);
  console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
  console.log(message);
}

function randomToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    rock: { scissor: 1, rock: 0.5, paper: 0 },
    paper: { scissor: 0, paper: 0.5, rock: 1 },
    scissor: { paper: 1, scissor: 0.5, rock: 0 },
  };
  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];
  return [yourScore, computerChoice];
}

function finalMessage([yourScore]) {
  if (yourScore === 0) {
    return { message: "You Lost", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "You Tied", color: "yellow" };
  } else {
    return { message: "You Won", color: "green" };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imageDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissor: document.getElementById("scissor").src,
  };
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissor").remove();

  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src='" +
    imageDatabase[humanImageChoice] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>";
  messageDiv.innerHTML =
    "<h1 style='color: " +
    finalMessage["color"] +
    "; font-size: 6-px; padding: 30px; '>" +
    finalMessage["message"] +
    "</h1>";
  botDiv.innerHTML =
    "<img src='" +
    imageDatabase[botImageChoice] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

function Replay() {
  window.location.reload(true);
}
//
//
//challenge 4: Change the Color of all Buttons
//
//
var all_buttons = document.getElementsByTagName("button");

var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === "red") {
    buttonsRed();
  } else if (buttonThingy.value === "green") {
    buttonGreen();
  } else if (buttonThingy.value === "reset") {
    buttonColorReset();
  } else if (buttonThingy.value === "random") {
    randomColors();
  }
}

function buttonsRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}

function buttonGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}

function buttonColorReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randomColors() {
  var choices = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];
  for (let i = 0; i < all_buttons.length; i++) {
    var randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}
//
//
// Challenge 5: Black Jack
//
//

//blackjackGame variable associate "you" and "dealer" with pieces of the HTML. The you and dealer variable are symetrical.
// blackjackGame is sort of (what i call) a matrix variable
let blackjackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  // cards creates an array that we select randomMath from for both you and dealer.
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  //mapping numeric value to card value
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnsOver: false,
};

//forms simply variables that hold the associated HTML pieces from backgameGame function
const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

//adds sounds to the hit button in function showCard, also for wins and loss
const hitSound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const lossSound = new Audio("static/sounds/aww.mp3");

//grabs the hit button and adds a event listener "click" to it that runs function blackjackHit()
document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);

//grabs the stand button and adds a event listener "click" to it that runs function dealerLogic()
document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);

//grabs the deal button and adds an event listener "click" to it that runs function blackjackDeal()
document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

//runs on click of blackjack button, creates "card" variable equal to function randonCard() to store random number and fill the Card varible with the Cards array in BlackjackGame variable array.
function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

//creates a selection of a random card nested in the card variable (above), first it creates a random number, then returns the array of cards based on the random index; this is passed back to the showCard function created under blackjackHit(). it is passed back through the card variable that is part of the showCard().
function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

//creates a new function to display the card, associates "card" with the images stored in images file; then adds this image to the activeplayer["div"]
function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

//selects all images in the your-box div, also selects all the images in the dealer-box div. then runs a loop to delete images to act as a reset for the game
function blackjackDeal() {
  //button function on this if-block
  if (blackjackGame["turnsOver"] === true) {
    blackjackGame["isStand"] = false;
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    for (i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    for (i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }
    //resets the score on click button labeled deal, in the background
    YOU["score"] = 0;
    DEALER["score"] = 0;

    //resets the score on click button labeled deal, in the user interface (frontend)
    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;
    document.querySelector("#your-blackjack-result").style.color = "white";
    document.querySelector("#dealer-blackjack-result").style.color = "white";

    document.querySelector("#blackjack-result").textContent = "Let's Play";
    document.querySelector("#blackjack-result").style.color = "black";

    blackjackGame["turnsOver"] = true;
  }
}

//
//Part 2 - add scoring
//NOTE: coding in A's (1 or 11) -- if adding 11 to score keeps player under 21, then add 11. otherwise, add 1

function updateScore(card, activePlayer) {
  if (card === "A") {
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    //BUST (>21) logic with red styling
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//replicates card and score for the dealer side
async function dealerLogic() {
  blackjackGame["isStand"] = true;

  while (DEALER["score"] < 16 && blackjackGame["isStand"] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }
  blackjackGame["turnsOver"] = true;
  let winner = computeWinner();
  showResult(winner);
}

//how to determine a win
//compute winner and return who won
//update the wins/draws/losses table
function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    //condition: higher score than dealer or when dealer busts and you are under 21, || = OR
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      blackjackGame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      blackjackGame["losses"]++;
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      blackjackGame["draws"]++;
    }

    //condition:when user busts but dealer doesn't AND statement (&&)
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    blackjackGame["losses"]++;
    winner = DEALER;

    //condition: when you and the dealer bust
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blackjackGame["draws"]++;
  }

  console.log(blackjackGame);
  return winner;
}

function showResult(winner) {
  if (blackjackGame["turnsOver"] === true) {
    let message, messageColor;
    if (winner === YOU) {
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = "You Won";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector("#losses").textContent = blackjackGame["losses"];
      message = "You Lost";
      messageColor = "red";
      lossSound.play();
    } else {
      document.querySelector("#draw").textContent = blackjackGame["draws"];
      message = "You Drew";
      messageColor = "black";
    }

    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
}
