import React, { useLayoutEffect, useRef } from 'react'
import './adjustButton.css'
import { BsGear } from 'react-icons/bs'
import gsap from "gsap";

const AdjustButton = ({ startAnimation }) => {
	const ab = useRef()

	useLayoutEffect(() => {
		if (!startAnimation) return

		const ctx = gsap.context(() => {
			gsap.to('.adjust-button', { transform: 'translateX(0)', duration: 1, delay: 0.5 })
		})

		return () => ctx.revert()
	}, [startAnimation])

	return (
		<div className="adjust-button">
			<button>
				<BsGear id='gear' size={25} />
			</button>
		</div>
	)
}

export default AdjustButton