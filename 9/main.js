"use strict";
// init canvas
var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

var cw, ch;
function resize() {
    cw = window.innerWidth-50;
    ch = window.innerHeight-50;
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
resize();

// get position of the touch/mouse relative to canvas
function getTouchPos(e) {
    return {
        x: e.touches[0].clientX - canvas.getBoundingClientRect().left,
        y: e.touches[0].clientY - canvas.getBoundingClientRect().top
    }
}
function getMousePos(e) {
    return {
        x: e.clientX - canvas.getBoundingClientRect().left,
        y: e.clientY - canvas.getBoundingClientRect().top
    }
}

var pos = {}, posLast = {}, drawing;
// on touch down
canvas.addEventListener("touchstart", function(e) {
    var touch = e.touches[0];
    pos = getTouchPos(e);
    startDraw();
}, false);
// on touch up
window.addEventListener("touchend", function (e) {
    endDraw();
}, false);
// on touch move
window.addEventListener("touchmove", function(e) {
    if (drawing) {
        posLast = pos;
        pos = getTouchPos(e);
        draw();
    }
}, false);

// on mouse down
canvas.addEventListener("mousedown", function(e) {
    pos = getMousePos(e);
    startDraw();
});
window.addEventListener("mouseup", function(e) {
    endDraw();
});
window.addEventListener("mousemove", function(e) {
    if (drawing) {
        posLast = pos;
        pos = getMousePos(e);
        draw();
    }
});


function startDraw() {
    console.log("start");
    c.lineWidth = 1;
    c.strokeStyle = "#ffffff";
    drawing = true;
}
function endDraw() {
    drawing = false;
}
function draw() {
    c.beginPath();
    c.moveTo(posLast.x, posLast.y);
    c.lineTo(pos.x, pos.y);
    c.stroke();
}




function old() {
    "use strict";
    // init canvas
    var canvas = document.querySelector("canvas");
    var c = canvas.getContext("2d");

    var cw, ch;
    function resize() {
        cw = window.innerWidth-50;
        ch = window.innerHeight-50;
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
    });
    window.addEventListener("mouseup",    function() {
        mousedown = false;
    });
    window.addEventListener("click", function() {
        leftMargin = (window.innerWidth - canvas.width)/2;
        topMargin = (window.innerHeight - canvas.height)/2;
        mx = window.event.clientX - leftMargin;
        my = window.event.clientY - topMargin;
        c.moveTo(mx, my);
        c.arc(mx, my, 0.5, Math.PI*2, 0);
        c.stroke();
    });

    window.addEventListener("mousemove", function(e) {
        if (mousedown) {
            oldmx = mx;
            oldmy = my;
            leftMargin = (window.innerWidth - canvas.width)/2;
            topMargin = (window.innerHeight - canvas.height)/2;
            mx = window.event.clientX - leftMargin;
            my = window.event.clientY - topMargin;
            // if mousedown and inside canvas
            draw();
        }
    });

    function startDraw() {
        c.beginPath();
        c.lineWidth = 1;
        c.strokeStyle = "#ffffff";
    }

    function draw() {
        c.lineTo(mx, my);
        c.stroke();
    }
}
