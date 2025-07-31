const targetWord = "CRANE";
const maxGuesses = 6;
let currentRow = 0;
let currentGuess = "";

const rows = document.querySelectorAll(".row");
const keys = document.querySelectorAll(".keyboard-key");

// attach click listeners to on-screen keys
keys.forEach((keyBtn) => {
  keyBtn.addEventListener("click", () => {
    const key = keyBtn.textContent.toUpperCase();
    handleKeyPress(key);
  });
});

// handle key press from physical keyboard
document.addEventListener("keydown", (e) => {
  const key = e.key.toUpperCase();
  if (/^[A-Z]$/.test(key) || key === "ENTER" || key === "BACKSPACE") {
    handleKeyPress(key);
  }
});

function handleKeyPress(key) {
  if (currentRow >= maxGuesses) return;

  if (key === "ENTER") {
    if (currentGuess.length === 5) {
      checkGuess();
    }
  } else if (key === "⌫" || key === "BACKSPACE") {
    if (currentGuess.length > 0) {
      currentGuess = currentGuess.slice(0, -1);
      updateTile(currentGuess.length, "");
    }
  } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
    updateTile(currentGuess.length, key);
    currentGuess += key;
  }
}

function updateTile(position, letter) {
  const tile = rows[currentRow].children[position];
  tile.textContent = letter;
}

function checkGuess() {
  const result = evaluateGuess(targetWord, currentGuess);
  for (let i = 0; i < 5; i++) {
    const tile = rows[currentRow].children[i];
    tile.classList.remove("bg-white");

    if (result[i] === "green") {
      tile.classList.add("bg-green-500", "text-white");
    } else if (result[i] === "orange") {
      tile.classList.add("bg-yellow-400", "text-white");
    } else {
      tile.classList.add("bg-gray-400", "text-white");
    }
  }

  currentGuess = "";
  currentRow++;
}

function evaluateGuess(word, guess) {
  const freq = Array(26).fill(0);
  const result = Array(5).fill("grey");

  for (let c of word) freq[c.charCodeAt(0) - 65]++;

  // First pass for greens
  for (let i = 0; i < 5; i++) {
    if (guess[i] === word[i]) {
      result[i] = "green";
      freq[guess[i].charCodeAt(0) - 65]--;
    }
  }

  // Second pass for oranges
  for (let i = 0; i < 5; i++) {
    if (result[i] === "grey") {
      const code = guess[i].charCodeAt(0) - 65;
      if (freq[code] > 0) {
        result[i] = "orange";
        freq[code]--;
      }
    }
  }

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

  return result;
}

function disableInput() {
    document.querySelectorAll(".keyboard-key").forEach(button => {
        button.disabled = true;
    });
    document.removeEventListener("keydown", handleKeyPress);
}