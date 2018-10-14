// console.log('js online');

//Game class:
class game {
    constructor(difficulty) {
        this.difficulty = difficulty;
        this.easyWords = 'card cook tune chew soft roar soak mild lump step west mean toll bury stir sand wage fish cash look';
        this.mediumWords = 'anxiety article inspire undress strange reactor terrify retiree distort improve';
        this.hardWords = 'hemisphere connection cell phone pedestrian attachment brilliance hypothesis artificial retirement difficulty discipline allocation acceptable compliance earthquake commitment conception obligation multimedia disappoint SQUIRRELLED'
        this.wordBank = []; //max word length = 11 words;
        this.wordToGuess = this.getWord();
        this.rightGuesses = [];
        this.wrongGueses = [];
        this.player = '';
        this.chances = 10;
        this.score = 0;
        this.guessedWord = '';
        this.acceptInput = true;
    }

    //methods
    getWord(){
        // console.log(this.player);
        // this.difficulty = 'medium';
        if(this.difficulty === 'easy') {
            this.wordBank = arrCreator(this.easyWords);
        } else if(this.difficulty === 'medium') {
            this.wordBank = arrCreator(this.mediumWords);
        } else if (this.difficulty === 'hard') {
            this.wordBank = arrCreator(this.hardWords);
        }
        // console.log(`this.selectDifficulty = ${this.difficulty}`);

        let randomNum = Math.floor(Math.random() * this.wordBank.length);
        // console.log(`random num = ${randomNum}`);

        return this.wordBank[randomNum].toLowerCase();
    }

    processGuess(letter) {
        letter = letter.toLowerCase();
        let status = '\xa0';
        let alphabet = 'abcdefghijklmnopqrstuvwxyz';

        if(alphabet.indexOf(letter) === -1) {
            status = `${letter} is not a letter`;
        } else {
            if(this.wordToGuess.indexOf(letter) !== -1){
                if(!this.rightGuesses.includes(letter)){
                    this.rightGuesses.push(letter);
                } else {
                    status = `You already guessed ${letter}.`;
                    // console.log(`You already guessed ${letter}.`)
                }
                // console.log(`${letter} added to right guesses`);
            } else {
                if(!this.wrongGueses.includes(letter)){
                    this.wrongGueses.push(letter);
                    this.chances--;
                    // console.log(`${letter} added to incorrect guesses`);
                    if(this.chances == 0){
                        this.acceptInput = false;
                        alert('game over');
                    }
                } else{
                    status = `You already guessed ${letter}.`;
                    // console.log(`You already guessed ${letter}.`)
                }
    
                // console.log(`wrong guesses: ${this.wrongGueses}`);
                // console.log(`Chances: ${this.chances}`);
            }
        }
        return status;
    }

    displayGuessedLetters() {
        // let wordToGuessArr = Array.from(this.wordToGuess);
        let wordToGuessArr = [];
        for(let i = 0; i < this.wordToGuess.length; i++){
            wordToGuessArr.push('_');
        }

        for(let i = 0; i < this.rightGuesses.length; i++){
            for(let j = 0; j < this.wordToGuess.length; j++){
                // console.log(`wordToGuess: ${this.wordToGuess[j]} Right guess: ${this.rightGuesses[i]}`)
                if(this.wordToGuess[j] === this.rightGuesses[i]){
                    // display.push(this.rightGuesses[i]);
                    wordToGuessArr[j] = this.rightGuesses[i];
                }
            }
        }
        // let toRwordToGuessArr.toString();
        let displayLetters = wordToGuessArr.toString();
        // this.guessedWord = displayLetters.replace(/,/g,'');
        // this.guessedWord = this.guessedWord.replace(/_/g, '');
        this.guessedWord = this.regex(displayLetters);
        displayLetters = displayLetters.replace(/,/g, ' ');
        // console.log(`Display: ${displayLetters} length = ${displayLetters.length}`);
        // this.checkWin(this.guessedWord);
        // console.log(displayLetters);
        return displayLetters;
    }

    regex(word) {
        let returnWord = word.replace(/,/g, '');
        returnWord = returnWord.replace(/_/g, '');
        return returnWord;
    }

    checkWin() {
        if(this.guessedWord === this.wordToGuess){
            // console.log('You win!');
            this.acceptInput = false;
            return true;
        }
    }

    new_word() {
        this.acceptInput = true;
        this.chances = 10;
        this.wordToGuess = this.getWord();
        this.rightGuesses = [];
        this.wrongGueses = [];
        this.guessedWord = '';
    }

}

//Global: only way to access new_game across all functions.
let new_game = null;

//DOM Elements:
const index = document.getElementById('index');
const btn_start_game = document.getElementById('btn_start_game');

const opt_diff = document.getElementsByName('opt_diff');

const div_game_elements = document.getElementById('div_game_elements');
const out_key_down = document.getElementById('out_key_down');
const div_start_game = document.getElementById('div_start_game');
const div_container = document.getElementById('div_container');

