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

    for (var cpi = 0; cpi < circles.length; cpi++) { // comparisonIndex
        if (cpi != ci) { // avoid comparing to itself
            var xDist = circles[cpi].x - circles[ci].x; // difference of c1x & c2x
            var yDist = circles[cpi].y - circles[ci].y; // difference of c1y & c2y
            var distBetweenCircles = Math.sqrt( xDist*xDist + yDist*yDist ); // distance from c1 to c2
            if (distBetweenCircles < 0) distBetweenCircles = -distBetweenCircles;
            var radii = circles[cpi].radius + circles[ci].radius; // the radii combined

            if (distBetweenCircles < radii) { // if the circles are overlapping
                var xDir = (circles[cpi].x - circles[ci].x) / radii;
                var yDir = (circles[cpi].y - circles[ci].y) / radii;
                var xInters = circles[ci].x + xDir * circles[ci].radius;
                var yInters = circles[ci].y + yDir * circles[ci].radius;
                var xNormal = (xInters - circles[ci].x) / circles[ci].radius;
                var yNormal = (yInters - circles[ci].y) / circles[ci].radius;
                var xNewDir = xDir - 2 * (  xDir * xNormal + yDir * yNormal  ) * xNormal;
                var yNewDir = yDir - 2 * (  xDir * xNormal + yDir * yNormal  ) * yNormal;

                nc[ci].dx = xNewDir;
                nc[ci].dy = yNewDir;
            }
        }
    }

    // when they hit the walls
    if (nc[ci].x+nc[ci].radius < 0            ) nc[ci].x = canvas.width  + nc[ci].radius; // left
    if (nc[ci].x-nc[ci].radius > canvas.width ) nc[ci].x = 0             - nc[ci].radius; // right
    if (nc[ci].y+nc[ci].radius < 0            ) nc[ci].y = canvas.height + nc[ci].radius; // top
    if (nc[ci].y-nc[ci].radius > canvas.height) nc[ci].y = 0             - nc[ci].radius; // bottom

    nc[ci].x += nc[ci].dx; // increment x position
    nc[ci].y += nc[ci].dy; // increment y position

    draw(nc[ci].radius, nc[ci].x, nc[ci].y, nc[ci].color); // finally draw the circle
}
function animate() {
    requestAnimationFrame(animate); // init animation
    c.clearRect(0, 0, innerWidth, innerHeight); // clear canvas

    nc = circles;
    for (var i = 0; i < circles.length; i++) { // update every circle
        update(i);
    }
    circles = nc;
}
animate();
