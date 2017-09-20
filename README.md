# Pokemon Hangman

## Live Link

[Click here to play the game. Volume warning!](https://sharloteean.github.io/Hangman-Game/)

## Description on how to use the app

Play as a trainer with your trusty pokemon and solve hangman riddles to catch more pokemon! Press any key to guess the hangman words. The mobile version will use buttons. When you complete the hangman, you catch the pokemon. If you lose all your HP, the enemy runs away.

## Requirements

* Use key events to listen for the letters that your players will type.

* Display the following on the page:

```
   Press any key to get started!

   Wins: (# of times user guessed the word correctly).

   If the word is `madonna`, display it like this when the game starts: `_ _ _ _ _ _ _`.

   As the user guesses the correct letters, reveal them: `m a d o _  _ a`.

   Number of Guesses Remaining: (# of guesses remaining for the user).

   Letters Already Guessed: (Letters the user has guessed, displayed like `L Z Y H`).
```
* After the user wins/loses the game should automatically choose another word and make the user play it.

## Technologies Used
* CSS
* Javascript
* Jquery for Dom Manipulation

Pokemon sprites courtesy of http://www.pokestadium.com/tools/sprites

The event listener stores the key press and runs the javasctipt logic that changes the spaces to the letter pressed if the character appears in the hangman.

```
addEventListener("keypress", function(event) {
      var guess = String.fromCharCode(event.charCode);
      if (guesses.indexOf(guess) == -1) {
        guesses.push(guess);
        sound.src = hitSound;
        $("#messages").html("Caught: " + caught + " Lost: " + loses);
      } else {
        sound.src = error;
        $("#messages").html("You've already guessed that letter!");
      }
      //If guess is not in the word, hit user
      if (chosenName.indexOf(guess) == -1 && chosenMove.indexOf(guess) == -1) {
        myHits++;
      }
      //Display already used letters
      document.getElementById("guesses").innerHTML = guesses;
      //replaces the letters in the spaces with the guessed letter
      for (var i = 0; i < guesses.length; i++) {
        for (var j = 0; j < chosenName.length; j++) {
          if (chosenName[j] == guesses[i]) {
            wordChosenPoke = wordChosenPoke.substr(0, j) + guesses[i] + wordChosenPoke.substr(
              j + 1);
            wordChosenPoke = wordChosenPoke.toUpperCase();
          }
        }
        for (var k = 0; k < chosenMove.length; k++) {
          if (chosenMove[k] == guesses[i]) {
            wordChosenMove = wordChosenMove.substr(0, k) + guesses[i] + wordChosenMove.substr(
              k + 1);
            wordChosenMove = wordChosenMove.toUpperCase();
          }
        }
      }
```

A new pokemon is created in Javascript and replaces the image with a new pokemon and a new hangman puzzle.

```
function newPoke() {
      //choose a number
      rng = Math.floor(Math.random() * pokemon.length);
      if (rng == oldPoke && rng < pokemon.length - 1) {
        rng++;
      }

      //choose a pokemon and move depending on rng
      chosenPoke = pokemon[rng];
      chosenName = chosenPoke.name;
      chosenMove = chosenPoke.type[Math.floor(Math.random() * 4)];

      //make the words lower case for replacement  
      chosenName = chosenName.toLowerCase();
      chosenMove = chosenMove.toLowerCase();

      //change image depending on chosen Pokemon
      image.src = chosenPoke["img"];
      $("#poke").fadeIn("slow", function() {});

      //add pokemon cry on appearance
      sound.src = chosenPoke["cry"];

      //replace the words with '_' and prints on the screen
      wordChosenPoke = chosenName.replace(/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi,
        '_');
      wordChosenMove = chosenMove.replace(/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi,
        '_');
      $("#hangman-space").html(wordChosenPoke);
      $("#hangman-space-main").html(wordChosenPoke + ' used ' + wordChosenMove);

      //changes the HP bar of the pokemon
      maxEnemyHp = (wordChosenPoke.split("_").length - 1) + (wordChosenMove.split("_").length - 1);
      hits = maxEnemyHp;
      lifePerc = Math.floor((hits / maxEnemyHp) * 100);
      $("#enemy-hp").html(lifePerc + "%");

      //user HP bar
      myHp = Math.floor((myMaxLife - myHits) / myMaxLife * 100);
      $("#my-hp-perc").html(myHp + "%");
    }
```
Made the text unselectable with

```
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
```
