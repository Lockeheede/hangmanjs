let word = prompt("Welcome to Hangman! Player 1, please enter a word for Player 2 to guess").toUpperCase();

let revealedLetters = new Array(word.length);
revealedLetters.fill(false);

let guess;

const maxStrikes = 6;
let strikes = 0;

let strikeLetters = new Array(maxStrikes);

drawWordProgress();
processGuess();

function drawStrikeLetters() {

}

function drawWordProgress(guess) {
    let str = '';

    for (let letter of word) {
        if (letter == guess) {
            str += letter;
        } else {
            str += '-';
        }
    }

    alert(str);
}

function drawGallows() {

}

function processGuess() {
    alert("The current word has " + word.length + " letters!");

    while (strikes < maxStrikes) {
        let guess = prompt("Player 2, guess a letter").toUpperCase();

        if (word.includes(guess)) {
            alert("That letter is correct!");
            drawWordProgress(guess);
           
        } else {
            alert("That letter is incorrect!");
            drawGallows();
            strikes++;
            drawStrikeLetters();
        }

        if (strikes < maxStrikes) {

        } else {
            alert("The game is over!");
        }
    }
}