import React, { useLayoutEffect, useState } from 'react'
import './slidePane.css'
import './sidePanel.css'
import { BsGear } from 'react-icons/bs'
import { IoIosClose } from 'react-icons/io'
import gsap from "gsap";
import ReactSlidingPane from 'react-sliding-pane';
import Checkbox from '../checkbox/Checkbox'

const SidePanel = ({ startAnimation }) => {
	const [isPaneOpen, setIsPaneOpen] = useState(false);
	const [checked, setChecked] = useState(false)

	useLayoutEffect(() => {
		if (!startAnimation) return

		const ctx = gsap.context(() => {
			gsap.to('.side-panel', { transform: 'translateX(0)', duration: 1, delay: 0.5 })
		})

		return () => ctx.revert()
	}, [startAnimation])

	return (
		<div className="side-panel">
			<button onClick={() => setIsPaneOpen(true)}>
				<BsGear id='gear' size={25} />
			</button>
			<ReactSlidingPane
				closeIcon={<IoIosClose style={{ width: 70, height: 70 }} />}
				className="my-slide-pane"
				overlayClassName="my-slide-pane__overlay"
				isOpen={isPaneOpen}
				width={400}
				onRequestClose={() => setIsPaneOpen(false)}
			>
				<Checkbox label="Animate &phi;" value={checked} onChange={() => setChecked(!checked)} />

			</ReactSlidingPane>
		</div>
	)
}

export default SidePanel