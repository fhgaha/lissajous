import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useInterval } from '../../hooks/useInterval'
import './path.css'
import { useMousePos } from '../../hooks/useMousePos'

const fps = 60
let startAnimationFinished = false

const Path = ({ pathIsActive, ...props }) => {
	const [width, setWidth] = useState(400)
	const [height, setHeight] = useState(400)
	const [a, setA] = useState(1)
	const [b, setB] = useState(1)
	const [definition, setDefinition] = useState('')
	const [theta, setTheta] = useState(0)
	const [mousePos, setMousePos] = useMousePos({ x: null, y: null })

	useEffect(() => {
		if (startAnimationFinished || !pathIsActive) return

		drawLine()
	}, [pathIsActive]);

	const drawLine = async () => {
		let i = 0;

		while (i++ < 100) {
			const newDef = `M ${100 - i} ${100 - i} L ${100 + i} ${100 + i}`;
			setDefinition(newDef);
			await new Promise(resolve => setTimeout(resolve, 10));
		}
		startAnimationFinished = true
	}

	useInterval(() => {
		if (!startAnimationFinished) return

		if (pathIsActive) {
			setTheta(theta + 0.005);
		}

		let def = getDCode(height / 2, height / 4, a, b, theta)
		setDefinition(def)
	}, 1000 / fps);

	useEffect(() => {
		if (!startAnimationFinished) return
		if (!pathIsActive) return
		if (mousePos.x == null) return

		let newA = mousePos.y / window.innerHeight * 0.1 + 1 - 0.0477
		setA(newA)
	}, [mousePos])

	return (
		<>
			<svg
				className={'path' + (pathIsActive ? ' active' : '')}
				xmlns="http://www.w3.org/2000/svg"
				viewBox={`${-width / 4} ${-width / 4} ${width} ${width}`}
				{...props}
			>
				<path fill='none' stroke="white" width='1'
					style={{ filter: "drop-shadow(0px 0px 5px white)" }}
					d={definition}
				/>
			</svg>
			{/* <div className="info">
				<p>{`(${mousePos.x}, ${mousePos.y})`}</p>
				<p>{'a: ' + a}</p>
				<p>{'b: ' + b}</p>
				<p>{'theta: ' + theta}</p>
			</div> */}
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
