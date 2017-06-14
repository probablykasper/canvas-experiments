window.onload = draw;

function draw() {
	// Assign canvas el to var
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	var ch = c.clientHeight;
	var cw = c.clientWidth;

	// fillStyle(r,g,b,alpha)
	// fillRect(x,y,w,h)

	ctx.fillStyle = "rgba(0, 200, 164, 1)";
	var gap = 2;
	ctx.fillRect(cw/2-25-gap, ch/2-25-gap, 50, 50);

	ctx.fillStyle = "rgba(0, 134, 200, 1)";
	ctx.fillRect(cw/2-25+gap, ch/2-25+gap, 50, 50);
}
