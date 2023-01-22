import React, { useLayoutEffect, useState } from 'react'

const Circle = (props) => {
	const [position, setPosition] = useState({ x: 0, y: 0 })

	useLayoutEffect(() => {
		document.onmousemove = (event) => {
			var e = event;
			setPosition({ x: e.clientX, y: e.clientY })
		};
	});

	const styles = {
		left: position.x,
		top: position.y,
		transitionTimingFunction: "cubic-bezier(0.18, 0.89, 0.32, 1.28)",
		transitionDuration: "0.8s"
	}

	return (
		<div id='circle' className="glowy" {...props} style={styles}></div>
	)
}

export default Circle