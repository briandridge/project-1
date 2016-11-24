var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var shipWidth = 50;
var shipHeight = 50;
var shipX = (canvas.width-shipWidth)/2;
var shipY = 647;
// shipImg = new Image();
// shipImg.src = '../assets/ship.png';

var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

var blasterRadius = 10;
var blasterTotal = 4;
var blasters = [];
// blasterImg = new Image();
// blasterImg.src = '../assets/blaster.png';

// var randomJunkX;
var junkXRate = 2.5;
var junkY = 30;
var junkWidth = 25;
var junkHeight = 25;
var junkTotal = 10;
var junk = [];
// junkImg = new Image();
// junkImg.src = '../assets/junk.png';

var counter = 0;
var score1 = counter;
var score2 = 0;
var turnOver = false;

var beginGame = true;
var playerOneTurn = false;
var playerTwoTurn = false;

var setLoopInterval;
var setJunkInterval;

var stopLoopInterval = function(){
	clearInterval(setLoopInterval);
};

var stopJunkInterval = function(){
	clearInterval(setJunkInterval);
};

var sModal = document.getElementById('startModal');
var sButton = document.getElementById("startButton");
var message = document.getElementById("startText");

// listens for r/l arrow keys, changes state to true, right/leftPressed variables used in drawShip function
// use keydown so can hold down to repeat
document.addEventListener("keydown", function(event){
	if (event.keyCode == 39) {
		rightPressed = true;
	}	
	else if (event.keyCode == 37) {
		leftPressed = true;
	}
	else if (event.keyCode == 32 && (blasters.length <= blasterTotal)) {
		spacePressed = true;
		blasters.push([shipX +25, shipY -50, blasterRadius, 0, Math.PI*2]);
	}
});

 // || (junk.length <= junkTotal)

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

// draws ship according to new coordinates from key listeners
var drawShip = function(){
	if (rightPressed && shipX < canvas.width-shipWidth) {
		shipX += 3;
	}
	else if (leftPressed && shipX > 0) {
		shipX -= 3;
	}
	ctx.beginPath();
	// ctx.drawImage(shipImg, shipX, canvas.height-(shipHeight*2));
	ctx.rect(shipX, canvas.height-(shipHeight*2), shipWidth, shipHeight);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath(); 
};

// draws blasters that are in the blasters array
var drawBlaster = function(){
	// if (blasters.length)
	for (var i = 0; i < blasters.length; i++) {
		ctx.beginPath();
		ctx.arc(blasters[i][0],blasters[i][1],blasters[i][2],blasters[i][3], blasters[i][4]);
		ctx.fillStyle = "#B20000";
		ctx.fill();
		ctx.closePath();
	}
};

// goes through blasters array, if the y coordinates of [i] are on the canvas, changes y to =+ -4
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

// pushes junk into junk array - called on an interval which is set by clicking the start game link on the modal
var makeJunk = function (){
	if (junk.length <= junkTotal) {
	junk.push([shipX, junkY, junkWidth, junkHeight]);
	} 
};

