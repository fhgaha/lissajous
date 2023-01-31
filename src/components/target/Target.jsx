import React from 'react'
import './target.css'

const centerTargetSize = 25

const Target = ({targetIsActive, onMouseEnter}) => {
	return (
		<div
			className={"target-in-center" + (targetIsActive ? "" : " inactive")}
			style={{
				width: `${centerTargetSize}px`,
				height: `${centerTargetSize}px`,
				left: `calc(50% - ${centerTargetSize}px/2)`,
				top: `calc(50% - ${centerTargetSize}px/2)`,
				pointerEvents: `${targetIsActive ? 'all' : 'none'}`
			}}
			onMouseEnter={onMouseEnter}
		></div>
	)
}

export default Target