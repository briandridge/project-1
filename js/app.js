var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// var x = canvas.width/2;
// var y = canvas.height-30;

var shipWidth = 50;
var shipHeight = 50;
var shipX = (canvas.width-shipWidth)/2;
var shipY = canvas.height-30;

var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

var blasterRadius = 10;
var blasterTotal = 10;
var blasters = [];

// var randomJunkX;
var junkXRate = 2;
var junkY = 30;
var junkWidth = 25;
var junkHeight = 25;
var junkTotal = 10;
var junk = [];

var counter = false;
var score1 = false;
var score2 = false;
var turnOver = false;

var PlayerOneTurn;
var PlayerTwoTurn;

// var asteroidHeight = canvas.height-(shipHeight*2);

// listens for r/l arrow keys, changes state to true, right/leftPressed variables used in drawShip function
// use keydown so can hold down to hold down to repeat
document.addEventListener("keydown", function(event){
	if (event.keyCode == 39) {
		rightPressed = true;
	}	
	else if (event.keyCode == 37) {
		leftPressed = true;
	}
	else if (event.keyCode == 32 && (blasters.length <= blasterTotal) || (junk.length <= junkTotal)) {
		spacePressed = true;
		blasters.push([shipX +25, shipY -50, blasterRadius, 0, Math.PI*2]);
		junk.push([shipX, junkY, junkWidth, junkHeight]);
	}
});

// listens to keyup, changes state back to false
// resets right/leftPressed variables to false state
// use keyup so it stops on lift up

// also pushes a blaster with current ship x/y coordinates to blasters array so drawBlasters function know when or if to draw
document.addEventListener("keyup", function(event){
	if (event.keyCode == 39) {
		rightPressed = false;
	}
	else if (event.keyCode == 37) {
		leftPressed = false;
	}
	else if (event.keyCode == 32) {
		spacePressed = false;
	}
});
   
var drawShip = function(){
	if (rightPressed && shipX < canvas.width-shipWidth) {
		shipX += 3;
	}
	else if (leftPressed && shipX > 0) {
		shipX -= 3;
	}
	ctx.beginPath();
	ctx.rect(shipX, canvas.height-(shipHeight*2), shipWidth, shipHeight);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath(); 
};

// var drawAsteroid = function(){
// 	ctx.beginPath();
// 	ctx.rect(1, asteroidHeight, 400, 10);
// 	ctx.fillStyle = "black";
// 	ctx.fill();
// 	ctx.closePath(); 
// };

// draws blasters that are in the blasters array
var drawBlaster = function(){
	// if (blasters.length)
	for (var i = 0; i < blasters.length; i++) {
		ctx.beginPath();
		ctx.arc(blasters[i][0],blasters[i][1],blasters[i][2],blasters[i][3], blasters[i][4]);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();
	}
};

// goes through blasters array, if the y coordinates of [i] are on the canvas, changes y to =+4
// if not, splices the blaster out of the array to get rid of it
var moveBlaster = function(){
	for (var i = 0; i < blasters.length; i++) {
		if (blasters[i][1] > 0) {
			blasters[i][1] += -4;
		}
		else if (blasters[i][1] < 1) {
			blasters.splice(i,1);
			console.log(blasters+ "spliced blaster");
		}
	}
};

// using same method as blaster, draws some space junk
var drawJunk = function(){
	for (var i = 0; i < junk.length; i++) {
		ctx.beginPath();
		ctx.rect(junk[i][0],junk[i][1],junk[i][2],junk[i][3]);
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.closePath();			
	}
};

// couldn't get random angle to work
// var randomJunkX = function(){
// 	var rando = Math.floor(Math.random() * 13) - 6;
// 	return rando;
// 	console.log("it ran");
// };

// for all existing junk, ++ their y values down the canvas, ++ their x value by junkXRate (defined in bounceJunk()), and splice them from the array if they go off the canvas
var moveJunk = function(){
	for (var i = 0; i < junk.length; i++) {
		if (junk[i][1] > 10) {
			junk[i][1] -= -2;
			junk[i][0] += junkXRate;
		}
		// else if (junk[i][1] >= asteroidHeight) {
		// 	console.log(junk[i]);
		// 	junk.splice(i,1);
		// 	console.log("spliced junk"+ junk);
		// }
	}
};

// var moveJunkX = function(){
// 	for (var i = junk.length - 1; i >= 0; i--) {
// 		if (junk[i][0] > canvas.width - junkWidth) {
// 			junk[i][0] += junkXRate;
// 		} 
// 		else if (junk[i][0] <= 0 ) {
// 			junk[i][0] -= junkXRate;
// 		}
// 	}
// };

// if junk x value is 0 or width of the canvas, reverse it's direction (negate or make positive JunkXRate)
var bounceJunk = function(){
	for (var i = junk.length - 1; i >= 0; i--) {
		if (junk[i][0] > canvas.width - junkWidth) {
		junkXRate = -2;
		}
		else if (junk[i][0] <= 0) {
			junkXRate = 2;
		}
	}
};

