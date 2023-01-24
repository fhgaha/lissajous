import React, { useEffect, useState } from 'react'

const padding = 20

const Path = () => {
	const [width, setWidth] = useState(800)
	const [height, setHeight] = useState(500)
	const [dCode, setDCode] = useState('')

	useEffect(() => {
		var f = 1; // How many cycles per canvas width => Frequency: Tone & Speed

		let result = getDCode(width - padding, height / 2 - padding)
		setDCode(result)
	}, [])

	return (
		<svg width={width} height={height} xmlns="http://www.w3.org/2000/svg"
			// style={{ border: '1px solid white' }}
			viewBox={`${-padding} ${-padding} ${width + padding} ${height + padding}`}
		// style={{padding: '20px'}}
		>
			<path fill='none' stroke="white" width='1'
				style={{ filter: "drop-shadow(0px 0px 5px white)" }}
				d={dCode}
			/>
		</svg>
	)
}

export default Path

var a = 19;
var b = 7;

function getDCode(width, height) {
	let result = '';
	for (let i = 0; i < 10; i += 0.001) {
		let x = calcX(i, 1, width)
		let y = calcY(i, height)
		result += result == '' ? ` M ${x} ${y}` : ` L ${x} ${y}`
	}
	// console.log(result)
	return result
}

function calcY(t, h) {
	// h is the amplitude of the wave
	// x is the current x value we get every time interval
	// 2 * PI is the length of one cycle (full circumference)
	// f/w is the frequency fraction
	return h * (1 - Math.sin(b * t));
	// const result = h - h * Math.sin(t * 2 * Math.PI * (f / w));
}

function calcX(t, f, w) {
	let theta = 1;
	return w / 2 * (1 - Math.sin(a * t + (f / w)));
}
