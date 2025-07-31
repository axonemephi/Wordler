// const targetWord = "CRANE";
// const maxGuesses = 6;
// let currentRow = 0;
// let currentGuess = "";

// const rows = document.querySelectorAll(".row");
// const keys = document.querySelectorAll(".keyboard-key");

// // attach click listeners to on-screen keys
// keys.forEach((keyBtn) => {
//   keyBtn.addEventListener("click", () => {
//     const key = keyBtn.textContent.toUpperCase();
//     handleKeyPress(key);
//   });
// });

// // handle key press from physical keyboard
// document.addEventListener("keydown", (e) => {
//   const key = e.key.toUpperCase();
//   if (/^[A-Z]$/.test(key) || key === "ENTER" || key === "BACKSPACE") {
//     handleKeyPress(key);
//   }
// });

// function handleKeyPress(key) {
//   if (currentRow >= maxGuesses) return;

//   if (key === "ENTER") {
//     if (currentGuess.length === 5) {
//       checkGuess();
//     }
//   } else if (key === "⌫" || key === "BACKSPACE") {
//     if (currentGuess.length > 0) {
//       currentGuess = currentGuess.slice(0, -1);
//       updateTile(currentGuess.length, "");
//     }
//   } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
//     updateTile(currentGuess.length, key);
//     currentGuess += key;
//   }
// }

// function updateTile(position, letter) {
//   const tile = rows[currentRow].children[position];
//   tile.textContent = letter;
// }

// function checkGuess() {
//   const result = evaluateGuess(targetWord, currentGuess);
//   for (let i = 0; i < 5; i++) {
//     const tile = rows[currentRow].children[i];
//     tile.classList.remove("bg-white");

//     if (result[i] === "green") {
//       tile.classList.add("bg-green-500", "text-white");
//     } else if (result[i] === "orange") {
//       tile.classList.add("bg-yellow-400", "text-white");
//     } else {
//       tile.classList.add("bg-gray-400", "text-white");
//     }
//   }

//   currentGuess = "";
//   currentRow++;
// }

// function evaluateGuess(word, guess) {
//   const freq = Array(26).fill(0);
//   const result = Array(5).fill("grey");

//   for (let c of word) freq[c.charCodeAt(0) - 65]++;

//   // First pass for greens
//   for (let i = 0; i < 5; i++) {
//     if (guess[i] === word[i]) {
//       result[i] = "green";
//       freq[guess[i].charCodeAt(0) - 65]--;
//     }
//   }

//   // Second pass for oranges
//   for (let i = 0; i < 5; i++) {
//     if (result[i] === "grey") {
//       const code = guess[i].charCodeAt(0) - 65;
//       if (freq[code] > 0) {
//         result[i] = "orange";
//         freq[code]--;
//       }
//     }
//   }

//   if (guess === targetWord) {
//         setTimeout(() => {
//             alert("Congratulations! You guessed the word!");
//             disableInput();
//         }, 100);
//     } else if (currentRow + 1 >= maxGuesses) {
//         setTimeout(() => {
//             alert(`Game Over! The word was ${targetWord}.`);
//             disableInput(); 
//         }, 100);
//     }

//   return result;
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

// // --- Event Listener for Physical & On-Screen Keyboard ---
// document.addEventListener("keydown", (e) => handleKeyPress(e.key));

// document.querySelectorAll(".key").forEach((keyElement) => {
//     keyElement.addEventListener("click", () => handleKeyPress(keyElement.dataset.key));
// });

// // --- Main Key Handling Logic ---
// async function handleKeyPress(key) {
//     key = key.toUpperCase();

//     if (key === "ENTER") {
//         if (currentGuess.length === wordLength) {
//             const isValid = await validateGuessWithServer(currentGuess);

//             if (!isValid) {
//                 alert("Not a valid word!");
//                 return;
//             }

//             evaluateGuess(currentGuess);
//             currentGuess = "";
//             currentRow++;
//         }
//     } else if (key === "BACKSPACE") {
//         if (currentGuess.length > 0) {
//             currentGuess = currentGuess.slice(0, -1);
//             updateTile(currentGuess.length, "");
//         }
//     } else if (/^[A-Z]$/.test(key) && currentGuess.length < wordLength) {
//         updateTile(currentGuess.length, key);
//         currentGuess += key;
//     }
// }

