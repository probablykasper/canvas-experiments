// window.onload = draw;
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth-20;
canvas.height = window.innerHeight-20;
var c = canvas.getContext("2d");

// c.fillRect(x, y, w, h);
c.fillStyle = "#00C8A4";
c.fillRect(100, 100, 100, 100);

c.fillStyle = "#0086C8";
c.fillRect(200, 200, 100, 100);
c.fillStyle = "#C8005A";
c.fillRect(300, 300, 100, 100);

c.beginPath();
// c.moveTo(x,y);
c.moveTo(200, 100);
c.lineTo(400, 300);
c.strokeStyle = "#000000";
c.stroke();
c.fillRect(200, 100, 100, -100);
c.fillRect(300, 200, 100, -100);
c.fillRect(400, 300, 100, -100);

c.beginPath();
// c.arc(x, y, radius, startAngle, endAngle, drawCounterClockwise?)
c.strokeStyle = "#00C8A4";
// c.arc(250, 150, 50, 0, Math.PI*2, false);
c.stroke();

for (var i = 0; i < 10; i++) {
	var x = Math.random() * canvas.width;
	var y = Math.random() * canvas.height;
	switch ( Math.ceil( Math.random()*3 ) ) {
		case 1:
		c.strokeStyle = "#00C8A4";
		break;
		case 2:
		c.strokeStyle = "#dddddd";
		break;
		case 3:
		c.strokeStyle = "#000000";
		break;
	}
	c.lineWidth = 2;
	console.log(i);
	c.beginPath();
	c.arc(x, y, 50, 0, Math.PI*2, false);
	c.stroke();
}
