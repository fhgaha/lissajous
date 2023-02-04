import React, { useLayoutEffect, useState } from 'react'
import './adjustButton.css'
import { BsGear } from 'react-icons/bs'
import gsap from "gsap";
import ReactSlidingPane from 'react-sliding-pane';
import './slidePane.css'

const AdjustButton = ({ startAnimation }) => {
	const [isPaneOpen, setIsPaneOpen] = useState(false);

	useLayoutEffect(() => {
		if (!startAnimation) return

		const ctx = gsap.context(() => {
			gsap.to('.adjust-button', { transform: 'translateX(0)', duration: 1, delay: 0.5 })
		})

		return () => ctx.revert()
	}, [startAnimation])

	return (
		<div className="adjust-button">
			<button onClick={() => setIsPaneOpen(true)}>
				<BsGear id='gear' size={25} />
			</button>
			<ReactSlidingPane
				className="my-slide-pane"
				overlayClassName="my-slide-pane__overlay"
				isOpen={isPaneOpen}
				width={400}
				title="Hey, it is optional pane title.  I can be React component too."
				subtitle="Optional subtitle."
				hideHeader={true}
				onRequestClose={() => setIsPaneOpen(false)}
			>
				<div>And I am pane content. BTW, what rocks?</div>
			</ReactSlidingPane>
		</div>
	)
}

export default AdjustButton