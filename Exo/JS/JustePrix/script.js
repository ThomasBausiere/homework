document.addEventListener("DOMContentLoaded", function() {
  const userGuessInput = document.getElementById("userGuess");
  const submitButton = document.getElementById("submitGuess");
  const resultDiv = document.getElementById("result");
  const restartButton = document.getElementById("restartGame");
  const game = document.getElementById("game");
  const mage = document.getElementById("mage");

  const MAX_ATTEMPTS = 7;
  const MIN_NUMBER = 1;
  const MAX_NUMBER = 100;

  let targetNumber;
  let attempts = 0;

  function generateRandomNumber() {
    return Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER;
  }

  function displayMessage(message) {
    resultDiv.innerHTML = message;
    // resultDiv.style.display = "block";
  }

  function isValidGuess(guess) {
    return !isNaN(guess) && guess >= MIN_NUMBER && guess <= MAX_NUMBER;
  }

  function updateMageImage() {
    if (attempts >= 4) {
      mage.style.backgroundImage = 'url(./src/mage_nervous.png)';
    } else if (attempts >= 2) {
      mage.style.backgroundImage = 'url(./src/mage_oups.png)';
    }
  }

  function startGame() {
    console.log(targetNumber);
    targetNumber = generateRandomNumber();
    attempts = 0;
    game.style.backgroundImage = 'url(./src/pixel_card_cover.png)';
    mage.style.backgroundImage = 'url(./src/mage_welcome.png)';
    resultDiv.style.display="none";
    displayMessage("");
    userGuessInput.disabled = false;
    submitButton.disabled = false;
    restartButton.style.display = "none";
    userGuessInput.focus();
  }

  function endGame(message) {
    displayMessage(message);
    userGuessInput.disabled = true;
    submitButton.disabled = true;
    restartButton.style.display = "block";
  }

  submitButton.addEventListener("click", function() {
    const userGuess = parseInt(userGuessInput.value, 10);

    if (!isValidGuess(userGuess)) {
      displayMessage("Veuillez entrer un nombre valide entre 1 et 100.");
      return;
    }

    attempts++;
    updateMageImage();

    if (userGuess === targetNumber) {
      endGame(`Bravo! Vous avez trouvé le nombre en ${attempts} essai(s)! Vous avez sauvé le royaume en repoussant les monstres! Je suis fier de vous! Tous les habitants vous remercient! Vous pouvez revenir quand vous voulez! Nous ne savons jamais quand les méchants monstres vont revenir !! A bientôt!`);
      game.style.backgroundImage = 'url(./src/pixel_card_life.png)';
      mage.style.backgroundImage = 'url(./src/mage_go_on.png)';
      return;
    }
    

    if (userGuess < targetNumber) {
      resultDiv.style.display="block";
      displayMessage(`Le nombre est plus grand que ${userGuess}. Essayez encore! C'était votre essai n° ${attempts} sur 7!`);
    } else {
      resultDiv.style.display="block";
      displayMessage(`Le nombre est plus petit que ${userGuess}. Essayez encore. C'était votre essai n° ${attempts} sur 7!`);

    }

    if ((attempts >= MAX_ATTEMPTS) && (userGuess != targetNumber)) {
      endGame(`Vous avez utilisé tous vos essais. Le nombre était ${targetNumber}. Tout est perdu. Le royaume est voué à la destruction ! Ô maladie !Ô desespoir! Ô... Euh recommencez, Tout n'est pas perdu je vois une lumière, là bas, à l'est!`);
      game.style.backgroundImage = 'url(./src/pixel_card_death.png)';
      mage.style.backgroundImage = 'url(./src/mage_angry.png)';
    }

    userGuessInput.value = "";
    userGuessInput.focus();
  });

  restartButton.addEventListener("click", startGame);

  userGuessInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      submitButton.click();
    }
  });

  startGame();  // Initier le jeu au chargement de la page
});
