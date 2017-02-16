  var image = document.getElementById("poke");
  var sound = document.getElementById("pokeCry");
  var chosenPoke;               
  var chosenMove;         
  var word;               //word to guesss
  var guess;              // Guess
  var guesses = [];       // Stored guesses
  var caught = 0;          //number of pokemon caught
  var delayMillis = 1500; //1 second
  var hits;               //counts amount of spaces left
  var myHits = 0;
  var lifePerc;
  var myMaxLife = 15;
  var myHp; 
  var loses = 0;
  var maxEnemyHp;
  var width = 100;

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
    $("#poke").fadeIn( "slow", function() {
    // Animation complete.
  });
  //add pokemon cry on appearance
    sound.src = chosenPoke["cry"];

  //replace the words with '_' and prints on the screen
    wordChosenPoke = chosenName.replace(/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi, '_');
    wordChosenMove = chosenMove.replace(/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi, '_');
    $("#hangman-space").html(wordChosenPoke);
    $("#hangman-space-main").html(wordChosenPoke + ' used ' + wordChosenMove);
  
  //changes the HP bar of the pokemon
    maxEnemyHp = (wordChosenPoke.split("_").length - 1) + (wordChosenMove.split("_").length - 1);
    hits = maxEnemyHp;
    lifePerc= Math.floor((hits/maxEnemyHp) * 100);
    $("#enemy-hp").html(lifePerc+ "%");

  //user HP bar
    myHp = Math.floor((myMaxLife-myHits)/myMaxLife * 100);
    $("#my-hp").html(myHp + "%");
  }

  function move(attack) {
  var elem = document.getElementById("enemy-bar");   
  width=width-attack; 
  elem.style.width = width; 
  }

  move(20);
  console.log(width);

  //Call new pokemon  
  newPoke();
  $("#messages").html("Caught: "+ caught + " Lost: " + loses);


  //Runs the logic of hangman everytime a key is pressed 
    addEventListener("keypress", function(event) {            
    var guess = String.fromCharCode(event.charCode);          
      if (guesses.indexOf(guess) == -1){                       
                guesses.push(guess);                           
                sound.src = hitSound;
                $("#messages").html("Caught: "+ caught + " Lost: " + loses);

      } 
      else {                                                    
      sound.src = error;
      $("#messages").html("You've already guessed that letter!");
      }

  //If guess is not in the word, hit user
      if (chosenName.indexOf(guess) == -1 && chosenMove.indexOf(guess) == -1){                   
        myHits++;  
      }
    
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
    $("#hangman-space").html(wordChosenPoke);
    $("#hangman-space-main").html(wordChosenPoke + ' used ' + wordChosenMove);

    //check HP of user and enemy

    hits = (wordChosenPoke.split("_").length - 1) + (wordChosenMove.split("_").length - 1);
    lifePerc= Math.floor((hits/maxEnemyHp) * 100);
    myHp = Math.floor((myMaxLife-myHits)/myMaxLife * 100);
    


    $("#enemy-hp").html(lifePerc+ "%");
    $("#my-hp").html(myHp + "%");


    if(myHp <= 0){
      loses++;
      myHits=0;
      $("#messages").html("Ran away!");
      $("#messages").html("Caught: "+ caught + " Lost: " + loses);
      guesses = [];
      $("#guesses").html(guesses);
      // $("#mypoke").fadeOut( "slow", function() {
    // Animation complete.
  // });
      sound.src = runAway;
      $("#poke").fadeOut( "slow", function() {
    // Animation complete.
  });
      setTimeout(function() {
      newPoke();
      }, delayMillis);
    }


     if(wordChosenMove == chosenMove.toUpperCase()){
          myHits = 0;
          caught++;
          guesses = [];
          $("#guesses").html(guesses);
          $("#messages").html("Caught: "+ caught + " Lost: " + loses);
          sound.src = chosenPoke["cry"];
          setTimeout(function() {
          newPoke();
          }, delayMillis);
          $("#poke").fadeOut( "slow", function() {
    // Animation complete.
  });
     }
   
  });


}
