"use strict";
// init canvas
var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

var cw, ch;
function resize() {
    var cw = window.innerWidth-50;
    var ch = window.innerHeight-50;
    // if cw is odd, make aspect ratio correct (2:1)
    if (cw%2 == 1) cw--;

    // set canvas w/h
    if (ch < cw/2) {
        canvas.width = ch*2;
        canvas.height = ch;
    } else {
        canvas.width = cw;
        canvas.height = cw/2;
    }
}

// update canvas size
resize();
// window.addEventListener("resize", function() {
//     resize();
// });

var mousedown, mx, my, oldmx, oldmy, leftMargin, topMargin;
window.addEventListener("mousedown",  function() {
    mousedown = true;
    startDraw();
    c.arc(mx, my, 0.5, Math.PI*2, 0);
    c.stroke();
});
window.addEventListener("mouseup",    function() {
    mousedown = false;
    c.closePath();
});

window.addEventListener("mousemove", function(e) {
    oldmx = mx;
    oldmy = my;
    leftMargin = (window.innerWidth - canvas.width)/2;
    topMargin = (window.innerHeight - canvas.height)/2;
    mx = window.event.clientX - leftMargin;
    my = window.event.clientY - topMargin;
    if (mousedown) draw();
});

function startDraw() {
    c.lineWidth = 1;
    c.strokeStyle = "#ffffff";
    c.beginPath();
    c.moveTo(mx, my);
}

function draw() {
    c.lineTo(mx, my);
    c.stroke();
}

function old() {
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
        if (lineWidth > thatRadius) increment = false;
        if (lineWidth == 0) increment = true;
        if (increment) lineWidth++;
        if (!increment) lineWidth--;
    }, 52.25)

    var start = 0, stop = 0, baseSpeed = 10, speedMultiplier = 2, thatRadius;
    var shapes = [], slice = Math.PI/4, inverted = false, incr = 2, loop = baseSpeed*50; // incrementor
    function animate() {
        requestAnimationFrame(animate); // init animation
        // c.clearRect(0, 0, innerWidth, innerHeight);

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

        if (window.innerWidth < window.innerHeight) {
            var radius = window.innerWidth/15;
            thatRadius = window.innerWidth/15;
        } else {
            var radius = window.innerHeight/15;
            thatRadius = window.innerHeight/15;
        }

        if (!inverted) {
            start = start +  baseSpeed;
            stop  = stop  +  baseSpeed * speedMultiplier;
        } else {
            start  = start  +  baseSpeed * speedMultiplier;
            stop = stop +  baseSpeed;
        }
    }
    animate();
}
