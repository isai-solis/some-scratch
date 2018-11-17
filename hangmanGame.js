const wordBankObject = {
    queen: {
        picture: null,
        song: null,
        songclip: null 
    },
    aerosmith: {
        picture: null,
        song: null,
        songclip: null 
    },
    radiohead: {
        picture: null,
        song: null,
        songclip: null 
    },
    ramones: {
        picture: null,
        song: null,
        songclip: null 
    },
    prince: {
        picture: null,
        song: null,
        songclip: null 
    }
};

let wordToGuess = null;
let lettersOfWord = [];
let matchedLetters = [];
let lettersGuessed = [];
let guessesRemaining = null;
let userWins = null;
let userLosses = null;
let keyboardActive = false;

// when the user starts the app, the display is initialized
const setupGame = () => {
    let objKeys = Object.keys(wordBankObject)
    wordToGuess = objKeys[Math.floor(Math.random() * objKeys.length)];
    lettersOfWord = wordToGuess.split("");
    console.log(lettersOfWord);
    guessesRemaining = lettersOfWord.length + 5;
    userWins = 0;
    userLosses = 0;
    rebuildWordView();
    getTotalGuesses();
    keyboardActive = true;
};

const rebuildWordView = () => {
    let wordView = "";
    for (let letter of lettersOfWord) {
        if (matchedLetters.indexOf(letter) !== -1){
            wordView += letter;
        }
        else {
            wordView += "&nbsp;_&nbsp;";
        }
    }
    document.querySelector("#wordToGuess").innerHTML = wordView;
};

const getTotalGuesses = () => {
    document.querySelector("#guessesRemaining").innerHTML = guessesRemaining; 
};

const checkForCorrectLetters = (guessedLetter) => {
    for (let letter of lettersOfWord) {
        // if letter is in solution and has not been guessed yet
        if ((guessedLetter === letter) && (matchedLetters.indexOf(guessedLetter) === -1)) {
            matchedLetters.push(guessedLetter);
            return true;
        }
    };
    return false;
};

const checkForIncorrectLetters = (guessedLetter) => {
    console.log(lettersOfWord);
    console.log(lettersGuessed);
    // if letter has not been guessed and is not in the solution
    if ((lettersGuessed.indexOf(guessedLetter) === -1) && (lettersOfWord.indexOf(guessedLetter) === -1)){
        lettersGuessed.push(guessedLetter);
        return true;
    } 
    return false;
};

const checkLoss = () => {
    if (guessesRemaining === 0)
    return true;
};

const checkWin = () => {
    let win; 
    if (matchedLetters === 0) {
        win = false;
    }
    else {
        win = true;
    }
    for (let letter of lettersOfWord) {
        if (matchedLetters.indexOf(letter) === -1){
            win = false;
        }
    }
    return win;
};

const updatePage = (guessedLetter) => {
    if (checkForIncorrectLetters(guessedLetter) && checkLoss()){
        keyboardActive = false;
        userLosses++;
        document.querySelector("#feedbackMessage").innerHTML = "You Lost This Round. Select Start Game From Menu To Play Again";
        document.querySelector("#userLosses").innerHTML = userLosses;
    }
    else if (checkForIncorrectLetters(guessedLetter)) {
        guessesRemaining--;
        console.log('hello from second incorrect check');
        document.querySelector("#feedbackMessage").innerHTML = "That Was Incorrect. Try Again.";
        document.querySelector("#guessesRemaining").innerHTML = guessesRemaining;
        document.querySelector("#lettersGuessed").innerHTML = lettersGuessed.join(", ");
    } 
    else if (checkForCorrectLetters(guessedLetter) && checkWin()) {
        keyboardActive = false;
        userWins++;
        document.querySelector("#userWins").innerHTML = userWins;
        document.querySelector("#feedbackMessage").innerHTML = "Great Guessing! You Win!";
    }
    else if (checkForCorrectLetters(guessedLetter)) {
        document.querySelector("#feedbackMessage").innerHTML = "You Guessed Correctly!";
        document.querySelector("#lettersGuessed").innerHTML = lettersGuessed.join(", ");
    }
    rebuildWordView();
};


document.onload = setupGame();
// when the user presses the enter key for the first time, the game begins by displaying a series of blanks

// when the user presses an alphabetical key, the user is notified if the guess was correct or not by updating the screen
document.onkeyup = (event) => {
    guessedLetter = String.fromCharCode(event.keyCode).toLowerCase();
    if (keyboardActive) {
        updatePage(guessedLetter);
        console.log(guessedLetter);
    };
};

// when the user has used up all guesses, the screen is updated and the user is notified of the loss

// when the user has guessed all the words correctly, the screen is updated and the user is notified of the win

// if the user wants to quit, the user can press the ESC key to quit the game
