// window.onload = draw;
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

window.addEventListener("resize", function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});
var mouse = {
	x: undefined,
	y: undefined
};
window.addEventListener("mousemove", function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

var circlesAmount = 20;
colors = [
	"#070F4E",
	"#2772DB",
	"#3AB1C8",
	"#F5EBEB"
];

function Circle(x, y, dx, dy, radius, color) {
	this.radius = radius;
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.color = color;

	this.draw = function() {
		// draw circle
		c.beginPath();
		c.fillStyle = this.color;
		c.lineWidth = 2
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false); //draw the actual circle
		c.fill();
	}

	this.update = function() {

		// bounce on edges
		if (this.x >= canvas.width-this.radius) this.dx = -(Math.random()+1)*3;
		if (this.x <= this.radius) this.dx = (Math.random()+1)*3;
		if (this.y >= canvas.height-this.radius) this.dy = -(Math.random()+1)*3;
		if (this.y <= this.radius) this.dy = (Math.random()+1)*3;

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	}
}

var circles = [];
for (var i = 0; i < circlesAmount; i++) {
	var x = Math.random()*(canvas.width-radius*2)+radius;
	var y = Math.random()*(canvas.height-radius*2)+radius;
	var dx = (Math.random()+1)*3;
	var dy = (Math.random()+1)*3;
	if (Math.random() < 0.5) dx = -dx;
	if (Math.random() < 0.5) dy = -dy;
	var radius = (Math.random()+0.25)*50;
	var color = this.fillStyle = colors[Math.floor(Math.random()*colors.length)]
	circles[i] = new Circle(x, y, dx, dy, radius, color);
	circles[i].draw();
}

function animate() {
	requestAnimationFrame(animate); // initiate animation
	c.clearRect(0, 0, innerWidth, innerHeight); // clear canvas

	for (var i = 0; i < circles.length; i++) {
		circles[i].update();
	}
}
animate();
