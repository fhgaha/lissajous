import React, { useEffect, useState } from 'react'
import { useInterval } from '../../hooks/useInterval'
import './path.css'

const pad = 150

const Path = () => {
	const [width, setWidth] = useState(400)
	const [height, setHeight] = useState(400)
	const [a, setA] = useState(11)
	const [b, setB] = useState(10)
	const [definition, setDefinition] = useState('')
	const [theta, setTheta] = useState(1)
	const [mousePos, setMousePos] = useState({});

	useInterval(() => {
		setTheta(theta + 0.005);
		// setA(a + 0.01)
		// console.log(a)
		// setB(b + 0.01)
		// console.log(b)

		let def = getDCode(width/2, width/4, a, b, theta)
		setDefinition(def)
		// console.log({ theta, dCode });
	}, 24);

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
		// setTheta(mousePos.x / window.innerWidth * Math.PI)

	}, [mousePos])


	return (
		<>
			<svg
				// width={width} height={height}
				xmlns="http://www.w3.org/2000/svg"
				style={{ border: '1px solid blue' }}
				viewBox={`${0} ${0} ${width} ${height}`}
			>
				<path fill='none' stroke="white" width='1'
					transform={`translate(${width/4}, ${height/4})`}
					style={{ filter: "drop-shadow(0px 0px 5px white)" }}
					d={definition}
				/>
			</svg>
			<b>
				({mousePos.x}, {mousePos.y})
			</b>
		</>
	)
}

export default Path

function getDCode(width, height, a, b, theta) {
	let result = '';
	for (let i = 0; i < 10; i += 0.001) {
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
