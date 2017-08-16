var allLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var words = ['abide', 'bunny', 'beverage', 'dude', 'rug', 'nihilist', 'bowling', 'prince', 'housebroken', 'undies', 'strumpet', 'fascist', 'coitus', 'zesty', 'marmot', 'walrus', 'cleft', 'aggression', 'pacifism', 'vagrant', 'moonless'];
var currentWord = words[Math.floor(Math.random() * words.length)];
var guessWord = ""; //empty string to hold guesses
var guesses = currentWord.length+5; //remaining guesses
var lettersGuessed = []; //empty array to hold incorrect letters
var wins = 0;
var losses = 0;

for (var i = 0; i < currentWord.length; i++) {
  guessWord = guessWord + "_";
}

console.log(currentWord); //hint

document.querySelector('#game').innerHTML = 
"Current word:<br>" + guessWord +
"<br><br> Guesses remaining:<br>" + guesses +
"<br><br> Letters guessed:<br>" + lettersGuessed +
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
  guesses = currentWord.length+5;
  lettersGuessed = [];
  console.log(currentWord);
}

var modalAZ = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
      return false; // nothing happens
    }
});

var modalWin = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
      return false; // nothing happens
    }
});

var modalLose = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-2'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
      return false; // nothing happens
    }
});

var audioLose = new Audio('../audio/dios_mio_man.mp3');

modalAZ.setContent('<h1>Please select a letter from a-z.</h1>');
// modalWin.setContent('<h1>Far out, man. Far ******* out!</h1>');
modalWin.setContent('<h1>Far out, man. Far ******* out!</h1><br><iframe src="https://giphy.com/embed/pWP6AQg2KMc2Q" width="240" height="232" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>');
modalLose.setContent('<h1>You human paraquat!</h1><br><iframe src="https://giphy.com/embed/vxa4nwnjQ51za" width="240" height="240" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>');

document.onkeyup = function(event) {

  var userInput = event.key;
  var inWord = false;

  if ((allLetters.includes(userInput)) === false) {
    // alert("Please select a letter from a-z");
    modalAZ.open();
  }

  if (lettersGuessed.indexOf(userInput) != -1) {
    return("You already guessed that one!");
  }

  for (var i = 0; i < currentWord.length; i++) {
    
    if (userInput == currentWord[i]) {
      guessWord = swapLetter(guessWord, i, userInput);
      inWord = true;
    }

  }

  // if ((userInput != currentWord[i]) && (allLetters.includes(userInput))) {
  //     lettersGuessed.push(userInput);
  //     guesses--;
  //   }

  if (!inWord && allLetters.includes(userInput)) {
      lettersGuessed.push(userInput);
      guesses--;
    }

  if (guesses < 1) {
    // alert("You human paraquat!");
    modalLose.open();
    audioLose.play();
    losses++;
    reset();
  }

  if (guessWord.indexOf("_") === -1) {
    // alert("Far out, man. Far ******* out!");
    modalWin.open();
    wins++;
    reset();
  }

  // if (guessWord.length == 0) {
  //   alert("Far out, man. Far ******* out!");
  //   wins++;
  //   reset();
  // }

  var html = 
  "Current word:<br>" + guessWord +
  "<br><br> Guesses remaining:<br>" + guesses +
  "<br><br> Letters guessed:<br>" + lettersGuessed +
  "<br>";
  // "<br><br>Wins:<br>" + wins +
  // "<br><br>Losses:<br>" + losses;
  document.querySelector('#game').innerHTML = html;

  var html =
  "Wins:<br>" + wins +
  "<br><br>Losses:<br>" + losses +
  "<br>";
  document.querySelector('#stats').innerHTML = html;

}








