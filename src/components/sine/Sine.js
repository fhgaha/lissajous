import React, { useEffect } from 'react'

// x = Asin(a * fi + theta)
// y = Bsin(b * theta)

function calcY(x, h, f, w) {
  // h is the amplitude of the wave
  // x is the current x value we get every time interval
  // 2 * PI is the length of one cycle (full circumference)
  // f/w is the frequency fraction
  return h - h * Math.sin(x * 2 * Math.PI * (f / w));
}

function drawSine(x, h, f, w, ctx) {
  if (ctx == null) return;

  ctx.clearRect(0, 0, w, h * 2);

  ctx.beginPath(); // Draw a new path
  ctx.strokeStyle = "white"; // Pick a color
  for (var i = 0; i < x; i++) { // Loop from left side to current x
    var y = calcY(i, h, f, w); // Calculate y value from x
    ctx.lineTo(i, y); // Where to draw to
  }
  ctx.stroke(); // Draw
}

const MySine = () => {
	useEffect(() => {
		var x = 0;
		var c = document.getElementById("canvas"); // Grab canvas object
		var ctx = c.getContext("2d"); // Define canvas context
		var w = c.width; // Canvas width => Frequency is relative to this
		var h = c.height / 2; // Canvas height over two => Amplitude: Volume
		var f = 1; // How many cycles per canvas width => Frequency: Tone & Speed

		setInterval(() => {
			drawSine(x, h, f, w, ctx); // Call draww function every cycle
			x++; // Increment x by 1
			if (x > w) {
				x = 0; // x cannot be more than canvas with, so back to 0
				// f++; // increment frequency for demonstration
			}
		}, 1);
	}, []);

	return (
		<canvas
			id="canvas"
			width="320"
			height="120"
			style={{ border: '1px solid #999' }}
		></canvas>
	)
}

export default MySine