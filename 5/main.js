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

var circlesAmount = window.innerWidth*window.innerHeight/100000;
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
	this.update = function(currentCircleIndex) {

		// this.left = this.x - this.radius;
		// this.right = this.x + this.radius;
		// this.top = this.y - this.radius;
		// this.bottom = this.y + this.radius;

		for (var i = 0; i < circles.length; i++) {

            if (i != currentCircleIndex) {
                var distancex = circles[i].x - this.x;
                var distancey = circles[i].y - this.y;
                var distanceBetweenCircles = Math.sqrt( distancex*distancex + distancey*distancey );
                // console.log(distancex + "   " + circles[i].x + "   " + this.x + "   " + i);
                // cat^2 + cat^2 = hyp^2

                var distance = this.radius + circles[i].radius;
                var directionx = (circles[i].x - this.x) / distance;
                var directiony = (circles[i].y - this.y) / distance;
                var intersectionx = this.x + directionx * this.radius;
                var intersectiony = this.y + directiony * this.radius;

                if (distanceBetweenCircles < 0) distanceBetweenCircles = -distanceBetweenCircles;
                if (distanceBetweenCircles < distance) {
                    this.dx = -directionx+(this.dx+this.dy)/2;
                    this.dy = -directiony+(this.dx+this.dy)/2;
                }
            }

            // var intersx = this.x + (circles[i].x - this.x) / (this.radius + circles[i].radius) * this.radius;
            //            // c1     + (c2           - c1    ) / (r1          + r2               ) * r1
            //
            // c1 + (c2-c1)/(r1+r2) * r1
            //
            // dist = r1+r2;
            // dir = (c2-c1) / dist;
            // inters = c1 + dir * r1
            //
            // if (
            // 	circles[i].left <= this.right && this.left <= circles[i].right &&
            // 	circles[i].top <= this.bottom && this.top <= circles[i].bottom &&
            // 	i != currentCircleIndex
            // ) {
            // 	this.dx = -this.dx;
            // 	this.dy = -this.dy;
            // }

		}

		// bounce on edges
		if (this.x >= canvas.width-this.radius) this.dx = -(Math.random()+1)*3;
		if (this.x <= this.radius) this.dx = (Math.random()+1)*3;
		if (this.y >= canvas.height-this.radius) this.dy = -(Math.random()+1)*3;
		if (this.y <= this.radius) this.dy = (Math.random()+1)*3;

		// this.dx = 0;
		// this.dy = 0;

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	}
}

var circles = [];
for (var i = 0; i < circlesAmount; i++) {
	var radius = (Math.random()+0.25)*50;
	var x = Math.random()*(canvas.width-radius*2)+radius;
	var y = Math.random()*(canvas.height-radius*2)+radius;
	var dx = (Math.random()+1)*3;
	var dy = (Math.random()+1)*3;
	if (Math.random() < 0.5) dx = -dx;
	if (Math.random() < 0.5) dy = -dy;
	var color = this.fillStyle = colors[Math.floor(Math.random()*colors.length)]
	circles.push(new Circle(x, y, dx, dy, radius, color));
	circles[i].draw();
}

function animate() {
	requestAnimationFrame(animate); // initiate animation
	c.clearRect(0, 0, innerWidth, innerHeight); // clear canvas

	for (var i = 0; i < circles.length; i++) {
		circles[i].update(i);
	}
}
animate();
