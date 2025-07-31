
let currentGuess = "";
let currentRow = 0;
const maxGuesses = 6;
const wordLength = 5;
const targetWord = "CRANE";

// Get all the tiles and organize them by row
const rows = document.querySelectorAll(".row");
const tiles = [];
rows.forEach((row, rowIndex) => {
    const rowTiles = row.querySelectorAll("div");
    tiles[rowIndex] = Array.from(rowTiles);
});

function handleKeyPress(key) {
    if (currentRow >= maxGuesses) return;

    if (key === "Enter") {
        if (currentGuess.length === wordLength) {
            evaluateGuess(currentGuess.toUpperCase());
            currentRow++;
            currentGuess = "";
        } else {
            alert("Guess must be 5 letters!");
        }
    } else if (key === "Backspace") {
        if (currentGuess.length > 0) {
            currentGuess = currentGuess.slice(0, -1);
            updateCurrentRow();
        }
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < wordLength) {
        currentGuess += key;
        updateCurrentRow();
    }
}

function updateCurrentRow() {
    if (currentRow >= maxGuesses) return;
    
    const currentTiles = tiles[currentRow];
    currentTiles.forEach((tile, i) => {
        // Only update if tile hasn't been evaluated yet
        if (!tile.classList.contains("evaluated")) {
            tile.textContent = currentGuess[i] || "";
        }
    });
}

function evaluateGuess(guess) {
    const currentTiles = tiles[currentRow];
    const keyboardButtons = document.querySelectorAll(".keyboard-key");

    // Create a copy of the target word to track letter frequencies
    const targetFreq = {};
    for (let letter of targetWord) {
        targetFreq[letter] = (targetFreq[letter] || 0) + 1;
    }

    // First pass: mark correct positions (green)
    for (let i = 0; i < wordLength; i++) {
        const tile = currentTiles[i];
        const letter = guess[i];
        
        tile.textContent = letter;
        tile.classList.add("evaluated");
        
        if (letter === targetWord[i]) {
            tile.classList.add("bg-green-500", "text-black");
            targetFreq[letter]--;
        }
    }

    // Second pass: mark present but wrong position (yellow)
    for (let i = 0; i < wordLength; i++) {
        const tile = currentTiles[i];
        const letter = guess[i];
        
        if (tile.classList.contains("bg-green-500")) continue;
        
        if (targetFreq[letter] > 0) {
            tile.classList.add("bg-yellow-400", "text-black");
            targetFreq[letter]--;
        } else {
            tile.classList.add("bg-gray-400", "text-black");
        }
    }

    // Update keyboard colors
    for (let i = 0; i < wordLength; i++) {
        const letter = guess[i];
        const button = Array.from(keyboardButtons).find(btn => 
            btn.textContent.trim() === letter
        );
        
        if (!button) continue;
        
        const tile = currentTiles[i];
        if (tile.classList.contains("bg-green-500")) {
            button.classList.remove("bg-yellow-400", "bg-gray-400");
            button.classList.add("bg-green-500", "text-white");
        } else if (tile.classList.contains("bg-yellow-400") && 
                   !button.classList.contains("bg-green-500")) {
            button.classList.remove("bg-gray-400");
            button.classList.add("bg-yellow-400", "text-white");
        } else if (!button.classList.contains("bg-green-500") && 
                   !button.classList.contains("bg-yellow-400")) {
            button.classList.add("bg-gray-400", "text-white");
        }
    }

    // Check win/loss
    if (guess === targetWord) {
        setTimeout(() => {
            alert("Congratulations! You guessed the word!");
            disableInput();
        }, 100);
    } else if (currentRow + 1 >= maxGuesses) {
        setTimeout(() => {
            alert(`Game Over! The word was ${targetWord}.`);
            disableInput();
        }, 100);
    }
}

// Keyboard event listeners
document.querySelectorAll(".keyboard-key").forEach(button => {
    button.addEventListener("click", () => {
        let key = button.textContent.trim();
        if (key === "⌫") key = "Backspace";
        else if (key === "Enter") key = "Enter";
        else key = key.toUpperCase();
        handleKeyPress(key);
    });
});

document.addEventListener("keydown", (e) => {
    let key = e.key.toUpperCase();
    if (key === "BACKSPACE") key = "Backspace";
    if (key === "ENTER") key = "Enter";
    handleKeyPress(key);
});

function disableInput() {
    document.querySelectorAll(".keyboard-key").forEach(button => {
        button.disabled = true;
    });
    document.removeEventListener("keydown", handleKeyPress);
}






















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
//             // updateGrid(); // Only update grid after moving to next row
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
    
//     // Only update tiles that haven't been evaluated yet (no color classes)
//     currentTiles.forEach((tile, i) => {
//         if (!tile.classList.contains("bg-green-500") && 
//             !tile.classList.contains("bg-yellow-400") && 
//             !tile.classList.contains("bg-gray-400")) {
//             tile.textContent = currentGuess[i] || "";
//         }
//     });
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
//     const keyboardButtons = document.querySelectorAll(".keyboard-key");

