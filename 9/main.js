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

canvas.addEventListener("touchstart", onTouchStart, false);

function onTouchStart(e) {
    c.fillRect(0,0,300,300);
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
