"use strict";

// 1. Déclarations des variables et constantes
const words = ["effet", "pendu", "ordinateur", "javascript"];
let word = words[Math.floor(Math.random() * words.length)];
let errors = 0;
let gameOver = false;
let found = new Array(word.length).fill('-').join('');
const lettersContainer = document.getElementById('letters');
const foundElem = document.getElementById('found');
const drawingDiv = document.getElementById('drawing');
const resetButton = document.getElementById('resetButton');
const MAX_ERRORS = 6;
const  reset = document.querySelector('.reset')
resetButton.addEventListener('click', resetGame);

foundElem.style.fontFamily="Halowen,'Times New Roman', Times, serif";

// 2. Fonctions
function handleLetterClick(event) {
    if (gameOver) return;

    const clickedButton = event.target;
    const clickedLetter = clickedButton.textContent.toLowerCase();

    clickedButton.disabled = true;

    let updatedFound = '';
    let letterFound = false;

    for (let i = 0; i < word.length; i++) {
        if (word[i] === clickedLetter) {
            updatedFound += clickedLetter;
            letterFound = true;
        } else {
            updatedFound += found[i];
        }
    }

    if (!letterFound) {
        errors++;
        updateImage();
        if (errors === MAX_ERRORS) {
            console.log("Vous avez perdu!");
            gameOver = true;
            reset.style.display="flex";
            lettersContainer.style.display="none";
            return;
        }
    }

    found = updatedFound;
    foundElem.textContent = found;

    if (!found.includes('-')) {
        alert("Vous avez gagné!");
        resetGame();
    }
}

function updateImage() {
    drawingDiv.innerHTML = '';
    if (errors > 0) {
        const img = document.createElement('img');
        img.src = `./src/img${errors}.png`;
        img.alt = `Erreur ${errors}`;
        drawingDiv.appendChild(img);
    }
}

function resetGame() {
    errors = 0;
    word = words[Math.floor(Math.random() * words.length)];
    found = new Array(word.length).fill('-').join('');
    foundElem.textContent = found;
    Array.from(lettersContainer.children).forEach(btn => btn.disabled = false);
    setInitialImage();
    gameOver = false;
    reset.style.display="none";
    lettersContainer.style.display="flex";


}

function setInitialImage() {
    drawingDiv.innerHTML = '';
    const img = document.createElement('img');
    img.src = './src/background.png';
    img.alt = 'Image initiale';
    drawingDiv.appendChild(img);
}

// 3. Initialisation du jeu et événements
const letters = 'azertyuiopqsdfghjklmwxcvbn';
letters.split('').forEach(letter => {
    const button = document.createElement('button');
    button.textContent = letter;
    button.addEventListener('click', handleLetterClick);
    lettersContainer.appendChild(button);
});

foundElem.textContent = found;

document.addEventListener('keydown', (event) => {
    if (gameOver) return;

    const keyName = event.key.toLowerCase();
    if (letters.includes(keyName)) {
        const button = Array.from(lettersContainer.children).find(btn => btn.textContent === keyName);
        if (button && !button.disabled) {
            button.click();
        }
    }
});

setInitialImage();
