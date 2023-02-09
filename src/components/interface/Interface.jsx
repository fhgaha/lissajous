import React, { useState } from 'react'
import './interface.scss'

const Interface = ({ id, symbol, onChange, inputSettings }) => {
	const [value, setValue] = useState(0)
	const [numberPosition, setNumberPosition] = useState({value: 0, offset: 0})

	function handleChange(e) {
		let newValue = e.target.value == '' ? 0 : parseFloat(e.target.value)
		setValue(newValue)
		onChange(e)

		let newPos = (newValue - inputSettings.min) * 100 / (inputSettings.max - inputSettings.min)
		let newOffset = -40 * newPos /100
		setNumberPosition({value: newPos, offset: newOffset})
	}

	return (
		<div className='interface'>
			<div>{symbol}</div>
			<div className="range-with-number">
				<input type='number' className='number-input' id={id}
					value={value == NaN ? 0 : value}
					onChange={handleChange}
					style={{ left: `calc(${numberPosition.value}% + (${numberPosition.offset}px))` }}
					{...inputSettings}
				></input>
				<input type="range" className="range-style"
					value={value == NaN ? 0 : value}
					onChange={handleChange}
					{...inputSettings}
				></input>
			</div>
		</div>
	)
}

export default Interface