var spliceJunk = function(){
	for (var i = 0; i < junk.length; i++) {
		if (junk[i][1] >= canvas.height) {
			junk.splice(i,1);
			console.log("spliced junk"+ junk);
		}
	}
};




// if blaster and junk x/y values line up
var goodAim = function(){
	var remove = false;
	for (var i = 0; i < blasters.length; i++) {
		for (var ii = 0; ii < junk.length; ii++) {
				 if (blasters[i][1] <= (junk[ii][1] + junk[ii][3]) && blasters[i][0] >= junk[ii][0] && blasters[i][0] <= (junk[ii][0] + junk[ii][2])){
				 	// if (blasterY <= junkY + junkHeight) && (blasterX >= junkX) && (blasterX <= junkX + junkWidth)
				 	// if (blaster is lower than or touching junk's leading edge) && (blasterX left border is equal or right of JunkX's left border...) && (...blasterX left border is to the left of JunkX's right border)

					// blaster and junk arrays for reference:
					// blasters.push([shipX +25, shipY -50, blasterRadius, 0, Math.PI*2]);
					// junk.push([shipX, junkY, junkWidth, junkHeight]);

					remove = true;
					junk.splice(ii,1);
					counter ++;
					console.log(counter);
				}
				if (remove === true) {
				blasters.splice(i,1);
				remove = false;
			}
		}
	}
};

// if junk and ship x/y values line up
var starFoxDown = function(){
	for (var i = 0; i < junk.length; i++) {
			if ((junk[i][1] - junkHeight === shipY) && (junk[i][0] >= shipX) && (junk[i][0] <= shipX + shipWidth)){
			 // is higher than or touching ships y plus height) && (junk's x is greater than ships x) && (junks x + width is less than ships x + width) {}	
			console.log("Star Fox is down!");
			turnOver = true;
		}
	}
};

var sModal = document.getElementById('startModal');
// var tModal = document.getElementById('turnModal');
// var gModal = document.getElementById('gameOverModal');
var sButton = document.getElementById("startButton");
var message = document.getElementById("startText");



// on window load, or depending on values of score vars, tells user where we are.
var fireModal = function(){
	if (score1 === false) {
		sModal.style.display = "block";
		message.innerHTML = "Welcome";
		sButton.innerHTML = "Click to Initiate Player 1 launch sequence";
		// console.log("var score =" + counter);
		// console.log("var score1 =" + score1);
		// console.log("var score1 =" + score2);
		PlayerOneTurn = true;
		PlayerTwoTurn = false;
	}
	else if ((counter === 10) || (turnOver === true)) {
		// score2 = counter;
		clearInterval(infiniteSpaceLoop);
		sModal.style.display = "block";
		message.innerHTML = "Player 1 score: " + score1;
		sButton.innerHTML = "Initiate Player 2 Launch Sequence";
		// console.log("var score =" + score);
		// console.log("var score1 =" + score1);
		PlayerOneTurn = false;
		PlayerTwoTurn = true;
	}
	else if (score1 && score2) {
		clearInterval(infiniteSpaceLoop);
		sModal.style.display = "block";
		message.innerHTML = "Player 1 score: " + score1 <br> "Player 2 score: " + score2;
		sButton.innerHTML = "Initiate Player 2 launch sequence";
		// console.log("var score =" + counter);
		// console.log("var score1 =" + score1);
		// console.log("var score1 =" + score2);
		PlayerOneTurn = false;
		PlayerTwoTurn = false;
	}	
};


// click listener on link on modal. on click resets score vars and initiates game loop.
document.getElementById("startButton").addEventListener("click", function() {

// sButton.addEventListener("click", function(){
	if (PlayerOneTurn) {
		sModal.style.display = "none";
		score1 = counter;
		counter = 0;
	}
	else if (PlayerTwoTurn) {
		sModal.style.display = "none";
		score2 = counter;
		counter = 0;
	}
	else if ((PlayerOneTurn === false) && (PlayerTwoTurn === false)) {
		sModal.style.display = "none";
		score1 = 0;
		score2 = 0;
		counter = 0;
	}
	initiateGame();
});

// erases every thing in the 'verse every interval
var clearGalaxy =function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// the game loop - calls all functions every interval
var infiniteSpaceLoop = function(){
	clearGalaxy();
	drawShip();
	drawBlaster();
	moveBlaster();
	drawJunk();
	moveJunk();
	// moveJunkX();
	bounceJunk();
	goodAim();
	starFoxDown();
	spliceJunk();
	fireModal();
};

// var generateRandom = function(){
// 	setInterval(makeARandom, 10);
// };

// sets an interval for the game loop function so it calls every 10 milliseconds
var initiateGame = function(){
	setInterval(infiniteSpaceLoop, 10);
};

// calls fireModal function on window load
window.onload = fireModal;


