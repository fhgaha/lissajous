import React, { useState } from 'react'
import './interface.scss'

const Interface = ({ symbol, onChange, unitName }) => {
	return (
		<div className="interface">
			<div className="symbol-input-group">
				<label className='symbol'>{symbol}</label>
				<div className="input-group">
					{/* <input className='range-style' type="range" onChange={onChange} /> */}
					<input type="range" className="range-style"
						min={0} max={2} step={0.01}
						defaultValue={0}
						onChange={onChange}
					></input>
					<span>{unitName}</span>
				</div>
			</div>
		</div>
	)
}

export default Interface