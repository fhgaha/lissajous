import React, { useEffect, useLayoutEffect, useState } from 'react'
import './circle.css'

const Circle = (props) => {
	const [position, setPosition] = useState({ x: 0, y: 0 })

	useEffect(() => {
		document.onmousemove = (event) => {
			var e = event;
			setPosition({ x: e.clientX, y: e.clientY })
		};
	});

	return (
		<div id='circle' className="glowy" {...props} style={{left: position.x, top: position.y}}></div >
	)
}

export default Circle