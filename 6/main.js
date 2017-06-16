// function Circle(x, y, dx, dy, radius, color) {
// 	this.radius = radius;
// 	this.x = x;
// 	this.y = y;
// 	this.dx = dx;
// 	this.dy = dy;
// 	this.color = color;
//
// 	this.draw = function() {
// 		// draw circle
// 		c.beginPath();
// 		c.fillStyle = this.color;
// 		c.lineWidth = 2;
// 		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false); //draw the actual circle
// 		c.fill();
// 	}
// 	this.update = function(currentCircleIndex) {
//
// 		for (var i = 0; i < newCircles.length; i++) {
//
//             if (i != currentCircleIndex) {
//                 var distancex = newCircles[i].x - this.x;
//                 var distancey = newCircles[i].y - this.y;
//                 var distanceBetweenCircles = Math.sqrt( distancex*distancex + distancey*distancey );
//                 // console.log(distancex + "   " + newCircles[i].x + "   " + this.x + "   " + i);
//                 // cat^2 + cat^2 = hyp^2
//
//                 var distance = this.radius + newCircles[i].radius;
//                 var directionx = (newCircles[i].x - this.x) / distance;
//                 var directiony = (newCircles[i].y - this.y) / distance;
//                 var intersectionx = this.x + directionx * this.radius;
//                 var intersectiony = this.y + directiony * this.radius;
//
//                 // dir - 2 * dot(dir, normal) * normal
//
//                 if (distanceBetweenCircles < 0) distanceBetweenCircles = -distanceBetweenCircles;
//                 if (distanceBetweenCircles < distance) {
//
//                     var normalx = (intersectionx - this.x) / this.radius;
//                     var normaly = (intersectiony - this.y) / this.radius;
//                     var newDirx = directionx - 2 * (  directionx * normalx + directiony * normaly  ) * normalx;
//                     var newDiry = directiony - 2 * (  directionx * normalx + directiony * normaly  ) * normaly;
//
//                     this.dx = newDirx;
//                     this.dy = newDiry;
//
//                     // this.dx = -directionx+(this.dx+this.dy)/2;
//                     // this.dy = -directiony+(this.dx+this.dy)/2;
//                 }
//             }
//
// 		}
//
// 		// bounce on edges
// 		if (this.x >= canvas.width-this.radius) this.dx = -this.dx;
// 		if (this.x <= this.radius) this.dx = -this.dx;
// 		if (this.y >= canvas.height-this.radius) this.dy = -this.dy;
// 		if (this.y <= this.radius) this.dy = -this.dy;
// 		// if (this.x >= canvas.width-this.radius) this.dx = -(Math.random()+1)*3;
// 		// if (this.x <= this.radius) this.dx = (Math.random()+1)*3;
// 		// if (this.y >= canvas.height-this.radius) this.dy = -(Math.random()+1)*3;
// 		// if (this.y <= this.radius) this.dy = (Math.random()+1)*3;
//
// 		// this.dx = 0;
// 		// this.dy = 0;
//
// 		this.x += this.dx;
// 		this.y += this.dy;
// 		this.draw();
// 	}
// }







// init canvas
var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

// update canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

// draw a circle
function draw(radius, x, y, color) {
    c.beginPath();
    c.fillStyle = color;
    c.arc(x, y, radius, 0, Math.PI*2, false); // draw the actual circle
    c.fill();
}

var circleAmount = window.innerWidth*window.innerHeight/100000;
colors = [
	"#070F4E",
	"#2772DB",
	"#3AB1C8",
	"#F5EBEB"
];
var circles = [], nc = []; // newCircles
for (var i = 0; i < circleAmount; i++) {
	var radius = (Math.random()+0.25)*50;
	var x = Math.random()*(canvas.width-radius*2)+radius;
	var y = Math.random()*(canvas.height-radius*2)+radius;
	var dx = (Math.random()+1)*3;
	var dy = (Math.random()+1)*3;
    var color = colors[Math.floor(Math.random()*colors.length)];
	if (Math.random() < 0.5) dx = -dx;
	if (Math.random() < 0.5) dy = -dy;
    circles[i] = {
        radius: radius,
        x: x,
        y: y,
        dx: dx,
        dy: dy,
        color: color
    };
    draw(radius, x, y, color);
}

