
    let word = prompt("Welcome to Hangman! Player 1, please enter a word for Player 2 to guess").toUpperCase();

    let revealedLetters = new Array(word);
    revealedLetters.fill(false);

    const maxStrikes = 6;
    let strikes = 0;

    let strikeLetters = new Array(maxStrikes);

    let currentWord = document.getElementById("hangman-words");
    currentWord.innerHTML = "The current word has " + word.length + " letters!";

    const formElement = document.getElementById("hangman-form");
    formElement.addEventListener("submit", processGuess);

function drawStrikeLetters() {

}

function drawWordProgress(inputValue) {

    for (i = 0; i <= revealedLetters.length; i++) {
        if (word[i] == inputValue.toUpperCase) {
            revealedLetters[i] = inputValue;

            const newHTMLElement = document.createElement("h4");
            newHTMLElement.innerHTML = revealedLetters[i];
            document.getElementById("output").appendChild(newHTMLElement);
        }
    }


    
}

function drawGallows() {

}

function processGuess(event) {
    event.preventDefault();

    const inputValue = document.getElementById("guessInput");

        if (word.includes(inputValue)) {
            drawWordProgress(inputValue);
        } else {
            drawGallows();
            strikes++;
            drawStrikeLetters();
        }
    
    if (strikes === maxStrikes) {
        alert("The game is over!");
    }
    }
