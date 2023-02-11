import React, { useEffect, useState } from 'react'
import './interface.scss'

const numberInputWidth = 40

const Interface = ({ id, symbol, defaultValue, value, onChange, inputSettings }) => {
	// const [value, setValue] = useState(defaultValue)
	const [numberPosition, setNumberPosition] = useState({ value: 0, offset: 0 })

	function handleChange(e) {
		let newValue = e.target.value == '' ? 0 : parseFloat(e.target.value)
		// setValue(newValue)

		let newPos = (newValue - inputSettings.min) * 100 / (inputSettings.max - inputSettings.min)
		let newOffset = -numberInputWidth * newPos / 100
		setNumberPosition({ value: newPos, offset: newOffset })

		onChange(e)
	}

	return (
		<div className='interface'>
			<div className='symbol'>{symbol}</div>
			<div className="range-with-number">
				<button type='number' className='number-input' id={id}
					disabled={true}
					value={value}
					onChange={handleChange}
					style={{ left: `calc(${numberPosition.value}% + (${numberPosition.offset}px))` }}
					{...inputSettings}
				>{value}</button>
				<input type="range" className="range-style"
					value={value}
					onChange={handleChange}
					{...inputSettings}
				></input>
			</div>
		</div>
	)
}

export default Interface