//     const result = Array(wordLength).fill("gray");
//     const freq = Array(26).fill(0);

//     // Count frequency of each letter in target word
//     for (let c of targetWord) {
//         freq[c.charCodeAt(0) - 65]++;
//     }

//     // First pass: Green letters
//     for (let i = 0; i < wordLength; i++) {
//         if (guess[i] === targetWord[i]) {
//             result[i] = "green";
//             freq[guess[i].charCodeAt(0) - 65]--;
//         }
//     }

//     // Second pass: Orange letters
//     for (let i = 0; i < wordLength; i++) {
//         if (result[i] === "gray") {
//             const code = guess[i].charCodeAt(0) - 65;
//             if (freq[code] > 0) {
//                 result[i] = "orange";
//                 freq[code]--;
//             }
//         }
//     }

//     // Apply color classes to tiles
//     for (let i = 0; i < wordLength; i++) {
//         const tile = currentTiles[i];
//         const letter = guess[i];
//         tile.textContent = letter;

//         if (result[i] === "green") {
//             tile.classList.add("bg-green-500", "text-white");
//         } else if (result[i] === "orange") {
//             tile.classList.add("bg-yellow-400", "text-white");
//         } else {
//             tile.classList.add("bg-gray-400", "text-white");
//         }

//         // Update keyboard key color
//         const button = Array.from(keyboardButtons).find(btn => btn.textContent.trim() === letter);
//         if (!button) continue;

//         if (result[i] === "green") {
//             button.classList.remove("bg-yellow-400", "bg-gray-400");
//             button.classList.add("bg-green-500", "text-white");
//         } else if (result[i] === "orange" && !button.classList.contains("bg-green-500")) {
//             button.classList.remove("bg-gray-400");
//             button.classList.add("bg-yellow-400", "text-white");
//         } else if (!button.classList.contains("bg-green-500") && !button.classList.contains("bg-yellow-400")) {
//             button.classList.add("bg-gray-400", "text-white");
//         }
//     }

//     // Win or lose check
//     if (guess === targetWord) {
//         disableInput();
//         alert("Congratulations! You guessed the word!");
        
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
//         } else {
//             alert("Guess must be 5 letters!");
//         }
//     } else if (key === "Backspace") {
//         currentGuess = currentGuess.slice(0, -1);
//     } else if (/^[A-Z]$/.test(key) && currentGuess.length < wordLength) {
//         currentGuess += key;
//     } else {
//         console.log("Ignored key:", key);
//     }
//     updateGrid();
// }

// function updateGrid() {
//     const rows = document.querySelectorAll(".row");
//     if (currentRow >= rows.length) return;
//     const currentTiles = rows[currentRow].querySelectorAll("div");
//     currentTiles.forEach(tile => {
//         tile.textContent = "";
//     });
//     currentTiles.forEach((tile, i) => {
//         tile.textContent = currentGuess[i] || "";
//     });
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
//     const keyboardButtons = document.querySelectorAll(".keyboard-key");

//     const result = Array(wordLength).fill("gray");
//     const freq = Array(26).fill(0);

//     // Count frequency of each letter in target word
//     for (let c of targetWord) {
//         freq[c.charCodeAt(0) - 65]++;
//     }

//     // First pass: Green letters
//     for (let i = 0; i < wordLength; i++) {
//         if (guess[i] === targetWord[i]) {
//             result[i] = "green";
//             freq[guess[i].charCodeAt(0) - 65]--;
//         }
//     }

//     // Second pass: Orange letters
//     for (let i = 0; i < wordLength; i++) {
//         if (result[i] === "gray") {
//             const code = guess[i].charCodeAt(0) - 65;
//             if (freq[code] > 0) {
//                 result[i] = "orange";
//                 freq[code]--;
//             }
//         }
//     }

//     // Apply color classes to tiles
//     for (let i = 0; i < wordLength; i++) {
//         const tile = currentTiles[i];
//         const letter = guess[i];
//         tile.textContent = letter;

//         if (result[i] === "green") {
//             tile.classList.add("bg-green-500", "text-white");
//         } else if (result[i] === "orange") {
//             tile.classList.add("bg-yellow-400", "text-white");
//         } else {
//             tile.classList.add("bg-gray-400", "text-white");
//         }

//         // Update keyboard key color
//         const button = Array.from(keyboardButtons).find(btn => btn.textContent.trim() === letter);
//         if (!button) continue;

//         if (result[i] === "green") {
//             button.classList.remove("bg-yellow-400", "bg-gray-400");
//             button.classList.add("bg-green-500", "text-white");
//         } else if (result[i] === "orange" && !button.classList.contains("bg-green-500")) {
//             button.classList.remove("bg-gray-400");
//             button.classList.add("bg-yellow-400", "text-white");
//         } else if (!button.classList.contains("bg-green-500") && !button.classList.contains("bg-yellow-400")) {
//             button.classList.add("bg-gray-400", "text-white");
//         }
//     }

//     // Win or lose check
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


