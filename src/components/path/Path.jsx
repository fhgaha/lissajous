import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useInterval } from '../../hooks/useInterval'
import './path.css'
import { useMousePos } from '../../hooks/useMousePos'

const fps = 60
const width = 400, height = 400
let startAnimationFinished = false

const Path = ({ pathIsActive, sidePanelState, ...props }) => {
	const [params, setParams] = useState({ a: 1, b: 1, phi: 0.0 })
	const [definition, setDefinition] = useState('')
	const [mousePos, setMousePos] = useMousePos({ x: null, y: null })

	useEffect(() => {
		if (startAnimationFinished || !pathIsActive) return

		const draw = async () => {
			await waitFor(800)

			for (let i = 0; i < 100; i++) {
				setDefinition(`M ${100 - i} ${100 - i} L ${100 + i} ${100 + i}`)
				await waitFor(10)
			}
			startAnimationFinished = true
		}
		draw()
	}, [pathIsActive])

	useEffect(() => {
		if (sidePanelState == null || !sidePanelState.isPaneOpen) return

		setParams({ ...params, phi: sidePanelState.phiValue })
	}, [sidePanelState.phiValue])

	useEffect(() => {
		if (sidePanelState == null || !sidePanelState.isPaneOpen) return

		if (sidePanelState.smallACheckbox) {
			setParams({ ...params, a: sidePanelState.smallAValue })
		}
	}, [sidePanelState.smallAValue])

	useEffect(() => {
		if (sidePanelState == null || !sidePanelState.isPaneOpen) return

		if (sidePanelState.smallBCheckbox) {
			setParams({ ...params, b: sidePanelState.smallBValue })
		}
	}, [sidePanelState.smallBValue])


	useInterval(() => {
		if (!startAnimationFinished) return

		if (pathIsActive && sidePanelState.phiCheckbox) {
			setParams({ ...params, phi: params.phi + 0.004 })
		}

		let def = getDCode(height / 2, height / 4,
			params.a, params.b, params.phi)
		setDefinition(def)
	}, 1000 / fps);

	useEffect(() => {
		if (!startAnimationFinished || !pathIsActive) return
		if (mousePos.x == null) return
		if (sidePanelState.smallACheckbox) return
		if (sidePanelState.isPaneOpen) return

		let newA = mousePos.y / window.innerHeight * 0.1 + 1 - 0.0477
		setParams({ ...params, a: newA })
	}, [mousePos])

	return (
		<>
			<svg
				className='path'
				xmlns="http://www.w3.org/2000/svg"
				viewBox={`${-width / 4} ${-width / 4} ${width} ${width}`}
				{...props}
			>
				{/* <filter id='shadow' colorInterpolationFilters="sRGB" width="300%" height="300%" x="-75%" y="-75%">
					<feDropShadow dx="0" dy="0" stdDeviation="10" floodOpacity="1" floodColor="white" />
				</filter> */}
				<path fill='none' stroke="white" width='1'
					style={{ filter: 'drop-shadow(0px 0px 0.5px white)' }}
					// style={{ filter: 'url(#shadow)' }}
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

async function waitFor(ms) {
	await new Promise(resolve => setTimeout(resolve, ms))
}

function getDCode(width, height, a, b, theta) {
	let result = '';
	for (let i = 0; i < 100; i += 0.01) {
		let x = calcX(i, theta, width, a)
		let y = calcY(i, height, b)
		result += result == '' ? ` M ${x} ${y}` : ` L ${x} ${y}`
	}
	return result
}

function calcX(t, f, w, a) {
	return w / 2 * (1 - Math.sin(a * t + f));
}

function calcY(t, h, b) {
	return h * (1 - Math.sin(b * t));
}
