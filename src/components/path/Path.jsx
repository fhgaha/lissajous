import React, { useEffect, useState } from 'react'
import { useInterval } from '../../hooks/useInterval'
import './path.css'
import bezier from 'bezier-easing'

const pad = 150

const Path = () => {
	const [width, setWidth] = useState(400)
	const [height, setHeight] = useState(400)
	const [a, setA] = useState(1)
	const [b, setB] = useState(1)
	const [definition, setDefinition] = useState('')
	const [theta, setTheta] = useState(1)
	const [mousePos, setMousePos] = useState({x: null, y: null});

	useInterval(() => {
		setTheta(theta + 0.005);
		// setA(a + 0.01)
		// console.log(a)
		// setB(b + 0.01)
		// console.log(b)

		let def = getDCode(height / 2, height / 4, a, b, theta)
		setDefinition(def)
		// console.log({ theta, dCode });
	}, 1000 / 60);

	useEffect(() => {
		const handleMouseMove = (event) => {
			setMousePos({ x: event.clientX, y: event.clientY });
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	useEffect(() => {
		if (mousePos.x == null) return

		// setTheta(mousePos.x / window.innerWidth * Math.PI)
		let newA = mousePos.y / window.innerHeight * 0.1 + 1 - 0.0477
		setA(newA)
		// setB(mousePos.x / window.innerWidth * Math.PI)

	}, [mousePos])


return (
	<>
		<svg
			// width={width} height={height}
			xmlns="http://www.w3.org/2000/svg"
			style={{ border: '1px solid blue' }}
			viewBox={`${-width / 4} ${-width / 4} ${width} ${width}`}
		// viewBox={`${0} ${0} ${width * 1.5} ${width * 1.5}`}
		>
			<path fill='none' stroke="white" width='1'
				// transform={`translate(${(width + width * 1.5)/4}, ${(width + width * 1.5)/4})`}
				style={{ filter: "drop-shadow(0px 0px 5px white)" }}
				d={definition}
			/>
		</svg>
		<p>{`(${mousePos.x}, ${mousePos.y})`}</p>
		<p>{'a: ' + a}</p>
		<p>{'b: ' + b}</p>
		<p>{'theta: ' + theta}</p>
	</>
)
}

export default Path

function getDCode(width, height, a, b, theta) {
	let result = '';
	for (let i = 0; i < 100; i += 0.01) {
		let x = calcX(i, theta, width, a)
		let y = calcY(i, height, b)
		result += result == '' ? ` M ${x} ${y}` : ` L ${x} ${y}`
	}
	// console.log(result)
	return result
}

function calcY(t, h, b) {
	return h * (1 - Math.sin(b * t));
}

function calcX(t, f, w, a) {
	return w / 2 * (1 - Math.sin(a * t + f));
}
