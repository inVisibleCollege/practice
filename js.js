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

function numberToChoice (number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = { 
    "rock": {"scissor": 1, "rock": 0.5, "paper": 0},
    "paper": {"scissor": 0, "paper": 0.5, "rock": 1}, 
    "scissor": {"paper": 1, "scissor": 0.5, "rock": 0},
  }
  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];
  return[yourScore,computerChoice];
}

function finalMessage([yourScore]){
  if (yourScore === 0) {
    return {"message": "You Lost","color":"red"};
  } else if (yourScore === 0.5) {
    return {"message": "You Tied","color":"yellow"};
  } else {
    return {"message": "You Won","color":"green"};
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage)
 {
  var imageDatabase = 
  {
    "rock": document.getElementById("rock").src,
    "paper": document.getElementById("paper").src,
    "scissor": document.getElementById("scissor").src
  }
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissor").remove();

  var humanDiv = document.createElement("div"); 
  var botDiv = document.createElement("div"); 
  var messageDiv = document.createElement("div"); 

  humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>"; 
  messageDiv.innerHTML = "<h1 style='color: " + finalMessage ['color'] + "; font-size: 6-px; padding: 30px; '>" + finalMessage["message"] + "</h1>"; 
  botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);

}

function Replay() {
  window.location.reload(true);
}

