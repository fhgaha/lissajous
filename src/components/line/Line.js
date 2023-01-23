import React, { useEffect, useState } from 'react'
import './line.css'

const Line = (props) => {

	const [first, setfirst] = useState()

	useEffect(() => {
		setfirst(linedraw(100, 100, 400, 400))

	}, [])

	return (
		<div className='line' style={ linedraw(100, 100, 400, 400)} {...props}></div>
	)
}

export default Line

function linedraw(ax, ay, bx, by) {
	if (ay > by) {
		bx = ax + bx;
		ax = bx - ax;
		bx = bx - ax;
		by = ay + by;
		ay = by - ay;
		by = by - ay;
	}
	var calc = Math.atan((ay - by) / (bx - ax));
	calc *= (180 / Math.PI);
	var length = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
	return {
		height: length + "px",
		top: ay + "px",
		left: ax + "px",
		transform: `rotate(${calc}deg)`,
		msTransform: `rotate(${calc}deg)`,
		MozTransform: `rotate(${calc}deg)`,
		WebkitTransform: `rotate(${calc}deg)`,
		OTransform: `rotate(${calc}deg)`
	}
}
