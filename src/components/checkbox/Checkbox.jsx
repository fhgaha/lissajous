import React, { useState } from 'react'
import './checkbox.css'

const Checkbox = ({ label, value, onChange, id }) => {
	return (
		<div className="checkbox-wrapper-51">
			<input type="checkbox" id={id} checked={value} onChange={onChange} />
			<label htmlFor={id} className="toggle">
				<span>
				</span>
			</label>
			<div>{label}</div>	{/* should be inside label */}
		</div>
	)
}

export default Checkbox