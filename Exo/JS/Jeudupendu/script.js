"use strict";

// Déclarations des variables et constantes
let words;
let word = '';
let errors = 0;
let gameOver = false;
let found = '';
const lettersContainer = document.getElementById('letters');
const foundElem = document.getElementById('found');
const drawingDiv = document.getElementById('drawing');
const resetButton = document.getElementById('resetButton');
const MAX_ERRORS = 6;
const reset = document.querySelector('.reset');
resetButton.addEventListener('click', resetGame);

// Chargement du fichier JSON avec fetch
async function loadWords() {
    const response = await fetch('theme.json'); // Assurez-vous que ce chemin est correct
    const data = await response.json();
    words = data;
}

// Fonction pour obtenir un mot aléatoire
function getRandom(a) {
    let alph = a[Math.floor(Math.random() * a.length)],
        wordsList = alph.Listes[Math.floor(Math.random() * alph.Listes.length)],
        mot = wordsList.Mots[Math.floor(Math.random() * wordsList.Mots.length)];
    console.log(alph, wordsList, mot);
    if (mot) {
        return mot.toLowerCase();
    } else {
        return getRandom(a);
    }
}

// Fonction pour mettre à jour le mot
function updateWord() {
    found = new Array(word.length).fill('-').join('');
    foundElem.textContent = found;
}

// Fonction pour gérer le clic sur une lettre
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
            reset.style.display = "flex";
            lettersContainer.style.display = "none";
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

// Fonction pour mettre à jour l'image
function updateImage() {
    drawingDiv.innerHTML = '';
    if (errors > 0) {
        const img = document.createElement('img');
        img.src = `./src/img${errors}.png`; // Assurez-vous que ces chemins sont corrects
        img.alt = `Erreur ${errors}`;
        drawingDiv.appendChild(img);
    }
}

// Fonction pour réinitialiser le jeu
function resetGame() {
    errors = 0;
    word = getRandom(words);
    updateWord();
    Array.from(lettersContainer.children).forEach(btn => btn.disabled = false);
    setInitialImage();
    gameOver = false;
    reset.style.display = "none";
    lettersContainer.style.display = "flex";
}

// Fonction pour définir l'image initiale
function setInitialImage() {
    drawingDiv.innerHTML = '';
    const img = document.createElement('img');
    img.src = './src/background.png'; // Assurez-vous que ce chemin est correct
    img.alt = 'Image initiale';
    drawingDiv.appendChild(img);
}

// Initialisation du jeu
async function initGame() {
    await loadWords();
    word = getRandom(words);
    updateWord();

    // Création des boutons de lettres
    const letters = 'azertyuiopqsdfghjklmwxcvbn';
    letters.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', handleLetterClick);
        lettersContainer.appendChild(button);
    });

    // Gestion des événements clavier
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
}

initGame();
