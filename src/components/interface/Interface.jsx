import React, { useEffect, useState } from 'react'
import st from './interface.module.scss'

const numberInputWidth = 40

const Interface = ({ id, symbol, value, numberPosition, onChange, inputSettings }) => {

	function handleChange(e) {
		let newValue = e.target.value == '' ? 0 : parseFloat(e.target.value)
		let newPos = (newValue - inputSettings.min) * 100 / (inputSettings.max - inputSettings.min)
		let newOffset = -numberInputWidth * newPos / 100
		onChange(e, { value: newPos, offset: newOffset })
	}

	return (
		<div className={st.interface}>
			<div className={st.symbol}>{symbol}</div>
			<div className={st["range-with-number"]}>
				<button type='number' className={st["number-input"]} id={id}
					disabled={true}
					value={value}
					onChange={handleChange}
					style={{ left: `calc(${numberPosition.value}% + (${numberPosition.offset}px))` }}
					{...inputSettings}
				>{value}</button>
				<input type="range" className={st["range-style"]}
					value={value}
					onChange={handleChange}
					{...inputSettings}
				></input>
			</div>
		</div>
	)
}

export default Interface