function update(ci) { // circleIndex
    // var radius = circles[ci].radius;
	// var x = circles[ci].x;
	// var y = circles[ci].y;
	// var dx = circles[ci].dx;
	// var dy = circles[ci].dy;
    // var color = circles[ci].color;

    // 		for (var i = 0; i < newCircles.length; i++) {
    //
                // if (i != currentCircleIndex) {
                //     var distancex = newCircles[i].x - this.x;
                //     var distancey = newCircles[i].y - this.y;
                //     var distanceBetweenCircles = Math.sqrt( distancex*distancex + distancey*distancey );
                //     // console.log(distancex + "   " + newCircles[i].x + "   " + this.x + "   " + i);
                //     // cat^2 + cat^2 = hyp^2
                //
                //     var distance = this.radius + newCircles[i].radius;
                //     var directionx = (newCircles[i].x - this.x) / distance;
                //     var directiony = (newCircles[i].y - this.y) / distance;
                //     var intersectionx = this.x + directionx * this.radius;
                //     var intersectiony = this.y + directiony * this.radius;
                //
                //     // dir - 2 * dot(dir, normal) * normal
                //
                //     if (distanceBetweenCircles < 0) distanceBetweenCircles = -distanceBetweenCircles;
                //     if (distanceBetweenCircles < distance) {
                //
                //         var normalx = (intersectionx - this.x) / this.radius;
                //         var normaly = (intersectiony - this.y) / this.radius;
                //         var newDirx = directionx - 2 * (  directionx * normalx + directiony * normaly  ) * normalx;
                //         var newDiry = directiony - 2 * (  directionx * normalx + directiony * normaly  ) * normaly;
                //
                //         this.dx = newDirx;
                //         this.dy = newDiry;
                //
                //         // this.dx = -directionx+(this.dx+this.dy)/2;
                //         // this.dy = -directiony+(this.dx+this.dy)/2;
                //     }
                // }
    //
    // 		}

    for (var cpi = 0; cpi < circles.length; cpi++) { // comparisonIndex
        if (cpi != ci) {
            var xDist = circles[cpi].x - circles[ci].x;
            var yDist = circles[cpi].y - circles[ci].y;
            var distBetweenCircles = Math.sqrt( xDist*xDist + yDist*yDist );

            var radii = circles[cpi].radius + circles[ci].radius;
            var xDir = (circles[cpi].x - circles[ci].x) / radii;
            var yDir = (circles[cpi].y - circles[ci].y) / radii;
            var xInters = circles[ci].x + xDir * circles[ci].radius;
            var yInters = circles[ci].y + yDir * circles[ci].radius;

            if (distBetweenCircles < 0) distBetweenCircles = -distBetweenCircles;
            if (distBetweenCircles < radii) {
                var xNormal = (xInters - circles[ci].x) / circles[ci].radius;
                var yNormal = (yInters - circles[ci].y) / circles[ci].radius;
                var xNewDir = xDir - 2 * (  xDir * xNormal + yDir * yNormal  ) * xNormal;
                var yNewDir = yDir - 2 * (  xDir * xNormal + yDir * yNormal  ) * yNormal;

                nc[ci].dx = xNewDir;
                nc[ci].dy = yNewDir;
            }
        }
    }

    if (nc[ci].x+nc[ci].radius < 0            ) nc[ci].x = canvas.width  + nc[ci].radius; // left
    if (nc[ci].x-nc[ci].radius > canvas.width ) nc[ci].x = 0             - nc[ci].radius; // right
    if (nc[ci].y+nc[ci].radius < 0            ) nc[ci].y = canvas.height + nc[ci].radius; // top
    if (nc[ci].y-nc[ci].radius > canvas.height) nc[ci].y = 0             - nc[ci].radius; // bottom

    nc[ci].x += nc[ci].dx;
    nc[ci].y += nc[ci].dy;

    draw(nc[ci].radius, nc[ci].x, nc[ci].y, nc[ci].color);
}
function animate() {
    requestAnimationFrame(animate); // init animation
    c.clearRect(0, 0, innerWidth, innerHeight); // clear canvas

    nc = circles;
    for (var i = 0; i < circles.length; i++) {
        update(i);
    }
    circles = nc;
}
animate();

// var newCircles = [];
// for (var i = 0; i < circleAmount; i++) {
// 	newCircles.push(new Circle(x, y, dx, dy, radius, color));
// 	newCircles[i].draw();
// }
