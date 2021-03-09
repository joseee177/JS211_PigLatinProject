'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const pigLatin = (word) => {
  let cleanWord = word.trim().toLowerCase();

  let translation = "";
  
  let smallestNonNegative = (num1,num2) => {
    //if num1 is negative, return num2
      if(num1 < 0){
        return num2;
      }
    // if num2 is negative, return num1
      if(num2 < 0){
        return num1;
      }
    //otherwise, return the smaller of the two
      if(num1 < num2){
        return num1;
      } else{
        return num2;
      }
    }

    let indexOfFirstVowel = (word) =>{
      let vowelIndex = -1; //to set as default

      //indexOf --> finds where the character appears is in the word.. in this case vowels
      //indexOf will give us the position of the vowel in a numeric value
      const aIndex = word.indexOf("a");
      const eIndex = word.indexOf("e");
      const iIndex = word.indexOf("i");
      const oIndex = word.indexOf("o");
      const uIndex = word.indexOf("u");
   

      //reasigning the vale of the variable vowelIndex
     vowelIndex = smallestNonNegative(vowelIndex, aIndex);
     vowelIndex = smallestNonNegative(vowelIndex, eIndex);
     vowelIndex = smallestNonNegative(vowelIndex, iIndex);
     vowelIndex = smallestNonNegative(vowelIndex, oIndex);
     vowelIndex = smallestNonNegative(vowelIndex, uIndex);
     
     return vowelIndex;
    }
//created a variable named vowel which equals indexOfFirstVowel with cleanWord passed into it to trim and lowercase the vowel/word
    let vowel = indexOfFirstVowel(cleanWord);

  //if word begins with a vowel
  if(vowel == 0){
    translation = cleanWord + "yay";

    return translation;
  } 
   //if the word doesnt start with a vowel
  else{
    //.substring helps to separate the word from where the first vowel is found
    translation = cleanWord.substring(vowel) + cleanWord.substring(0,vowel) + "ay";

    return translation;
  } 
  

}
/****************************************************************************************************/
let inputButton = document.getElementById("inputButton")
inputButton.addEventListener ('click', function(){

  //we call the input element from the DOM
  let inputBox = document.getElementById("inputBox");

  let span = document.getElementById("translation");

  span.innerText = pigLatin(inputBox.value);
})

// the first function called in the program to get an input from the user
// to run the function use the command: node main.js
// to close it ctrl + C
const getPrompt = () => {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Unit Tests
// to use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}






// **********
//   HINTS
// **********

// break your code into pieces and focus on one piece at a time...
// 1. if word begins with a vowel send to one function: adds "yay"
// 2. if word begins with a consonant send to another function: splices off beginning, returns word with new ending.
// 3. if multiple words, create array of words, loop over them, sending them to different functions and creating a new array with the new words.
