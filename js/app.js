var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// var x = canvas.width/2;
// var y = canvas.height-30;
// var dx = 2;
// var dy = -4;

var blasterRadius = 10;

var shipWidth = 50;
var shipHeight = 50;
var shipX = (canvas.width-shipWidth)/2;
var shipY = canvas.height-30;

var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

var blasterTotal = 4;
var blasters = [];

var asteroidWidth = 75;
var asteroidHeight = 75;

var junkY = 30;
var junkWidth = 25;
var junkHeight = 25;
var junkTotal = 10;
var junk = [];

// listens for r/l arrow keys, changes state to true, right/leftPressed variables used in drawShip function
// use keydown so can hold down to hold down to repeat
document.addEventListener("keydown", function(event){
	if (event.keyCode == 39) {
		rightPressed = true;
	}	
	else if (event.keyCode == 37) {
		leftPressed = true;
	}
	else if (event.keyCode == 32 && blasters.length <= blasterTotal || junk.length <= junkTotal) {
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
	// // else if (event.keyCode == 32 && junk.length <= junkTotal) {
	// // 	// spacePressed = false;
	// // 	junk.push([shipX, junkY, junkWidth, junkHeight]);
	// // 	console.log('hello' + junk);
	// }
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
		if (blasters[i][1]>0) {
			blasters[i][1] += -4;
		}
		else if (blasters[i][1]<0) {
			blasters.splice(i,1);
		}
	}

};

// var drawAsteroid = function(){
// 	ctx.beginPath();
// 	ctx.rect((canvas.width-asteroidWidth)/2, 50, asteroidWidth, asteroidHeight);
// 	ctx.fillStyle = "white";
// 	ctx.fill();
// 	ctx.closePath();

// };



// var generateJunk = function(){
// 	setInterval(drawJunk, 3000);
// };

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

var moveJunk = function(){
	for (var i = 0; i < junk.length; i++) {
		if (junk[i][1]>0) {
			junk[i][1] -= -2;
		}
		else if (junk[i][1]<canvas.height) {
			junk.splice(i,1);
		}
	}
};

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
	// generateJunk();
	drawJunk();
	moveJunk();
	// drawAsteroid();
};

// sets an interval for the game loop function so it calls every 10 milliseconds
var initiateGame = function(){
	setInterval(infiniteSpaceLoop, 10);
};

// prime mover - calls initiateGame function on window load
window.onload = initiateGame;


