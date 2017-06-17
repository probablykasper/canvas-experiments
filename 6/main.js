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
var circleAmount = 2;
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

    console.log(nc[ci]);
    console.log("1 ^");

    for (var cpi = 0; cpi < circles.length; cpi++) { // comparisonIndex
        if (cpi != ci) { // avoid comparing to itself
            console.log(nc[ci]);
            console.log("2 ^");
            var xDist = circles[cpi].x - circles[ci].x; // difference of c1x & c2x
            var yDist = circles[cpi].y - circles[ci].y; // difference of c1y & c2y
            var distBetweenCircles = Math.sqrt( xDist*xDist + yDist*yDist ); // distance from c1 to c2
            if (distBetweenCircles < 0) distBetweenCircles = -distBetweenCircles;
            var radii = circles[cpi].radius + circles[ci].radius; // the radii combined

            if (distBetweenCircles < radii) { // if the circles are overlapping
                // cpi intersection
                console.log(nc[ci]);
                console.log("3 ^");

                var xDir1 = (circles[ci].x - circles[cpi].x) / radii;
                    console.log(`var xDir1 = (${circles[ci].x} - ${circles[cpi].x}) / ${radii};`);
                var yDir1 = (circles[ci].y - circles[cpi].y) / radii;
                var xInters1 = circles[ci].x + xDir1 * circles[ci].radius;
                if (xInters1 < 0) xInters1 = -xInters1;
                    console.log(`var xInters1 = ${circles[ci].x} + ${xDir1} * ${circles[ci].radius}; (+ make positive)`);
                var yInters1 = circles[ci].y + yDir1 * circles[ci].radius;
                if (yInters1 < 0) yInters1 = -yInters1;
                // ci intersection
                var xDir2 = (circles[cpi].x - circles[ci].x) / radii;
                    console.log(`var xDir2 = (${circles[cpi].x} - ${circles[ci].x}) / ${radii};`);
                var yDir2 = (circles[cpi].y - circles[ci].y) / radii;
                var xInters2 = circles[cpi].x + xDir2 * circles[cpi].radius;
                if (xInters2 < 0) xInters2 = -xInters2;
                    console.log(`var xInters2 = ${circles[cpi].x} + ${xDir2} * ${circles[cpi].radius}; (+ make positive)`);
                var yInters2 = circles[cpi].y + yDir2 * circles[cpi].radius;
                if (yInters2 < 0) yInters2 = -yInters2;

                var xInters = (xInters2 + xInters1) / 2;
                    console.log(`var xInters = (${xInters2} + ${xInters1});`);
                var yInters = (yInters2 + yInters1) / 2;

                console.log(`xi1: ${xInters1}   xi2: ${xInters2}   xi: ${xInters}`)

                nc[ci].x = xInters + (circles[ci].x - xInters);
                    console.log(`nc[ci].x = ${xInters} + (${circles[ci].x} - ${xInters});`)
                nc[ci].y = yInters + (circles[ci].y - yInters);

                var xNormal = (xInters - circles[cpi].x) / circles[cpi].radius;
                var yNormal = (yInters - circles[cpi].y) / circles[cpi].radius;
                var xNewDir = circles[ci].dx - 2 * (  circles[ci].dx * xNormal + circles[ci].dy * yNormal  ) * xNormal;
                var yNewDir = circles[ci].dy - 2 * (  circles[ci].dx * xNormal + circles[ci].dy * yNormal  ) * yNormal;

                nc[ci].dx = xNewDir;
                nc[ci].dy = yNewDir;

                console.log(nc[ci]);
                console.log("4 ^");
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
    console.log(nc[ci]);
    console.log("5 ^");
}
function animate() {
    requestAnimationFrame(animate); // init animation
    c.clearRect(0, 0, innerWidth, innerHeight); // clear canvas

    nc = JSON.parse(JSON.stringify(circles));
    for (var i = 0; i < circles.length; i++) { // update every circle
        update(i);
    }
    circles = JSON.parse(JSON.stringify(nc));
}
animate();
