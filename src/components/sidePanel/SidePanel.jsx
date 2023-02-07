import React, { useLayoutEffect, useState } from 'react'
import './slidePane.css'
import './sidePanel.css'
import { BsGear } from 'react-icons/bs'
import { IoIosClose } from 'react-icons/io'
import gsap from "gsap";
import ReactSlidingPane from 'react-sliding-pane';
import Checkbox from '../checkbox/Checkbox'
import Interface from '../interface/Interface'

const SidePanel = ({ startAnimation, onCheckboxChanged, onParamsChangedManually }) => {
	const [isPaneOpen, setIsPaneOpen] = useState(false);
	const [checked, setChecked] = useState(true)

	useLayoutEffect(() => {
		if (!startAnimation) return

		const ctx = gsap.context(() => {
			gsap.to('.side-panel', { transform: 'translateX(0)', duration: 1, delay: 0.5 })
		})

		return () => ctx.revert()
	}, [startAnimation])

	function handleCheckboxChange(e) {
		onCheckboxChanged(!checked)
		setChecked(!checked)
	}

	const phiInputSettings = { min: 0, max: 2, step: 0.01 }
	const smallAInputSettings = { min: 1, max: 20, step: 1 }

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
				<text>
					x = Asin(at + &phi;) <br />
					y = Bsin(bt)
				</text>
				<Checkbox label="Animate &phi;" value={checked} onChange={handleCheckboxChange} />
				<Interface
					symbol='&phi;'
					unitName='&pi;, Radians'
					onChange={onParamsChangedManually}
					inputSettings={phiInputSettings} />
				<Interface
					symbol='a'
					unitName=''
					onChange={onParamsChangedManually}
					inputSettings={smallAInputSettings} />

				<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia aliquid ad consequuntur, eum dignissimos accusamus!</div>
				<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia aliquid ad consequuntur, eum dignissimos accusamus!</div>

			</ReactSlidingPane>
		</div>
	)
}

export default SidePanel