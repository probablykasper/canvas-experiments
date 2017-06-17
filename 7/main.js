"use strict";
// init canvas
var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

// update canvas size
cw = window.innerWidth;
ch = window.innerHeight;
canvas.width = cw;
canvas.height = ch;
var cw, ch;
window.addEventListener("resize", function() {
    cw = window.innerWidth;
    ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;
});

// c.arc(x, y, radius, startAngle, endAngle, [antiClockwise]);
function draw(x, y, radius, startAng, endAng, liiineWidth, color, clockWise, fill = false) {
    c.beginPath();
    c.lineWidth = liiineWidth;
    c.strokeStyle = color;
    c.fillStyle = color;
    if (clockWise) {
        c.arc(x, y, radius, Math.PI*2-endAng, Math.PI*2-startAng);
    } else {
        c.arc(x, y, radius, startAng, endAng);
    }
    if (fill) {
        c.fill();
    } else {
        c.stroke();
    }
}

var lineWidth = 0, increment = true;
setInterval(function() {
    if (lineWidth == 101) increment = false;
    if (lineWidth == 0) increment = true;
    if (increment) lineWidth++;
    if (!increment) lineWidth--;
}, 52.25)

var start = 0, stop = 0, baseSpeed = 10, speedMultiplier = 2;
var shapes = [], slice = Math.PI/4, inverted = false, incr = 2, loop = baseSpeed*50; // incrementor
function animate() {
    requestAnimationFrame(animate); // init animation
    c.clearRect(0, 0, innerWidth, innerHeight);

    var startToUse = start;
    var stopToUse = stop;

    if (startToUse/loop == 6.28 && stopToUse/loop == 12.56) {
        start = 0;
        stop = 0;
        inverted = true;
    }
    if (startToUse/loop == 12.56 && stopToUse/loop == 6.28) {
        start = 0;
        stop = 0;
        inverted = false;
    }

    draw(cw/4*1, ch/2, 50, startToUse/loop, stopToUse/loop, 2, "#236568", true);
    draw(cw/4*2, ch/2, 50, startToUse/loop, stopToUse/loop, lineWidth, "#3E3277", false);
    draw(cw/4*3, ch/2, 50, startToUse/loop, stopToUse/loop, 1, "#7D2A6B", true, true);
    if (!inverted) {
        start = start +  baseSpeed;
        stop  = stop  +  baseSpeed * speedMultiplier;
    } else {
        start  = start  +  baseSpeed * speedMultiplier;
        stop = stop +  baseSpeed;
    }
}
animate();