// // --- Update Letter Tile Display ---
// function updateTile(index, letter) {
//     const tile = document.querySelector(`#row-${currentRow} .tile:nth-child(${index + 1})`);
//     if (tile) tile.textContent = letter;
// }

// // --- Evaluate Guess Logic (Coloring tiles, etc.) ---
// function evaluateGuess(guess) {
//     const tiles = document.querySelectorAll(`#row-${currentRow} .tile`);
//     const target = "CRANE"; // Will be replaced later with server-provided word of the day

//     for (let i = 0; i < wordLength; i++) {
//         const tile = tiles[i];
//         const letter = guess[i];

//         if (letter === target[i]) {
//             tile.classList.add("correct"); // Green
//         } else if (target.includes(letter)) {
//             tile.classList.add("present"); // Yellow
//         } else {
//             tile.classList.add("absent"); // Grey
//         }
//     }
// }

// // --- Validate with Backend ---
// async function validateGuessWithServer(guess) {
//     try {
//         const response = await fetch('/validate-guess/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFToken': getCSRFToken()
//             },
//             body: JSON.stringify({ guess: guess })
//         });

//         const data = await response.json();
//         return data.valid;
//     } catch (error) {
//         console.error("Validation error:", error);
//         return false;
//     }
// }

// // --- CSRF Token Helper ---
// function getCSRFToken() {
//     const cookies = document.cookie.split(';');
//     for (let cookie of cookies) {
//         if (cookie.trim().startsWith('csrftoken=')) {
//             return cookie.trim().substring('csrftoken='.length);
//         }
//     }
//     return '';
// }

let currentGuess = "";
let currentRow = 0;
const maxGuesses = 6;
const wordLength = 5;

// Listen to physical key presses
document.addEventListener("keydown", (e) => handleKeyPress(e.key));

// Listen to virtual keyboard buttons (fix selector!)
document.querySelectorAll(".keyboard-key").forEach((keyElement) => {
    keyElement.addEventListener("click", () => handleKeyPress(keyElement.textContent));
});

async function handleKeyPress(key) {
    key = key.toUpperCase();

    if (key === "ENTER") {
        if (currentGuess.length === wordLength) {
            const isValid = await validateGuessWithServer(currentGuess);

            if (!isValid) {
                alert("Not a valid word!");
                return;
            }

            evaluateGuess(currentGuess);
            currentGuess = "";
            currentRow++;
        }
    } else if (key === "⌫" || key === "BACKSPACE") {
        if (currentGuess.length > 0) {
            currentGuess = currentGuess.slice(0, -1);
            updateTile(currentGuess.length, "");
        }
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < wordLength) {
        updateTile(currentGuess.length, key);
        currentGuess += key;
    }
}

function updateTile(index, letter) {
    const tile = document.querySelector(`#row-${currentRow} .tile:nth-child(${index + 1})`);
    if (tile) tile.textContent = letter;
}

function evaluateGuess(guess) {
    const tiles = document.querySelectorAll(`#row-${currentRow} .tile`);
    const target = "CRANE";

    const targetLetters = target.split('');
    const guessLetters = guess.split('');

    // First pass: check correct
    for (let i = 0; i < wordLength; i++) {
        const tile = tiles[i];
        const letter = guessLetters[i];

        tile.classList.remove("correct", "present", "absent");

        if (letter === targetLetters[i]) {
            tile.classList.add("correct");
            targetLetters[i] = null;  // Mark as matched
        }
    }

    // Second pass: check present
    for (let i = 0; i < wordLength; i++) {
        const tile = tiles[i];
        const letter = guessLetters[i];

        if (!tile.classList.contains("correct")) {
            const index = targetLetters.indexOf(letter);
            if (index !== -1) {
                tile.classList.add("present");
                targetLetters[index] = null;
            } else {
                tile.classList.add("absent");
            }
        }
    }
}

async function validateGuessWithServer(guess) {
    try {
        const response = await fetch('/validate-guess/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            body: JSON.stringify({ guess: guess })
        });

        const data = await response.json();
        return data.valid;
    } catch (error) {
        console.error("Validation error:", error);
        return false;
    }
}

function getCSRFToken() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        if (cookie.trim().startsWith('csrftoken=')) {
            return cookie.trim().substring('csrftoken='.length);
        }
    }
    return '';
}
