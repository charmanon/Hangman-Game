  var chosenPoke;         // Chosen Pokemon      
  var chosenMove;         // Chosen Move
  var word;               //word to guesss
  var guess;              // Guess
  var guesses = [ ];      // Stored guesses
  var lives ;             // Lives
  var counter ;           // Count correct guesses
  var space;              // Number of spaces in word '-'

   // Get elements
  var showLives = document.getElementById("mylives");
  var showUsed = document.getElementById("usedChar");

  function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

window.onload = function play() {

    //choose a number
    var rng = Math.floor(Math.random() * 7);

  //choose a pokemon and move depending on rng 
    chosenPoke = pokemon[rng];
    chosenName = chosenPoke.name;
    chosenMove = chosenPoke.type[Math.floor(Math.random() * 4)];

  //make the words lower case for replacement  
    chosenName = chosenName.toLowerCase();
    chosenMove = chosenMove.toLowerCase();

  //change image depending on chosen Pokemon
    var image = document.getElementById("poke");
    image.src = chosenPoke["img"];

  //add pokemon cry on appearance
    var sound = document.getElementById("pokeCry");
    sound.src = chosenPoke["cry"];

  //replace the words with '_' and prints on the screen
    wordChosenPoke = chosenName.replace(/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi, '_');
    wordChosenMove = chosenMove.replace(/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi, '_');
    document.getElementById("hangman-space").innerHTML = wordChosenPoke + ' used ' + wordChosenMove;
  
  
    addEventListener("keypress", function(event) {            //Listens for character press
    var guess = String.fromCharCode(event.charCode);          //Stores key pressed  
      if (guesses.indexOf(guess) == -1){                      //If guess is not in the array of guesses 
                guesses.push(guess);                          //Add to array 
                sound.src = hitSound;
      } 
      else{                                                    //Otherwise display error message
      sound.src = error;
      document.getElementById("messages").innerHTML = "You've already guessed that letter!";
      }
    document.getElementById("guesses").innerHTML = guesses;     //Display already used letters
    
          for(var i = 0; i<guesses.length; i++){
            for (var j=0; j<chosenName.length;j++){
              if(chosenName[j]==guesses[i]){
                wordChosenPoke = wordChosenPoke.substr(0,j) + guesses[i] + wordChosenPoke.substr(j+1);
                document.getElementById("hangman-space").innerHTML = wordChosenPoke + ' used ' + wordChosenMove;
              }              
            }
            for (var k=0;k<chosenMove.length;k++){
              if(chosenMove[k]==guesses[i]){
                wordChosenMove = wordChosenMove.substr(0,k) + guesses[i] + wordChosenMove.substr(k+1);
                document.getElementById("hangman-space").innerHTML = wordChosenPoke + ' used ' + wordChosenMove;
              }                   
            }
          }

   
  });


  
  

    
    lives = 10;
    counter = 0
    space = 0;

  }
