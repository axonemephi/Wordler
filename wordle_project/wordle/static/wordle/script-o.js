// let currentGuess = "";
// let currentRow = 0;
// const maxGuesses = 6;
// const wordLength = 5;
// const targetWord = "CRANE";

// function handleKeyPress(key) {
//     if (key === "Enter") {
//         if (currentGuess.length === wordLength) {
//             evaluateGuess(currentGuess.toUpperCase());
//             currentRow += 1;
//             currentGuess = "";
//             updateGrid(); // Call after resetting currentGuess
//         } else {
//             alert("Guess must be 5 letters!");
//         }
//     } else if (key === "Backspace") {
//         currentGuess = currentGuess.slice(0, -1);
//         updateGrid();
//     } else if (/^[A-Z]$/.test(key) && currentGuess.length < wordLength) {
//         currentGuess += key;
//         updateGrid();
//     } else {
//         console.log("Ignored key:", key);
//     }
// }

// function updateGrid() {
//     const rows = document.querySelectorAll(".row");
//     if (currentRow >= rows.length) return;

//     const currentTiles = rows[currentRow].querySelectorAll("div");
    
//     // Only update the current row if it hasn't been evaluated
//     const isEvaluated = Array.from(currentTiles).some(tile => 
//         tile.classList.contains("bg-green-500") || 
//         tile.classList.contains("bg-yellow-400") || 
//         tile.classList.contains("bg-gray-400")
//     );

//     if (!isEvaluated) {
//         // Clear tiles only if the row is not evaluated
//         currentTiles.forEach(tile => {
//             tile.textContent = "";
//         });
//         // Update tiles with current guess
//         currentTiles.forEach((tile, i) => {
//             tile.textContent = currentGuess[i] || "";
//         });
//     }
// }

// document.querySelectorAll(".keyboard-key").forEach(button => {
//     button.addEventListener("click", () => {
//         let key = button.textContent.trim();
//         if (key === "⌫") key = "Backspace";
//         else key = key.toUpperCase();
//         handleKeyPress(key);
//     });
// });

// document.addEventListener("keydown", (e) => {
//     let key = e.key.toUpperCase();
//     if (key === "BACKSPACE") key = "Backspace";
//     if (key === "ENTER") key = "Enter";
//     handleKeyPress(key);
// });

// function evaluateGuess(guess) {
//     const rows = document.querySelectorAll(".row");
//     const currentTiles = rows[currentRow].querySelectorAll("div");
//     const letterCount = {};
//     const keyboardButtons = document.querySelectorAll(".keyboard-key");

//     for (let letter of targetWord) {
//         letterCount[letter] = (letterCount[letter] || 0) + 1;
//     }

//     // First pass: mark correct positions
//     for (let i = 0; i < wordLength; i++) {
//         const tile = currentTiles[i];
//         const letter = guess[i];
//         if (letter === targetWord[i]) {
//             tile.classList.add("bg-green-500", "text-white");
//             letterCount[letter] -= 1;
//         }
//     }

//     // Second pass: mark present but wrong place letters
//     for (let i = 0; i < wordLength; i++) {
//         const tile = currentTiles[i];
//         const letter = guess[i];
//         if (tile.classList.contains("bg-green-500")) continue;
//         if (letterCount[letter] > 0) {
//             tile.classList.add("bg-yellow-400", "text-white");
//             letterCount[letter] -= 1;
//         } else {
//             tile.classList.add("bg-gray-400", "text-white");
//         }
//     }

//     // Update keyboard
//     for (let i = 0; i < wordLength; i++) {
//         const letter = guess[i];
//         const button = Array.from(keyboardButtons).find(btn => btn.textContent.trim() === letter);
//         if (letter === targetWord[i]) {
//             button.classList.remove("bg-yellow-400", "bg-gray-400");
//             button.classList.add("bg-green-500", "text-white");
//         } else if (targetWord.includes(letter) && !button.classList.contains("bg-green-500")) {
//             button.classList.remove("bg-gray-400");
//             button.classList.add("bg-yellow-400", "text-white");
//         } else if (!button.classList.contains("bg-green-500") && !button.classList.contains("bg-yellow-400")) {
//             button.classList.add("bg-gray-400", "text-white");
//         }
//     }

//     // Check win/loss
//     if (guess === targetWord) {
//         alert("Congratulations! You guessed the word!");
//         disableInput();
//     } else if (currentRow + 1 >= maxGuesses) {
//         alert(`Game Over! The word was ${targetWord}.`);
//         disableInput();
//     }
// }

// function disableInput() {
//     document.querySelectorAll(".keyboard-key").forEach(button => {
//         button.disabled = true;
//     });
//     document.removeEventListener("keydown", handleKeyPress);
// }


// function evaluateGuess(guess) {
//     const rows = document.querySelectorAll(".row");
//     const currentTiles = rows[currentRow].querySelectorAll("div");
//     const letterCount = {};
//     const keyboardButtons = document.querySelectorAll(".keyboard-key");

