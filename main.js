'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  // your code here
  
  // go through each index to match the solution 
  // the hint should output two numbers ex. 2-2 

  // declare two array that generationg hing function 
  let arraySolution = solution.split("")
  let arrayGuess = guess.split("")
  // console.log(arraySolution.length)
  // console.log(arrayGuess.length)
  let rightPlace = 0
  let rightLetter = 0

// repeat this as many times 
// 0123(index)
// abcd (solution)
// ADBC (guess) 
// taking i to loop around 
  for(let i = 0; i < arraySolution.length; i++){
    if (arraySolution[i] == arrayGuess[i]){
      rightPlace++
      arraySolution[i] = null
      // console.log(convertSolution)
    }
  }
// counting the right letter placement 
  for (let i = 0; i < arraySolution.length; i++){
    let index = arraySolution.indexOf(arrayGuess[i])
       if(index >= 0){
         rightLetter++
         arraySolution[index] = null
       } 
      }
       return `${rightPlace}-${rightLetter}`;
 }


const mastermind = (guess) => {
  // solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
// check if the user guess correctly 
  if (solution == guess){
    console.log('You guessed it!')
    return 'You guessed it!'
  }

  let hint = generateHint(guess);
  
board.push(`Guess:${guess}, Hint:${hint}`)

if (board.length > 9) {
  
  console.log(`YOU RAN OUT OF TURNS! THE ANSWER IS ${solution}`)
  return `YOU RAN OUT OF TURNS! THE ANSWER IS ${solution}`;
}
// check if the user guess correctly,
// if they did, print out that they won

// if they did not win, generate the hint 
//print out the hint,

// if they have guessed 10 times so far, then tell he the answer, 
// keep track of how many times they played 

}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}