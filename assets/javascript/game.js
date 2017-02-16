  var image = document.getElementById("poke");
  var sound = document.getElementById("pokeCry");
  var chosenPoke;               
  var chosenMove;         
  var word;               //word to guesss
  var guess;              // Guess
  var guesses = [];       // Stored guesses
  var caught = 0;          //number of pokemon caught
  var delayMillis = 2000; //1 second
  var hits;               //counts amount of spaces left
  var myHits = 0;
  var lifePerc;
  var myMaxLife = 10;
  var myHp; 
  var loses = 0;
  var maxEnemyHp;

   // Get elements
  var showLives = document.getElementById("mylives");
  var showUsed = document.getElementById("usedChar");

  window.onload = function play() {

//Create a new pokemon
  function newPoke(){
  
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

    image.src = chosenPoke["img"];

  //add pokemon cry on appearance
    sound.src = chosenPoke["cry"];

  //replace the words with '_' and prints on the screen
    wordChosenPoke = chosenName.replace(/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi, '_');
    wordChosenMove = chosenMove.replace(/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi, '_');
    document.getElementById("hangman-space").innerHTML = wordChosenPoke + ' used ' + wordChosenMove;
  
  //changes the HP bar of the pokemon
    maxEnemyHp = (wordChosenPoke.split("_").length - 1) + (wordChosenMove.split("_").length - 1);
    hits = maxEnemyHp;
    lifePerc= Math.floor((hits/maxEnemyHp) * 100);
    $("#enemy-hp").html(lifePerc+ "%");

  //user HP bar
    myHp = Math.floor((myMaxLife-myHits)/myMaxLife * 100);
    $("#my-hp").html(myHp + "%");
  }

    
  newPoke();
  $("#messages").html("<p>Caught: </p>"+ caught);

    //Stores key pressed  
    addEventListener("keypress", function(event) {            //Listens for character press
    var guess = String.fromCharCode(event.charCode);          
      if (guesses.indexOf(guess) == -1){                      //If guess is not in the array of guesses 
                guesses.push(guess);                          //Add to array 
                sound.src = hitSound;
                $("#messages").html("<p>Caught: </p>"+ caught + "<p>Loses:</p> " + loses);

      } 
      else {                                                    //Otherwise display error message
      sound.src = error;
      $("#messages").html("You've already guessed that letter!");
      }

      if (chosenName.indexOf(guess) == -1){                   //If guess is not in the word, hit user
        myHits++;  
      }
      console.log(myHits);
    
    //Display already used letters
    document.getElementById("guesses").innerHTML = guesses;     
    
    //replaces the letters in the spaces with the guessed letter
    for(var i = 0; i<guesses.length; i++){
      for (var j=0; j<chosenName.length;j++){
        if(chosenName[j]==guesses[i]){
          wordChosenPoke = wordChosenPoke.substr(0,j) + guesses[i] + wordChosenPoke.substr(j+1);
          wordChosenPoke = wordChosenPoke.toUpperCase();
            }
          }             
      for (var k=0;k<chosenMove.length;k++){
        if(chosenMove[k]==guesses[i]){
          wordChosenMove = wordChosenMove.substr(0,k) + guesses[i] + wordChosenMove.substr(k+1);
          wordChosenMove = wordChosenMove.toUpperCase();
            }
          }                 
    }



    //prints the letters in the div 
    $("#hangman-space").html(wordChosenPoke + ' used ' + wordChosenMove);

    //check HP of user and enemy

    hits = (wordChosenPoke.split("_").length - 1) + (wordChosenMove.split("_").length - 1);
    lifePerc= Math.floor((hits/maxEnemyHp) * 100);
    myHp = Math.floor((myMaxLife-myHits)/myMaxLife * 100);
    

    /*if(myHp <= 0){
      loses++;
      $("#messages").html("Game over!");
      guesses = [];
      $("#guesses").html(guesses);
      setTimeout(function() {
      newPoke();
      }, delayMillis);
    }*/

    $("#enemy-hp").html(lifePerc+ "%");
    $("#my-hp").html(myHp + "%");

     if (wordChosenMove == chosenMove.toUpperCase()){
          console.log(wordChosenMove);
          caught++;
          guesses = [];
          $("#guesses").html(guesses);
          setTimeout(function() {
          newPoke();
          }, delayMillis);
          $("#messages").html("<p>Caught: </p>"+ caught + "<p>Loses:</p> " + loses);
     }
   
  });

  


}
