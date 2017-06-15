// window.onload = draw;
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth-20;
canvas.height = window.innerHeight-20;
var c = canvas.getContext("2d");

var radius = 50;
// random start position in canvas
var x = Math.random()*(canvas.width-radius*2)+radius;
var y = Math.random()*(canvas.height-radius*2)+radius;
// start position incrementor
dx = (Math.random()+1)*3;
dy = (Math.random()+1)*3;
// maybe make position negative
if (dx > 4.5) dx = -dx;
if (dy > 4.5) dy = -dy;

function animate() {
	requestAnimationFrame(animate); // initiate animation
	c.clearRect(0, 0, innerWidth, innerHeight); // clear canvas

	// draw circle
	c.beginPath();
	c.strokeStyle = "#00C8A4";
	c.lineWidth = 2
	c.arc(x, y, radius, 0, Math.PI*2, false); //draw the actual circle
	c.stroke();

	// bounce on edges
	if (x >= canvas.width-50) dx = -(Math.random()+1)*3;
	if (x <= radius) dx = (Math.random()+1)*3;
	if (y >= canvas.height-50) dy = -(Math.random()+1)*3;
	if (y <= radius) dy = (Math.random()+1)*3;

	// increment x/y positions
	x += dx;
	y += dy;
}
animate();
