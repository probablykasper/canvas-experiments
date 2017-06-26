"use strict";
// init canvas
var canvas = document.querySelector("canvas");
var section = document.querySelector("section");
var icons = document.querySelector("div.icons");
var clear = document.querySelector("div.clear");
var done = document.querySelector("div.done");
var imgDiv = document.querySelector("div.img");
var imgDOM = document.querySelector("img");
var c = canvas.getContext("2d");

var cw, ch;
function resize() {
    cw = window.innerWidth;
    ch = window.innerHeight;
    // if cw is odd, make aspect ratio correct (2:1)
    if (cw%2 == 1) cw--;

    // set canvas w/h
    if (ch < cw/2+29) {
        ch -= 58;
        section.style.width = ch*2+"px";
        section.style.height = ch+"px";
        canvas.width = ch*2;
        canvas.height = ch;
        section.style.left = "calc(50% - 29px)";
        section.style.display = "flex";
        icons.style.flexDirection = "column";
        icons.style.marginRight = "0px";
    } else {
        cw -= 58;
        section.style.width = cw+"px";
        section.style.height = cw/2+"px";
        canvas.width = cw;
        canvas.height = cw/2;
        section.style.top = "calc(50% - 29px)";
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

// on click
canvas.addEventListener("click", function(e) {
    pos = getTouchPos(e);

})



function startDraw() {
    drawing = true;
    c.lineWidth = 1;
    c.strokeStyle = "#ffffff";
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

clear.addEventListener("click", function() {
    c.clearRect(0, 0, cw, ch);
});
done.addEventListener("click", function() {
    var img = canvas.toDataURL("image/png");
    imgDiv.style.backgroundColor = "rgba(0, 0, 0, 1)";
    imgDiv.style.pointerEvents = "all";
    imgDOM.src = img;
    console.log(img);
});
