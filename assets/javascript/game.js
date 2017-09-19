var image = document.getElementById('poke');
var sound = document.getElementById('pokeCry');
var backgroundSound = document.getElementById('back-noise');
var chosenPoke;
var chosenMove;
var word; //word to guesss
var guess; // Guess
var guesses = []; // Stored guesses
var caught = 0; //number of pokemon caught
var delayMillis = 1500; //1 second
var hits; //counts amount of spaces left
var myHits = 0;
var lifePerc;
var myMaxLife = 12;
var myHp;
var loses = 0;
var maxEnemyHp;
var width = 100;
var oldPoke = 0;
var rng;
var pokedex = [];

window.onload = function play() {
	var myAudio = document.getElementById('battlenoise');
	myAudio.volume = 0.2;
	backgroundSound.volume = 1.0;
	sound.volume = 0.4;

	//Create a new pokemon
	function newPoke() {
		//choose a number
		rng = Math.floor(Math.random() * pokemon.length);
		if (rng == oldPoke && rng < pokemon.length - 1) {
			rng++;
		}
		// pokedex.push(rng);

		// if (pokedex.indexOf(rng)> -1){
		//   $("#hangman-space").append(pokeball);
		// }

		//choose a pokemon and move depending on rng
		chosenPoke = pokemon[rng];
		chosenName = chosenPoke.name;
		chosenMove = chosenPoke.type[Math.floor(Math.random() * 6)];
		//make the words lower case for replacement
		chosenName = chosenName.toLowerCase();
		chosenMove = chosenMove.toLowerCase();
		//change image depending on chosen Pokemon
		image.src = chosenPoke['img'];
		$('#poke').fadeIn('slow', function() {});
		//add pokemon cry on appearance
		sound.src = chosenPoke['cry'];
		//replace the words with '_' and prints on the screen
		wordChosenPoke = chosenName.replace(
			/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi,
			'_'
		);
		wordChosenMove = chosenMove.replace(
			/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi,
			'_'
		);
		$('#hangman-space').html(wordChosenPoke);
		$('#hangman-space-main').html(wordChosenPoke + ' used ' + wordChosenMove);
		//changes the HP bar of the pokemon
		maxEnemyHp =
			wordChosenPoke.split('_').length -
			1 +
			(wordChosenMove.split('_').length - 1);
		hits = maxEnemyHp;
		lifePerc = Math.floor(hits / maxEnemyHp * 100);
		$('#enemy-hp').html(lifePerc + '%');
		//user HP bar
		myHp = Math.floor((myMaxLife - myHits) / myMaxLife * 100);
		$('#my-hp-perc').html(myHp + '%');
		$('#my-bar').css('background-color', 'green');
		$('#enemy-bar').css('background-color', 'green');
		backgroundSound.src = '';
	}

	function attack(enemyHp, myHp) {
		$('#enemy-bar').css('width', enemyHp);
		$('#my-bar').css('width', myHp);
	}

	//Call new pokemon
	oldPoke = rng;
	newPoke();
	$('#messages').html('Caught: ' + caught + ' Lost: ' + loses);

	//Logic when key is pressed

	function logic(guess) {
		if (guesses.indexOf(guess) == -1) {
			guesses.push(guess);
			sound.src = hitSound;
			$('#messages').html('Caught: ' + caught + ' Lost: ' + loses);
		} else {
			sound.src = error;
			$('#messages').html("You've already guessed that letter!");
		}

		//If guess is not in the word, hit user
		if (chosenName.indexOf(guess) == -1 && chosenMove.indexOf(guess) == -1) {
			myHits++;
			$('#hit-me').css('opacity', '0.15');
			setTimeout(function() {
				$('#hit-me').css('opacity', '0');
			}, 140);
		}

		//If guess is in the word, hit enemy
		if (chosenName.indexOf(guess) > -1 || chosenMove.indexOf(guess) > -1) {
			$('#hit').css('opacity', '0.15');
			setTimeout(function() {
				$('#hit').css('opacity', '0');
			}, 140);
		}

		//Display already used letters
		document.getElementById('guesses').innerHTML = guesses;
		//replaces the letters in the spaces with the guessed letter
		for (var i = 0; i < guesses.length; i++) {
			for (var j = 0; j < chosenName.length; j++) {
				if (chosenName[j] == guesses[i]) {
					wordChosenPoke =
						wordChosenPoke.substr(0, j) +
						guesses[i] +
						wordChosenPoke.substr(j + 1);
					wordChosenPoke = wordChosenPoke.toUpperCase();
				}
			}
			for (var k = 0; k < chosenMove.length; k++) {
				if (chosenMove[k] == guesses[i]) {
					wordChosenMove =
						wordChosenMove.substr(0, k) +
						guesses[i] +
						wordChosenMove.substr(k + 1);
					wordChosenMove = wordChosenMove.toUpperCase();
				}
			}
		}
		//prints the letters in the div
		$('#hangman-space').html(wordChosenPoke);
		$('#hangman-space-main').html(wordChosenPoke + ' used ' + wordChosenMove);

		//check HP of user and enemy
		hits =
			wordChosenPoke.split('_').length -
			1 +
			(wordChosenMove.split('_').length - 1);
		lifePerc = Math.floor(hits / maxEnemyHp * 100);
		myHp = Math.floor((myMaxLife - myHits) / myMaxLife * 100);
		attack(lifePerc, myHp);
		$('#enemy-hp').html(lifePerc + '%');
		$('#my-hp-perc').html(myHp + '%');

		//Once user makes too many wrong guesses, make pokemon run away
		if (myHp <= 0) {
			loses++;
			myHits = 0;
			$('#messages').html('Caught: ' + caught + ' Lost: ' + loses);
			guesses = [];
			$('#guesses').html(guesses);
			sound.src = runAway;
			$('#messages').html('Ran away!');
			$('#poke').fadeOut('slow', function() {});
			setTimeout(function() {
				attack(100, 100);
				newPoke();
				$('.letter').removeClass('clicked');
			}, delayMillis);
		}

		//Once user solves the hangman, encounter a new pokemon
		if (
			wordChosenMove == chosenMove.toUpperCase() &&
			wordChosenPoke == chosenName.toUpperCase()
		) {
			myHits = 0;
			caught++;
			guesses = [];
			$('#guesses').html(guesses);
			$('#messages').html('Caught: ' + caught + ' Lost: ' + loses);
			sound.src = chosenPoke['cry'];
			setTimeout(function() {
				attack(100, 100);
				newPoke();
				$('.letter').removeClass('clicked');
			}, delayMillis);
			$('#poke').fadeOut('slow', function() {});
		}

		if (myHp < 35 && myHp > 25) {
			$('#my-bar').css('background-color', 'orange');
			backgroundSound.src = lowHealth;
		}

		if (lifePerc < 35 && lifePerc > 25) {
			$('#enemy-bar').css('background-color', 'orange');
		}
	}

	//For mobile play
	var alphabet = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z'
	];
	// create alphabet ul
	var buttons = function() {
		myButtons = document.getElementById('buttons');
		letters = document.createElement('ul');

		for (var i = 0; i < alphabet.length; i++) {
			letters.id = 'alphabet';
			list = document.createElement('li');
			list.className = 'letter';
			list.id = alphabet[i];
			list.innerHTML = alphabet[i];
			myButtons.appendChild(letters);
			letters.appendChild(list);
		}
	};

	buttons();

	//Runs the logic of hangman everytime a key is pressed
	addEventListener('keypress', function(event) {
		var guess = String.fromCharCode(event.charCode);
		logic(guess);
	});

	$('.letter').click(function() {
		var guess = this.innerHTML;
		console.log(guess);
		$('#' + guess).addClass('clicked');
		logic(guess);
	});
};
