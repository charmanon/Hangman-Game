var pokemon;            // Selected pokemon 
var pokeType;           // Selected type
var hitSound = "assets/sounds/hitsound.wav";
var error = "assets/sounds/error.mp3";
var runAway = "assets/sounds/runaway.mp3";
var lowHealth = "assets/sounds/lowhealth.mp3";

var electric = ["Thunderbolt", "Thunder", "Volt Switch", "Volt Tackle", "Electro Ball", "Spark"];

var water = ["Surf", "Hydro Pump", "Water Gun", "Bubblebeam", "Aqua Jet", "Whirlpool"];

var grass = ["Solar Beam", "Frenzy Plant", "Giga Drain", "Razor Leaf", "Grass Knot", "Bullet Seed"];

var normal = ["Quick Attack", "Hyper Beam", "Body Slam", "Tackle", "Headbutt", "Hidden Power"];

var flying = ["Aerial Ace", "Air Slash", "Drill Peck", "Sky Attack", "Acrobatics", "Fly"];

var fire = ["Fire Blast", "Ember", "Incinerate", "Flamethrower", "Blaze Kick", "Eruption"];

var ground = ["Earthquake", "Mud Bomb", "Dig", "Fissure", "Bulldoze", "Magnitude"];

var psychic = ["Psychic", "Confusion", "Future Sight", "Zen Headbutt", "Extrasensory", "Mirror Coat"];

var bug = ["Bug Bite", "Fury Cutter", "Leech Life", "Bug Buzz", "Silver Wind", "X Scissor"];

var rock = ["Ancient Power", "Rock Blast", "Stone Edge", "Rollout", "Rock Slide", "Sandstorm"];

var ice = ["Ice Beam", "Blizzard", "Avalanche", "Aurora Veil", "Hail", "Icy Wind"];

var poison = ["Poison Jab", "Cross Poison", "Acid Spray", "Sludge Bomb", "Gunk Shot", "Toxic"];

var ghost = ["Curse", "Destiny Bond", "Shadow Ball", "Nightmare", "Lick", "Astonish"];

var dark = ["Feint Attack", "Night Slash", "Sucker Punch", "Pursuit", "Crunch", "Dark Pulse"];

var steel = ["Iron Tail", "Bullet Punch", "Metal Claw", "Magnet Bomb", "Iron Head", "Flash Cannon"];

var dragon = ["Dragon Claw", "Outrage", "Twister", "Dragon Pulse", "Draco Meteor", "Dragon Breath"];

var fairy = ["Fairy Wind", "Moonblast", "Dazzling Gleam", "Sweet Kiss", "Disarming Voice", "Draining Kiss"];

var fighting = ["Brick Break", "Cross Chop", "Dynamic Punch", "Jump Kick", "Focus Blast", "Close Combat"];
 
var squirtle = {
	name: "Squirtle",
	type: water,
	img: "assets/images/squirtle.gif",
	cry: "assets/sounds/squirtle.mp3"
}

var arcanine = {
	name: "Arcanine",
	type: fire,
	img: "assets/images/arcanine.gif",
	cry: "assets/sounds/arcanine.mp3"
}

var bellossom = {
	name: "Bellossom",
	type: grass,
	img: "assets/images/bellossom.gif",
	cry: "assets/sounds/bellossom.mp3"
}

var pikachu = {
	name: "Pikachu",
	type: electric,
	img: "assets/images/pikachu.gif",
	cry: "assets/sounds/pikachu.mp3"
}

var wigglytuff = {
	name: "Wigglytuff",
	type: normal,
	img: "assets/images/wigglytuff.gif",
	cry: "assets/sounds/wigglytuff.mp3"
}

var gardevoir = {
	name: "Gardevoir",
	type: psychic,
	img: "assets/images/gardevoir.gif",
	cry: "assets/sounds/gardevoir.mp3"
}

var groudon = {
	name: "Groudon",
	type: ground,
	img: "assets/images/groudon.gif",
	cry: "assets/sounds/groudon.mp3"
}

var scyther = {
	name: "Scyther",
	type: bug,
	img: "assets/images/scyther.gif",
	cry: "assets/sounds/scyther.mp3"
}

var pidgeotto = {
	name: "Pidgeotto",
	type: flying,
	img: "assets/images/pidgeotto.gif",
	cry: "assets/sounds/pidgeotto.mp3"
}

var steelix = {
	name: "Steelix",
	type: steel,
	img: "assets/images/steelix.gif",
	cry: "assets/sounds/steelix.mp3"
}

var clefairy = {
	name: "Clefairy",
	type: fairy,
	img: "assets/images/clefairy.gif",
	cry: "assets/sounds/clefairy.mp3"
}

var machamp = {
	name: "Machamp",
	type: fighting,
	img: "assets/images/machamp.gif",
	cry: "assets/sounds/machamp.mp3"
}

var glaceon = {
	name: "Glaceon",
	type: ice,
	img: "assets/images/glaceon.gif",
	cry: "assets/sounds/glaceon.mp3"
}

var dragonair = {
	name: "Dragonair",
	type: dragon,
	img: "assets/images/dragonair.gif",
	cry: "assets/sounds/dragonair.mp3"
}

var blaziken = {
	name: "Blaziken",
	type: fire,
	img: "assets/images/blaziken.gif",
	cry: "assets/sounds/blaziken.mp3"
}

var weezing = {
	name: "Weezing",
	type: poison,
	img: "assets/images/weezing.gif",
	cry: "assets/sounds/weezing.mp3"
}

var umbreon = {
	name: "Umbreon",
	type: dark,
	img: "assets/images/umbreon.gif",
	cry: "assets/sounds/umbreon.mp3"
}

var gengar = {
	name: "Gengar",
	type: ghost,
	img: "assets/images/gengar.gif",
	cry: "assets/sounds/gengar.mp3"
}

var espeon = {
	name: "Espeon",
	type: psychic,
	img: "assets/images/espeon.gif",
	cry: "assets/sounds/espeon.mp3"
}

var kyogre = {
	name: "Kyogre",
	type: water,
	img: "assets/images/kyogre.gif",
	cry: "assets/sounds/kyogre.mp3"
}

var lugia = {
	name: "Lugia",
	type: psychic,
	img: "assets/images/lugia.gif",
	cry: "assets/sounds/lugia.mp3"
}

var onix = {
	name: "Onix",
	type: rock,
	img: "assets/images/onix.gif",
	cry: "assets/sounds/onix.mp3"
}

pokemon = [squirtle, arcanine, bellossom, pikachu, wigglytuff, gardevoir, groudon, scyther,
			pidgeotto, steelix, clefairy, machamp, glaceon, dragonair, blaziken, weezing,
			umbreon, gengar, espeon, lugia, onix];

pokeType = [water, fire, grass, electric, normal, psychic,
			bug, ground, rock, ice, poison, ghost, psychic, dark,
			steel, dragon, fairy, fighting];







