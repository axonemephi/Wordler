let currentGuess = "";
let currentRow = 0;
const maxGuesses = 6;
const wordLength = 5;
let gameWon = false;
let gameOver = false;
let targetWord = "";

// Initialize the game
function initGame() {
    // Get a random word from the server
    fetch('/get-target-word/')
        .then(response => response.json())
        .then(data => {
            targetWord = data.word;
            console.log("Target word:", targetWord); // For debugging
        })
        .catch(error => {
            console.error("Error getting target word:", error);
            // Fallback to a default word if server fails
            targetWord = "CRANE";
        });
}

// Debug function - type "debug" in console to see target word
window.debug = function() {
    console.log("Target word:", targetWord);
    alert("Target word: " + targetWord);
};

// Listen to physical key presses
document.addEventListener("keydown", (e) => {
    // Debug shortcut: Ctrl+Shift+D to reveal target word
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        debug();
        return;
    }
    handleKeyPress(e.key);
});

// Listen to virtual keyboard buttons
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".keyboard-key").forEach((keyElement) => {
        keyElement.addEventListener("click", () => {
            const keyText = keyElement.textContent.trim();
            if (keyText === "Enter") {
                handleKeyPress("ENTER");
            } else if (keyText === "⌫") {
                handleKeyPress("BACKSPACE");
            } else {
                handleKeyPress(keyText);
            }
        });
    });
    
    // Initialize the game
    initGame();
});

async function handleKeyPress(key) {
    if (gameOver) return;
    
    key = key.toUpperCase();

    if (key === "ENTER") {
        if (currentGuess.length === wordLength) {
            const isValid = await validateGuessWithServer(currentGuess);

            if (!isValid) {
                showMessage("Not a valid word!", "error");
                return;
            }

            evaluateGuess(currentGuess);
            
            // Check win condition
            if (currentGuess === targetWord) {
                gameWon = true;
                gameOver = true;
                showMessage("Congratulations! You won!", "success");
                setTimeout(() => {
                    if (confirm("Play again?")) {
                        resetGame();
                    }
                }, 1500);
            }
            // Check lose condition
            else if (currentRow >= maxGuesses - 1) {
                gameOver = true;
                showMessage(`Game over! The word was ${targetWord}`, "error");
                setTimeout(() => {
                    if (confirm("Play again?")) {
                        resetGame();
                    }
                }, 1500);
            }
            
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
    const targetLetters = targetWord.split('');
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
    
    // Update keyboard colors
    updateKeyboardColors(guessLetters, tiles);
}

function updateKeyboardColors(guessLetters, tiles) {
    guessLetters.forEach((letter, index) => {
        const tile = tiles[index];
        const keyElement = document.querySelector(`.keyboard-key[aria-label*="${letter}"]`);
        
        if (keyElement) {
            if (tile.classList.contains("correct")) {
                keyElement.style.backgroundColor = "#6aaa64";
                keyElement.style.color = "white";
            } else if (tile.classList.contains("present") && !keyElement.style.backgroundColor.includes("#6aaa64")) {
                keyElement.style.backgroundColor = "#c9b458";
                keyElement.style.color = "white";
            } else if (tile.classList.contains("absent") && !keyElement.style.backgroundColor.includes("#6aaa64") && !keyElement.style.backgroundColor.includes("#c9b458")) {
                keyElement.style.backgroundColor = "#787c7e";
                keyElement.style.color = "white";
            }
        }
    });
}

function showMessage(message, type) {
    // Create or update message element
    let messageEl = document.getElementById("game-message");
    if (!messageEl) {
        messageEl = document.createElement("div");
        messageEl.id = "game-message";
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
            z-index: 1000;
        `;
        document.body.appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.style.backgroundColor = type === "success" ? "#6aaa64" : "#ff6b6b";
    messageEl.style.color = "white";
    
    setTimeout(() => {
        messageEl.remove();
    }, 3000);
}

function resetGame() {
    currentGuess = "";
    currentRow = 0;
    gameWon = false;
    gameOver = false;
    
    // Clear all tiles
    document.querySelectorAll(".tile").forEach(tile => {
        tile.textContent = "";
        tile.classList.remove("correct", "present", "absent");
    });
    
    // Reset keyboard colors
    document.querySelectorAll(".keyboard-key").forEach(key => {
        key.style.backgroundColor = "";
        key.style.color = "";
    });
    
    // Get new target word
    initGame();
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
