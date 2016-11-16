var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -4;
var blasterRadius = 10;
var shipWidth = 50;
var shipHeight = 50;
var shipX = (canvas.width-shipWidth)/2;
var shipY = canvas.height-30;
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;
var blasterTotal = 2;
var blasters = [];

document.addEventListener("keydown", function(event) {
	if (event.keyCode == 39) {
		rightPressed = true;
	}	
	else if (event.keyCode == 37) {
		leftPressed = true;
	}
});

document.addEventListener("keyup", function(event) {
	if (event.keyCode == 39) {
		rightPressed = false;
	}
	else if (event.keyCode == 37) {
		leftPressed = false;
	}
	else if (event.keyCode == 32 && blasters.length <= blasterTotal) {
		spacePressed = true;
		blasters.push([shipX, shipY, blasterRadius, 0, Math.PI*2]);
	}
});

var drawBlaster = function() {
	if (blasters.length)
	for (var i = 0; i < blasters.length; i++) {
		ctx.beginPath();
		// ctx.arc(x, y, blasterRadius, 0, Math.PI*2);
		ctx.arc(blasters[i][0],blasters[i][1],blasters[i][2],blasters[i][3], blasters[i][4]);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();
	}
	// console.log(blasters);
};

var drawShip = function() {
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

var clearGalaxy =function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

var initiateGame = function(){
	setInterval(infiniteSpaceLoop, 10);
};

var infiniteSpaceLoop = function() {
	clearGalaxy();
	drawShip();
	// moveShip();
	drawBlaster();
	// moveBlaster();

};

window.onload = initiateGame;


