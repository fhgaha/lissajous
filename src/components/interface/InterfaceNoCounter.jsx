import React, { useState } from 'react'
import  './interfaceNoCounter.css'

const min = 200, max = 800

const InterfaceNoCounter = () => {
	const [value, setValue] = useState(200)
	const [rangeStyle, setRangeStyle] = useState()

	function handleChange(e) {
		// const newValue = Number((e.target.value - min) * 100 / (max - min))
		const newValue = parseFloat(e.target.value)
		setValue(newValue)
		const newPosition = 10 - (newValue * 0.2)
		setRangeStyle({ left: `calc(${newValue}% + (${newPosition}px))` })
	}

	return (
		<div className="range-wrap">
			<div className="range-value" id="rangeV">
				<span style={rangeStyle}>{value}</span>
			</div>
			<input id="range" type="range" min={min} max={max} 
			value={value} 
			step="1" onChange={handleChange} />
		</div>
	)
} 

export default InterfaceNoCounter