var allLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var words = ['abide', 'bunny', 'beverage', 'golfer', 'dude', 'rug', 'brevity', 'pederast', 'nihilist', 'bowling', 'prince', 'housebroken', 'undies', 'strumpet', 'fascist', 'coitus', 'zesty', 'marmot', 'walrus', 'cleft', 'aggression', 'pacifism', 'vagrant', 'moonless', 'ethos'];
var currentWord = words[Math.floor(Math.random() * words.length)];
var guessWord = ""; //empty string to hold guesses
var guesses = currentWord.length + 5; //remaining guesses
var lettersGuessed = []; //empty array to hold incorrect letters
var wins = 0; //wins counter
var losses = 0; //losses counter

for (var i = 0; i < currentWord.length; i++) {
  guessWord = guessWord + "_";
}

document.querySelector('#game').innerHTML =
"Current word:<br>" + guessWord +
"<br><br> Guesses remaining:<br>" + guesses +
"<br><br> Letters guessed:<br>" + lettersGuessed +
"<br>";

document.querySelector('#stats').innerHTML =
"Strikes:<br>" + wins +
"<br><br>Gutters:<br>" + losses;

function swapLetter(str, i, userInput) {
    if (i > str.length - 1) {
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
  guesses = currentWord.length + 5;
  lettersGuessed = [];
}

function initiateTimeout() {
  setTimeout(() => {
    document.querySelector('#message-area').innerHTML = ""
  }, 1000);
}

//popup: win
var modalWin = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1'],
    onOpen() {
      console.log(guessWord)
    },
});

//popup: lose
var modalLose = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-2'],
});

modalWin.setContent(`
    <h1>Far out, man.<br>Far ******* out!</h1>
    <br>
    <iframe src="https://giphy.com/embed/KmIhbVZSsOGpq" width="480" height="286" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    <br><br>
    <em>[close to try another one]</em>
    <br>
`);

modalLose.setContent(`
    <h1>You...human paraquat!</h1>
    <br>
    <iframe src="https://giphy.com/embed/vxa4nwnjQ51za" width="240" height="240" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    <br><br>
    <em>[close to try another one]</em>
    <br>
`);

document.addEventListener('keyup', function(event) {
  var userInput = event.key;
  var correct = false;

  if (!allLetters.includes(userInput) && userInput !== 'Escape') {
    document.querySelector('#message-area').innerHTML = "Please select a letter from a-z";

    initiateTimeout();
  }

  if (lettersGuessed.indexOf(userInput) !== -1 || guessWord.includes(userInput)) {
    document.querySelector('#message-area').innerHTML = "You already guessed that one!";

    initiateTimeout();
  }

  for (var i = 0; i < currentWord.length; i++) {
    if (userInput == currentWord[i]) {
      guessWord = swapLetter(guessWord, i, userInput);
      correct = true;
    }
  }

  if (!correct && allLetters.includes(userInput) && !lettersGuessed.includes(userInput)) {
      lettersGuessed.push(userInput);
      guesses--;
  }

  if (guesses < 1) {
    modalLose.open();
    losses++;
    reset();
  }

  if (guessWord.indexOf("_") === -1) {
    modalWin.open();
    wins++;
    reset();
  }

  var html =
  "Current word:<br>" + guessWord +
  "<br><br> Guesses remaining:<br>" + guesses +
  "<br><br> Letters guessed:<br>" + lettersGuessed +
  "<br>";
  document.querySelector('#game').innerHTML = html;

  var html =
  "Strikes:<br>" + wins +
  "<br><br>Gutters:<br>" + losses +
  "<br>";
  document.querySelector('#stats').innerHTML = html;
});
