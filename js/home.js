var c = document.getElementById("canvas");
var ch = c.clientHeight;
var cw = c.clientWidth;
var pi = Math.PI;
var ctx = c.getContext("2d");

// Line
ctx.moveTo(0,0);
ctx.lineTo(cw,ch);
ctx.stroke();

// Circliboi
ctx.beginPath();
// arc(anchor X, anchor Y, radius, line start point, line end point)
ctx.arc(cw/2, ch/2, ch/2, pi, 2*pi);
ctx.stroke();
