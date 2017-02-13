

  var chosenPoke;         // Chosen Pokemon      
  var chosenMove;               // Chosen Move
  var word;               //word to guesss
  var guess;             // Guess
  var guesses = [ ];      // Stored guesses
  var lives ;             // Lives
  var counter ;           // Count correct guesses
  var space;              // Number of spaces in word '-'

   // Get elements
  var showLives = document.getElementById("mylives");
  var showUsed = document.getElementById("usedChar");

  

window.onload = function play() {

  //choose a word
  var rng = Math.floor(Math.random() * 7);
    chosenPoke = pokemon[rng];
    chosenMove = pokeType[rng][Math.floor(Math.random() * 4)];
    var image = document.getElementById("poke");
    image.src = chosenPoke["img"];
    chosenPoke = chosenPoke["name"].replace(/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi, '_');
    chosenMove = chosenMove.replace(/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi, '_');
    document.getElementById("hangman-space").innerHTML = chosenPoke + ' used ' +chosenMove;
  //choose a move
  //  chosenMove = pokeType[Math.floor(Math.random() * pokeType.length)];

    console.log(chosenPoke);

    guesses = [ ];
    lives = 10;
    counter = 0
    space = 0;

  }
