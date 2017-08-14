var allLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var words = ['abide', 'bunny', 'beverage', 'dude', 'rug', 'nihilist', 'bowling', 'prince', 'housebroken', 'undies', 'sarsaparilla', 'strumpet', 'fascist', 'coitus', 'zesty', 'marmot', 'walrus', 'cleft', 'aggression', 'pacifism', 'vagrant', 'moonless'];
var currentWord = words[Math.floor(Math.random() * words.length)];
var guessWord = ""; //empty string to hold guesses
var guesses = currentWord.length+3; //remaining guesses
var lettersGuessed = [];
var wins = 0;
var losses = 0;

for (var i = 0; i < currentWord.length; i++) {
  guessWord = guessWord + "_";
}

console.log(currentWord); //hint

document.querySelector('#game').innerHTML = 
"Current word:<br>" + guessWord +
"<br><br> Number of guesses:<br>" + guesses +
"<br><br> Letters already guessed:<br>" + lettersGuessed +
"<br>";

document.querySelector('#stats').innerHTML = 
"Wins:<br>" + wins +
"<br><br>Losses:<br>" + losses;

function swapLetter(str, i, userInput) {
    if(i > str.length-1) {
      return str;
    }
    return str.substr(0, i) + userInput + str.substr(i + 1);
}

function reset() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  guessWord = "";
  for (var i = 0; i < currentWord.length; i++) {
  guessWord = guessWord + "_";
  }
  guesses = 10;
  lettersGuessed = [];
  console.log(currentWord);
}

document.onkeyup = function(event) {

  var userInput = event.key;
  // var inWord = false;

  if ((allLetters.includes(userInput)) === false) {
    alert("Please select a letter from a-z");
  }

  if (lettersGuessed.indexOf(userInput) != -1) {
    return("You already guessed that one!");
  }

  else {

  for (var i = 0; i < currentWord.length; i++) {
    
    if (userInput == currentWord[i]) {
      guessWord = swapLetter(guessWord, i, userInput);
      // inWord = true;
    }
    
  }

    if (userInput != currentWord[i]) {
      lettersGuessed.push(userInput);
      guesses--;
    }
  }


    if (guesses < 1) {
      alert("You human paraquat!");
      losses++;
      reset();
    }

    if (guessWord.indexOf("_") === -1) {
      alert("The Dude abides!");
      wins++;
      reset();
    }

  var html = 
  "Current word:<br>" + guessWord +
  "<br><br> Number of guesses:<br>" + guesses +
  "<br><br> Letters already guessed:<br>" + lettersGuessed;
  // "<br><br>Wins:<br>" + wins +
  // "<br><br>Losses:<br>" + losses;
  document.querySelector('#game').innerHTML = html;

  var html =
  "Wins:<br>" + wins +
  "<br><br>Losses:<br>" + losses +
  "<br>";
  document.querySelector('#stats').innerHTML = html;

}