const in_name = document.getElementById('in_name');
const out_name = document.getElementById('out_name');
const out_chances = document.getElementById('out_chances');
const out_score = document.getElementById('out_score');
const out_wrong_guesses = document.getElementById('out_wrong_guesses');
const out_status = document.getElementById('out_status');

const div_win_element = document.getElementById('div_win_element');
const btn_new_word = document.getElementById('btn_new_word');

const div_game_over = document.getElementById('div_game_over');
const btn_main_menu = document.getElementById('btn_main_menu');


div_game_elements.style.display = 'none';
div_win_element.style.display = 'none';
div_game_over.style.display = 'none';

//-------------------DOM Events:---------------------//

document.addEventListener('click', (e) => {
    if(e.target.className === 'btn_difficulty') {
        let difficulty_buttons = document.getElementsByClassName('btn btn-primary');
        for(let i = 0; i < difficulty_buttons.length; i++) {
            difficulty_buttons[i].style.border = 'none';
        }
        e.target.parentNode.style.border = '2px white solid';
        // alert(e.target.parentNode.className);
    }

});

const selectDifficulty = () => {
    let selectedDiff = '';
    for(let i = 0; i < opt_diff.length; i++){
        if(opt_diff[i].checked){
            // console.log(opt_diff[i].value);
            selectedDiff = opt_diff[i].value;
        }
    }
    return selectedDiff;
}

//Start Game:
btn_start_game.addEventListener('click', (e) => {
    let name = in_name.value;
    
    let diff_options = [];
    for(let i = 0; i < opt_diff.length; i++){
        diff_options.push(opt_diff[i].value);
    }

    let difficulty = selectDifficulty();

    let name_selected = false;
    let difficulty_selected = false;

    if(in_name.value.length > 0) {
        name_selected = true;
        name = in_name.value;
    }

    if(diff_options.indexOf(difficulty) !== -1){
        difficulty_selected = true;
    }

    if(name_selected === false) {
        in_name.style.border = '1px red solid';
        in_name.placeholder = 'name required';
    } else if (difficulty_selected === false){
        alert('Please select difficulty');
    } else if(name_selected && difficulty_selected){
        div_start_game.style.display = 'none';
        div_game_elements.style.display = 'block';

        div_container.style.backgroundImage = 'url(assets/images/controller3.svg)';
        // index.style.background = 'linear-gradient(-45deg, #33FF49, #99BDE4, #23A6D5, #FF5733)';

        out_guessed_letter.textContent = '';
        new_game = new game(difficulty);
        new_game.player = in_name.value;

        // console.log(`difficulty = ${difficulty}`);

        // new_game.difficulty = difficulty;
        // console.log('new_game.difficulty = ' + new_game.difficulty);

        // console.log(`wordbank: ${new_game.wordBank}`);
        // console.log(`new_game.selectDifficulty = ${new_game.player}`);
        // console.log(new_game.wordToGuess);
        // console.log(new_game.wordToGuess.length);
        // console.log(new_game.wordToGuess);
        
        refresh();
    }

});


//Keydown:
document.addEventListener('keydown', (e) => {
    if(new_game !== null){
        if(new_game.acceptInput) {
            //console.log(e.key);
            // console.log(new_game.wordToGuess);
            // console.log(`Pressed: ${e.key}`);

            // new_game.processGuess(e.key);
            out_status.textContent = new_game.processGuess(e.key);

            refresh();
            // console.log(new_game.checkWin());
            if(new_game.checkWin()){

                /*  THIS CODE WILL AUTOMATICALLY GENERATE A NEW WORD, BUT I CHOSE TO CHANGE THE GAME DEISGN TO ALLOW THE PLAYER TO CLICK TO SELECT A NEW WORD.
                alert(`Correct!\nWord Guessed: ${new_game.wordToGuess}`);
                new_game.new_word();
                refresh(); 
                */

                new_game.score++;
                div_win_element.style.display = 'block';
            }
            if(new_game.chances === 0){
                div_game_over.style.display = 'block';
            }
            // console.log(`Guesed word: ${new_game.guessedWord}`);
        }
    }
});

//New word:
btn_new_word.addEventListener('click', (e) => {
    new_game.new_word();
    refresh();
    div_win_element.style.display = 'none';
});

//Main menu:
btn_main_menu.addEventListener('click', (e) => {
    location.reload();
});

//Refresh helper method
const refresh = () => {
    out_guessed_letter.textContent = new_game.displayGuessedLetters();
    out_name.textContent = new_game.player;
    out_chances.textContent = new_game.chances;
    out_score.textContent = new_game.score;
    out_wrong_guesses.textContent = new_game.wrongGueses;
}

//arrCreator helper method to convert string to array
const arrCreator = (string) => {
    let arr = string.split(' ');
    return arr;
}