// const targetWord = "CRANE";
// const board = document.getElementById("board");
// const maxGuesses = 6;
// let currentGuess = "";
// let currentRow = 0;

// // Create the board (6 rows × 5 columns)
// for (let i = 0; i < maxGuesses * 5; i++) {
//   const tile = document.createElement("div");
//   tile.className = "tile";
//   board.appendChild(tile);
// }

// // Letter input handling
// document.addEventListener("keydown", (e) => {
//   if (currentRow >= maxGuesses) return;

//   const key = e.key.toUpperCase();

//   if (key === "BACKSPACE") {
//     if (currentGuess.length > 0) {
//       currentGuess = currentGuess.slice(0, -1);
//       updateTile(currentGuess.length, "");
//     }
//   } else if (key === "ENTER") {
//     if (currentGuess.length === 5) {
//       checkGuess();
//     }
//   } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
//     updateTile(currentGuess.length, key);
//     currentGuess += key;
//   }
// });

// function updateTile(position, letter) {
//   const index = currentRow * 5 + position;
//   const tile = board.children[index];
//   tile.textContent = letter;
// }

// function checkGuess() {
//   const result = evaluateGuess(targetWord, currentGuess);
//   for (let i = 0; i < 5; i++) {
//     const tile = board.children[currentRow * 5 + i];
//     tile.classList.add(result[i]);
//   }

//   currentGuess = "";
//   currentRow++;
// }

// // Wordle-like feedback logic
// function evaluateGuess(word, guess) {
//   const freq = Array(26).fill(0);
//   const result = Array(5).fill("grey");

//   for (let c of word) freq[c.charCodeAt(0) - 65]++;

//   // Green pass
//   for (let i = 0; i < 5; i++) {
//     if (guess[i] === word[i]) {
//       result[i] = "green";
//       freq[guess[i].charCodeAt(0) - 65]--;
//     }
//   }

//   // Orange pass
//   for (let i = 0; i < 5; i++) {
//     if (result[i] === "grey") {
//       const code = guess[i].charCodeAt(0) - 65;
//       if (freq[code] > 0) {
//         result[i] = "orange";
//         freq[code]--;
//       }
//     }
//   }

//   return result;
// }


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
//             // Don't call updateGrid() here - evaluation already set the tiles
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
    
//     // Only update tiles that haven't been evaluated yet (no color classes)
//     currentTiles.forEach((tile, i) => {
//         if (!tile.classList.contains("bg-green-500") && 
//             !tile.classList.contains("bg-yellow-400") && 
//             !tile.classList.contains("bg-gray-400")) {
//             tile.textContent = currentGuess[i] || "";
//         }
//     });
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
//     const keyboardButtons = document.querySelectorAll(".keyboard-key");

//     const result = Array(wordLength).fill("gray");
//     const freq = Array(26).fill(0);

//     // Count frequency of each letter in target word
//     for (let c of targetWord) {
//         freq[c.charCodeAt(0) - 65]++;
//     }

//     // First pass: Green letters
//     for (let i = 0; i < wordLength; i++) {
//         if (guess[i] === targetWord[i]) {
//             result[i] = "green";
//             freq[guess[i].charCodeAt(0) - 65]--;
//         }
//     }

//     // Second pass: Orange letters
//     for (let i = 0; i < wordLength; i++) {
//         if (result[i] === "gray") {
//             const code = guess[i].charCodeAt(0) - 65;
//             if (freq[code] > 0) {
//                 result[i] = "orange";
//                 freq[code]--;
//             }
//         }
//     }

//     // Apply color classes to tiles
//     for (let i = 0; i < wordLength; i++) {
//         const tile = currentTiles[i];
//         const letter = guess[i];
//         tile.textContent = letter;

//         // Clear any existing color classes first
//         tile.classList.remove("bg-green-500", "bg-yellow-400", "bg-gray-400", "text-white", "text-gray-800", "text-black");

//         if (result[i] === "green") {
//             tile.classList.add("bg-green-500", "text-white");
//             tile.style.color = "white";
//         } else if (result[i] === "orange") {
//             tile.classList.add("bg-yellow-400", "text-white");
//             tile.style.color = "white";
//         } else {
//             tile.classList.add("bg-gray-400", "text-white");
//             tile.style.color = "white";
//         }

//         // Update keyboard key color
//         const button = Array.from(keyboardButtons).find(btn => btn.textContent.trim() === letter);
//         if (!button) continue;

//         if (result[i] === "green") {
//             button.classList.remove("bg-yellow-400", "bg-gray-400");
//             button.classList.add("bg-green-500", "text-white");
//         } else if (result[i] === "orange" && !button.classList.contains("bg-green-500")) {
//             button.classList.remove("bg-gray-400");
//             button.classList.add("bg-yellow-400", "text-white");
//         } else if (!button.classList.contains("bg-green-500") && !button.classList.contains("bg-yellow-400")) {
//             button.classList.add("bg-gray-400", "text-white");
//         }
//     }

//     // Win or lose check
//     if (guess === targetWord) {
//         disableInput();
//         alert("Congratulations! You guessed the word!");
        
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