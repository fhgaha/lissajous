import React, { useEffect, useState } from 'react'
import { useInterval } from '../../hooks/useInterval'

const pad = 20

const Path = () => {
	const [width, setWidth] = useState(800)
	const [height, setHeight] = useState(600)
	const [dCode, setDCode] = useState('')
	const [theta, setTheta] = useState(0)

	useInterval(() => {
		setTheta(theta + 0.01);
		let result = getDCode(width - pad, height / 2 - pad, theta)
		setDCode(result)
		// console.log({ theta, dCode });
	}, 100);

	return (
		<svg width={width} height={height} xmlns="http://www.w3.org/2000/svg"
			// style={{ border: '1px solid white' }}
			viewBox={`${-pad} ${-pad} ${width + pad} ${height + pad}`}
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

function getDCode(width, height, theta) {
	let result = '';
	for (let i = 0; i < 10; i += 0.001) {
		let x = calcX(i, theta, width)
		let y = calcY(i, height)
		result += result == '' ? ` M ${x} ${y}` : ` L ${x} ${y}`
	}
	// console.log(result)
	return result
}

function calcY(t, h) {
	return h * (1 - Math.sin(b * t));
}

function calcX(t, f, w) {
	return w / 2 * (1 - Math.sin(a * t + f));
}
