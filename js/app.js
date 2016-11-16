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
	else if (event.keyCode == 32) {
		spacePressed = true;
	}
});

var drawBlaster = function() {
	ctx.beginPath();
	ctx.arc(shipX, y, blasterRadius, 0, Math.PI*2);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
};

var drawShip = function() {
	ctx.beginPath();
	ctx.rect(shipX, canvas.height-(shipHeight*2), shipWidth, shipHeight);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
};

var draw = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawShip();
	if (rightPressed && shipX < canvas.width-shipWidth) {
		shipX += 3;
	}
	else if (leftPressed && shipX > 0) {
		shipX -= 3;
	}
	// if (spacePressed) {
	// 	drawBlaster();
	// }
};

var fireBlaster = function(){
	if (spacePressed) {
		drawBlaster();
		y += dy;
		console.log("fireBlaster");
		console.log(y);
	}
};


window.setInterval(function(){
	draw();
	fireBlaster();
	}, 10);


