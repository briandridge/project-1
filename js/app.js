console.log("linked");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -4
var blasterRadius = 10;
var shipWidth = 50;
var shipHeight = 50;

var shipX = (canvas.width-shipWidth)/2

var rightPressed = false;
var leftPressed = false;

// no paddle boucing, so need an origin... when key listener or click call function???
var drawBlaster = function() {
	ctx.beginPath();
	ctx.arc(x, y, blasterRadius, 0, Math.PI*2);
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
	drawBlaster();
	drawShip();
	y += dy;
};

setInterval(draw, 10);