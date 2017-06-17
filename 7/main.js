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
var oneP = Math.PI/4;

function draw(x, y, radius, startAng, endAng) {
    c.beginPath();
    c.strokeStyle = "white";
    c.arc(x, y, radius, startAng, endAng);
    c.stroke();
}

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


    // var stopToUse = (start/(loop)*Math.PI)%Math.PI*2;
    // var startToUse = (stop/(loop)*Math.PI)%Math.PI*2;
    draw(cw/2, ch/2, 50, startToUse/loop, stopToUse/loop);
    if (!inverted) {
        start = start +  baseSpeed;
        stop  = stop  +  baseSpeed * speedMultiplier;
    } else {
        start  = start  +  baseSpeed * speedMultiplier;
        stop = stop +  baseSpeed;
    }
    console.log(`${startToUse}   ${stopToUse}`)
}
animate();