//     for (let letter of targetWord) {
//         letterCount[letter] = (letterCount[letter] || 0) + 1;
//     }

//     // First pass: mark correct positions
//     for (let i = 0; i < wordLength; i++) {
//         const tile = currentTiles[i];
//         const letter = guess[i];
//         if (letter === targetWord[i]) {
//             tile.classList.add("bg-green-500", "text-white");
//             letterCount[letter] -= 1;
//         }
//     }

//     // Second pass: mark present but wrong place letters
//     for (let i = 0; i < wordLength; i++) {
//         const tile = currentTiles[i];
//         const letter = guess[i];
//         if (tile.classList.contains("bg-green-500")) continue;
//         if (letterCount[letter] > 0) {
//             tile.classList.add("bg-yellow-400", "text-white");
//             letterCount[letter] -= 1;
//         } else {
//             tile.classList.add("bg-gray-400", "text-white");
//         }
//     }

//     // Update keyboard
//     for (let i = 0; i < wordLength; i++) {
//         const letter = guess[i];
//         const button = Array.from(keyboardButtons).find(btn => btn.textContent.trim() === letter);
//         if (letter === targetWord[i]) {
//             button.classList.remove("bg-yellow-400", "bg-gray-400");
//             button.classList.add("bg-green-500", "text-white");
//         } else if (targetWord.includes(letter) && !button.classList.contains("bg-green-500")) {
//             button.classList.remove("bg-gray-400");
//             button.classList.add("bg-yellow-400", "text-white");
//         } else if (!button.classList.contains("bg-green-500") && !button.classList.contains("bg-yellow-400")) {
//             button.classList.add("bg-gray-400", "text-white");
//         }
//     }

//     // Check win/loss
//     if (guess === targetWord) {
//         alert("Congratulations! You guessed the word!");
//         disableInput();
//     } else if (currentRow + 1 >= maxGuesses) {
//         alert(`Game Over! The word was ${targetWord}.`);
//         disableInput();
//     }
// }


// // wordle_project/wordle/static/wordle/script.js
// let currentGuess = "";
// let currentRow = 0;
// const maxGuesses = 6;
// const wordLength = 5;

// const targetWord = "CRANE";

// // handle key press
// function handleKeyPress(key){
    
//     if(key === "Enter"){
//         if(currentGuess.length === wordLength){
//             evaluateGuess(currentGuess.toUpperCase());
//             // console.log("Submit Guess:", currentGuess);
//             currentRow += 1;
//             currentGuess = "";
//         }
//     }
//     else if(key === "Backspace" || key === "⌫"){
//         currentGuess = currentGuess.slice(0, -1);
//     }
//     else if (/^[A-Z]$/.test(key) && currentGuess.length < wordLength) {
//         currentGuess += key;
//     }
//     updateGrid();
// }

// function updateGrid() {
//     const rows = document.querySelectorAll(".row"); // More accurate
//     if (currentRow >= rows.length) return;
//     const currentTiles = rows[currentRow].querySelectorAll("div");

//     currentTiles.forEach((tile, i) => {
//     tile.textContent = currentGuess[i] || "";
//         });

// }

// document.querySelectorAll(".keyboard-key").forEach(button => {

//     button.addEventListener("click", () => {
//         // const key = button.textContent.trim();
//         const key = button.textContent.trim().toUpperCase();

//         handleKeyPress(key);
//     });

// });


// document.addEventListener("keydown", (e) => {

//     let key = e.key.toUpperCase();
//     if(key === "BACKSPACE") key = "Backspace";
//     if(key === "⌫") key = "Backspace";
//     if(key === "ENTER") key = "Enter";

//     handleKeyPress(key);

// });

// function evaluateGuess(guess){
//     const rows = document.querySelectorAll(".row");
//     const currentTiles = rows[currentRow].querySelectorAll("div");
//     const letterCount = {};

//     for(let letter of targetWord){
//         letterCount[letter] = (letterCount[letter] || 0) + 1;
//     }

//     // First pass: mark correct positions
//     for(let i = 0; i < wordLength; i++){
//         const tile = currentTiles[i];
//         const letter = guess[i];

//         if( letter === targetWord[i]) {
//             tile.classList.add("bg-green-500", "text-white");
//             letterCount[letter] -= 1;
//         }
//     }

//     // second pass: mark present but wrong place letters
//     for(let i = 0; i < wordLength; i++){
//         const tile = currentTiles[i];
//         const letter = guess[i];

//         if(tile.classList.contains("bg-green-500")) continue;

//         if(letterCount[letter] > 0){
//             tile.classList.add("bg-yellow-400", "text-white");
//             letterCount[letter] -= 1;
//         }
//         else {
//             tile.classList.add("bg-gray-400", "text-white");
//         }
//     }
// };