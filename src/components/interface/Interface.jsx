import React, { useState } from 'react'
import './interface.scss'

const Interface = ({ id, symbol, unitName, onChange, inputSettings }) => {
	const [value, setValue] = useState(0)

	function handleChange(e) {
		setValue(e.target.value == '' ? 0 : parseFloat(e.target.value))
		onChange(e)
	}

	return (
		<div className='interface'>
			<label className='input-group'>
				<div>{symbol}</div>
				<div className='units'>
					<input type='number' className='number-input' id={id}
						value={value == NaN ? 0 : value}
						onChange={handleChange}
						{...inputSettings}
					></input>
					<div>{unitName}</div>
				</div>
			</label>
			<input type="range" className="range-style"
				value={value == NaN ? 0 : value}
				onChange={handleChange}
				{...inputSettings}
			></input>
		</div>
	)
}

export default Interface