// draws space junk from the junk array
var drawJunk = function(){
	for (var i = 0; i < junk.length; i++) {
		ctx.beginPath();
		// ctx.drawImage(junkImg, junk[i][0],junk[i][1]);
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

// for all existing junk, ++ their y values down the canvas, ++ their x value by junkXRate (defined in bounceJunk())
var moveJunk = function(){
	for (var i = 0; i < junk.length; i++) {
		if (junk[i][1] > 10) {
			junk[i][1] -= -2;
			junk[i][0] += junkXRate;
		}
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
			// junk[i][0] -= junkXRate;
			junkXRate = -2;
		}
		else if (junk[i][0] <= 0) {
			// junk[i][0] += 2;
			 junkXRate = 2;
		}
	}
};

// splice junk out of array if it's y coordinates are off the canvas
var spliceJunk = function(){
	for (var i = 0; i < junk.length; i++) {
		if (junk[i][1] >= canvas.height) {
			junk.splice(i,1);
			console.log("spliced junk"+ junk);
		}
	}
};

// remove blaster and junk if their x/y values line up
// was missing upper limit on blaster y value! 
var goodAim = function(){
	var remove = false;
	for (var f = 0; f < junk.length; f++) {
		for (var i = 0; i < blasters.length; i++) {
		
			if (blasters[i][1] >= (junk[f][1]) &&  
				((blasters[i][1]) + blasterRadius) <= (junk[f][1] + junk[f][3]) && 
				(blasters[i][0] >= junk[f][0]) && 
				(blasters[i][0] <= (junk[f][0] + junk[f][2]))){
				// if (blasterY <= junkY + junkHeight) && (blasterX >= junkX) && (blasterX <= junkX + junkWidth)
				// if (blaster is lower than or touching junk's leading edge) && (blasterX left border is equal or right of JunkX's left border...) && (...blasterX left border is to the left of JunkX's right border)

				// blaster and junk arrays for reference:
				// blasters.push([shipX +25, shipY -50, blasterRadius, 0, Math.PI*2]);
				// junk.push([shipX, junkY, junkWidth, junkHeight]);

				remove = true;
				blasters.splice(f,1);
				counter ++;
				console.log("goodAim: counter = " + counter);
			}
			if (remove === true) {
				junk.splice(i,1);
				remove = false;
			}
		}
	}
};

// if hit by junk - x/y values line up, game over
var starFoxDown = function(){
	for (var i = 0; i < junk.length; i++) {
			if ((junk[i][1] + junkHeight >= 597) && ((junk[i][0] >= shipX) && (junk[i][0] <= shipX + shipWidth))){
			 // is higher than or touching ships y plus height) && (junk's x is greater than ships x) && (junks x + width is less than ships x + width) {}	
			console.log("Star Fox is down!");
			turnOver = true;
		}
	}
};

// on window load, or depending on values of score vars, tells user whose turn, what the score is, and who won.
var fireModal = function(){
	if (beginGame) {
		stopLoopInterval();
		stopJunkInterval();
		sModal.style.display = "inline-block";
		message.innerHTML = "Welcome. <br>Try to blast away all the space junk.<br><br> Move L/R with arrows.<br><br>Fire blaster with space bar (because we're in space).<br><br>First to ten wins, don't get hit by the space junk :/";
		sButton.innerHTML = "Initiate<br>Player 1<br>Launch Sequence";
	}
	else if (playerOneTurn && ((counter === 10) || (turnOver === true))) {
		stopLoopInterval();
		stopJunkInterval();
		score1 = counter;
		sModal.style.display = "inline-block";
		message.innerHTML = "Player 1 score: " + score1;
		sButton.innerHTML = "Initiate<br>Player 2<br>Launch Sequence";
		blasters = [];
		junk = [];
	}
	else if (playerTwoTurn && (counter === 10 || turnOver === true)) {
		stopLoopInterval();
		stopJunkInterval();
		score2 = counter;
		sModal.style.display = "inline-block";
			if (score1 > score2) {
				message.innerHTML = "The force is strong with you, young Padawan.<br><br>Player 1 wins!<br><br>Player 1 score: " + score1 + "<br>Player 2 score: " + score2;
			}
			else if (score2 > score1) {
				message.innerHTML = "The force is strong with you, young Padawan.<br><br>Player 2 wins!<br><br>Player 1 score: " + score1 + "<br>Player 2 score: " + score2;
			}
			else if (score1 === score2) {
				message.innerHTML = "I guess you both are pretty good at blasting space junk.<br><br>Player 1 score: " + score1 + "<br>Player 2 score: " + score2;
			}
		sButton.innerHTML = "Play again?";
		blasters = [];
		junk = [];
	}	
};

// click listener on span in the modal. on click resets score vars and initiates game and junk loops.
document.getElementById("startButton").addEventListener("click", function() {
	if (beginGame) {
		sModal.style.display = "none";
		beginGame = false;
		playerOneTurn = true;
		playerTwoTurn = false;
		counter = 0;
		score1 = counter;
		setLoopInterval = setInterval(infiniteSpaceLoop, 10);
		setJunkInterval = setInterval(makeJunk, 500);
	}
	else if (playerOneTurn) {
		sModal.style.display = "none";
		beginGame = false;
		playerOneTurn = false;
		playerTwoTurn = true;
		turnOver = false;
		counter = 0;
		score2 = counter;
		setLoopInterval = setInterval(infiniteSpaceLoop, 10);
		setJunkInterval = setInterval(makeJunk, 500);
	}
	else if (playerTwoTurn) {
		sModal.style.display = "none";
		beginGame = true;
		playerOneTurn = false;
		playerTwoTurn = false;
		turnOver = false;
		score1 = 0;
		score2 = 0;
		counter = 0;
		setLoopInterval = setInterval(infiniteSpaceLoop, 10);
		setJunkInterval = setInterval(makeJunk, 500);	
	}
});

// erases every thing in the 'verse every interval
var clearGalaxy =function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// the game loop - calls all functions every interval (10 milliseconds)
var infiniteSpaceLoop = function(){
	clearGalaxy();
	drawShip();
	drawBlaster();
	moveBlaster();
	drawJunk();
	moveJunk();
	bounceJunk();
	goodAim();
	spliceJunk();
	starFoxDown();
	fireModal();
};

// calls the modal function
var initiateGame = function(){
	fireModal();
};

// calls initiateGame function on window load
window.onload = initiateGame;


