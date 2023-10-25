const words = ["effet", "pendu", "ordinateur", "javascript"];
let word = words[Math.floor(Math.random() * words.length)];
let errors = 0;
let found = new Array(word.length).fill('-').join('');
const usedLetters = [];
const drawings = ["", "O", "O-", "O--", "O--<", "O--<|>", "O--<|>-"];
const letterUsedElem = document.getElementById('letterUsed');

// Générer les boutons pour chaque lettre de l'alphabet
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lettersContainer = document.getElementById('letters');
letters.split('').forEach(letter => {
  const button = document.createElement('button');
  button.textContent = letter;
  button.disabled = false; 
  button.addEventListener('click', handleLetterClick);
  lettersContainer.appendChild(button);
});

// Initialise l'affichage
document.getElementById('found').textContent = found;
document.getElementById('errors').textContent = `Erreurs: ${errors}`;

function handleLetterClick(event) {
  const clickedButton = event.target;
  const clickedLetter = clickedButton.textContent.toLowerCase();
  console.log(`Vous avez cliqué sur ${clickedLetter}`);

  // Ajoute la lettre à la liste des lettres utilisées
  usedLetters.push(clickedLetter.toUpperCase());
  updateUsedLetters();
      // Vérifie si le bouton est déjà désactivé
  if (clickedButton.disabled) {
    return;
  }

  // Désactive le bouton
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
    document.getElementById('errors').textContent = `Erreurs: ${errors}`;
    updateImage();
    if (errors >= 6) {
      console.log("Vous avez perdu!");
      
    }
  }

  found = updatedFound;
  document.getElementById('found').textContent = found;

  if (!found.includes('-')) {
    alert("Vous avez gagné!");
    resetGame();
  }
}

function updateUsedLetters() {
    letterUsedElem.innerHTML = '';
    usedLetters.forEach((letter, index) => {
      const letterElem = document.createElement('span');
      letterElem.textContent = letter;
      letterElem.style.textDecorationLine = 'line-through';
      letterUsedElem.append(letterElem);
      
      // Ajoute une virgule et un espace si ce n'est pas la dernière lettre
      if (index < usedLetters.length - 1) {
        const separator = document.createElement('span');
        separator.textContent = ', ';
        letterUsedElem.append(separator);
      }
    });
  }
  
function resetGame() {
  errors = 0;
  word = words[Math.floor(Math.random() * words.length)];
  found = new Array(word.length).fill('-').join('');
  usedLetters.length = 0;
  document.getElementById('found').textContent = found;
  document.getElementById('errors').textContent = `Erreurs: ${errors}`;
  updateUsedLetters();
}

//Utilisation du clavier
document.addEventListener('keydown', (event) => {
  const keyName = event.key.toUpperCase();
  if (letters.includes(keyName)) {
    document.querySelector(`button:contains('${keyName}')`).click();
  }
});


function updateImage() {
    const drawingDiv = document.getElementById('drawing');
    // Effacer les images précédentes s'il y en a
    drawingDiv.innerHTML = '';
    if(errors > 0) {
      const img = document.createElement('img');
      img.src = `./src/img${errors}.png`;
      img.alt = `Erreur ${errors}`;
      drawingDiv.appendChild(img);
    }
  }