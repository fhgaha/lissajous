import React, { useEffect } from 'react'
import Line, { drawLine } from '../line/Line';

// x = Asin(a * fi + theta)
// y = Bsin(b * theta)

var a = 19;
var b = 18;

function calcY(t, h, f, w) {
	// h is the amplitude of the wave
	// x is the current x value we get every time interval
	// 2 * PI is the length of one cycle (full circumference)
	// f/w is the frequency fraction
	return h * (1 - Math.sin(b * t));
	// const result = h - h * Math.sin(t * 2 * Math.PI * (f / w));
}

function calcX(t, h, f, w) {
	let theta = 1;
	return w / 2 * (1 - Math.sin(a * t + (f / w)));
}

function drawSine(t, h, f, w, ctx) {
	if (ctx == null) return;

	ctx.clearRect(0, 0, w, h * 2);

	ctx.beginPath(); // Draw a new path
	ctx.strokeStyle = "white"; // Pick a color
	for (var i = 0; i < t; i += 0.01) { // Loop from left side to current x
		var x = calcX(i, h, f, w);
		var y = calcY(i, h, f, w); // Calculate y value from x
		ctx.lineTo(x, y); // Where to draw to

	}

	ctx.stroke(); // Draw
}

const Sine = (props) => {
	useEffect(() => {
		var t = 0;
		var c = document.getElementById("canvas"); // Grab canvas object
		var ctx = c.getContext("2d"); // Define canvas context
		var w = c.width; // Canvas width => Frequency is relative to this
		var h = c.height / 2; // Canvas height over two => Amplitude: Volume
		var f = 1; // How many cycles per canvas width => Frequency: Tone & Speed

		// setInterval(() => {
		// 	drawSine(t, h, f, w, ctx); // Call draww function every cycle
		// 	t++; // Increment x by 1
		// 	if (t > w) {
		// 		t = 0; // x cannot be more than canvas with, so back to 0
		// 		f++; // increment frequency for demonstration
		// 	}
		// }, 10);
		for (let i = 0; i < 2; i++) {
			drawSine(8, h, f, w, ctx);
			f += 0.1;
		}
	}, []);

	return (
		<>
			<canvas
				id="canvas"
				width="640"
				height="240"
				style={{ border: '1px solid #999' }}
				{...props}
			></canvas>
			<Line className='line glowy' from={{ x: 50, y: 100 }} to={{ x: 400, y: 500 }} />
		</>
	)
}

export default Sine