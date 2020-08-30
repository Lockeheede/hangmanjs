function init() {}

let availableLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const maxStrikes = 6;
let strikes = 0;
let strikeLetters = [];

function allLetter(inputtxt) {
  var letters = /^[A-Za-z]+$/;
  if (inputtxt.match(letters)) {
    return true;
  } else {
    return false;
  }
}

function checkWord(word) {
  if (allLetter(word)) {
    if (word.length <= 10) {
      return word;
    } else {
      word = prompt('Please provide a word shorter than 10 characters.');
      checkWord(word);
    }
  } else {
    word = prompt('Please provide a valid word consisting of letters A-Z.');
    checkWord(word);
  }
}

let word = prompt(
    'Welcome to Hangman! \nPlayer 1, please enter a \nword for Player 2 to guess.'
);
while (!word) {
    word = prompt(
        "I'm sorry, I can't let you leave that easily... Input a word please :)"
  );
}
word = word.toString().toUpperCase();
checkWord(word);

let correctLetters = new Set(word);
correctLetters = Array.from(correctLetters);

drawWordProgress(word);

//change the below code to a message upon word creation
// let currentWord = document.getElementById("hangman-words");
// currentWord.innerHTML = "The current word has " + word.length + " letters!";

const formElement = document.getElementById('hangman-form');
formElement.addEventListener('submit', processGuess);

function drawStrikeLetter(letter) {
  //this will generate span elements within <div class="hangman-strikes-wrap">
  //then remove the letter from the available letters in the alphabet array
    let wrapper = document.getElementById('hangman-strikes-wrap');
    let span = document.createElement('span');
    span.className = 'strike-letter';
    span.innerHTML = letter;
    wrapper.appendChild(span);
}

function drawWordProgress(word) {
  //insert a set of <span> elements with the ids of the letters following the template guessed-letter-[letter] containing the floor sign '_' as a value
  let wordLength = word.length;
  let wrapper = document.getElementById('hangman-guess-wrap');

  for (var letter in word) {
    let span = document.createElement('span');
    let className = 'guessed-letter-' + word[letter];
    span.className = className;
    span.innerHTML = '_';
    wrapper.appendChild(span);
  }
}

function drawGallows() {
    document.getElementById('hangman-image').setAttribute("src", "images/strike-" + strikes + ".png");
}

function processGuess(event) {
  event.preventDefault();
    let inputValue = document.getElementById('guessInput').value.toUpperCase();
    document.getElementById("hangman-form").reset();
    if (inputValue.length === 1) {
        if (allLetter(inputValue)) {
            let chosenLetterIndex = availableLetters.indexOf(inputValue);
            if (chosenLetterIndex != -1) {
                //Remove inputValue from availableLetters array
                availableLetters.splice(chosenLetterIndex, 1);
                let correctLetterIndex = correctLetters.indexOf(inputValue);
                if (correctLetterIndex != -1) {
                    //Replace '_' with inputValue
                    displayMessage("That letter is correct!", 'info');
                    let span = document.getElementsByClassName('guessed-letter-' + inputValue);
                    console.log(word);
                    for (var letter in span) {
                            console.log(letter);
                            console.log(word[letter]);
                            span[letter].innerHTML = inputValue;
                        }
                    correctLetters.splice(correctLetterIndex, 1);
                } else {
                    displayMessage("That letter is incorrect!", 'warning');
                    drawStrikeLetter(inputValue);
                    strikes++;
                    drawGallows();
                }
            } else {
                displayMessage("You've already used this letter!", 'warning');
                document.getElementById("hangman-form").reset();
                return;
            } 
        } else {
            displayMessage("Please enter a valid alphabet character (A-Z).", 'warning');
            document.getElementById("hangman-form").reset();
            return;
        }
    } else {
        displayMessage("Please enter a single letter", 'warning');
        document.getElementById("hangman-form").reset();
        return;
    }
  //check if input length === 1
  //check if input is a letter
  //case: valid - check if indexOf(value) is true within the alphabet array & continuing if so
  //case: correct - check indexOf(value) against the correctLetters array & replace the innterHtml with guessed letters & remove the letter from both alphabet & correctLetter arrays
    //case: incorrect - if the correct check fails: add the span with a crossed out letter, draw the gallows, increase the strike count
    console.log(correctLetters.length);
    if (correctLetters.length == 0) {
        displayMessage('The game is over! You Win!', 'victory');
        setTimeout(resetGame, 3000);
    }

    if (strikes === maxStrikes) {
        displayMessage('The game is over! You Lose!', 'loss');
        setTimeout(resetGame, 3000);
    }
}

function resetGame() {
    //Confirmation box, question: "Play Again?". If "Ok" reload page with reload method. If "Cancel" replace contents with message "Thank You For Playing The Game!"
    if (confirm("Play Again?")) {
        location.reload();
    } else {
        let wrapper = document.getElementById('hangman-wrap');
        let endGame = "Thank You For Playing The Game! Click Refresh To Restart The Game!";
        let span = document.createElement('span');
        span.className = 'end-game';
        span.innerHTML = endGame;
        while (wrapper.hasChildNodes()) {
            wrapper.removeChild(wrapper.firstChild);
        }
        wrapper.appendChild(span);
    }
}

function displayMessage(message, type) {
    //define element
    let messageDiv = document.getElementById('hangman-message');
    messageDiv.innerHTML = message;
    let className;
    switch (type) {
        case 'info':
            className = 'message-info';
            break;
        case 'warning':
            className = 'message-warning';
            break;
        case 'victory':
            className = 'message-victory';
            break;
        case 'loss':
            className = 'message-loss';
            break;
    }
    messageDiv.className = className;
}

// let alphabet = []
// let word = [[],[],[],[],[]]
// let correctLetters = new Set(word)
// let strikeLetters = []
