import React, { useState } from 'react'
import './interface.scss'

const Interface = ({ symbol, onChange, unitName }) => {
	const [value, setValue] = useState(0)

	function handleChange(e) {
		setValue(e.target.value == '' ? 0 : parseFloat(e.target.value))
		onChange(e)
	}

	return (
		<div className="interface">
			<label className='input-group'>
				<div>{symbol}</div>
				<div className='units'>
					<input type='number' className='number-input'
						min={0} max={2} step={0.01} 
						value={value == NaN ? 0 : value}
						onChange={handleChange}
					></input>
					<div>{unitName}</div>
				</div>
			</label>
			<input type="range" className="range-style"
				min={0} max={2} step={0.01} 
				value={value == NaN ? 0 : value}
				onChange={handleChange}
			></input>
		</div>
	)
}

export default Interface