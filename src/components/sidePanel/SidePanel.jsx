import React, { useLayoutEffect, useState } from 'react'
import './slidePane.css'
import './sidePanel.css'
import { BsGear } from 'react-icons/bs'
import { IoIosClose } from 'react-icons/io'
import gsap from "gsap";
import ReactSlidingPane from 'react-sliding-pane';
import Checkbox from '../checkbox/Checkbox'
import Interface from '../interface/Interface'

const SidePanel = ({ startAnimation, onStateChanged }) => {
	const [state, setState] = useState({
		isPaneOpen: false
		, phiCheckbox: true
		, phiValue: 0
		, smallACheckbox: false
		, smallAValue: 1
		, smallBCheckbox: false
		, smallBValue: 1
	})

	useLayoutEffect(() => {
		if (!startAnimation) return

		const ctx = gsap.context(() => {
			gsap.to('.side-panel', { transform: 'translateX(0)', duration: 1, delay: 0.5 })
		})

		return () => ctx.revert()
	}, [startAnimation])

	function handlePhiCheckboxChange(e) {
		let newState = { ...state, phiCheckbox: !state.phiCheckbox }
		setState(newState)
		onStateChanged(newState)
	}

	function handlePhiValueChange(e) {
		let newPhi = e.target.value == '' ? 0 : parseFloat(e.target.value)
		let newState = { ...state, phiValue: newPhi }
		setState(newState)
		onStateChanged(newState)
	}

	function handleSmallACheckboxChange(e) {
		let newState = { ...state, smallACheckbox: !state.smallACheckbox }
		setState(newState)
		onStateChanged(newState)
	}

	function handleSmallAValueChange(e) {
		let newSmallA = e.target.value == '' ? 0 : parseFloat(e.target.value)
		let newState = { ...state, smallAValue: newSmallA }
		setState(newState)
		onStateChanged(newState)
	}

	function handleSmallBCheckboxChange(e) {
		let newState = { ...state, smallBCheckbox: !state.smallBCheckbox }
		setState(newState)
		onStateChanged(newState)
	}

	function handleSmallBValueChange(e) {
		let newSmallB = e.target.value == '' ? 0 : parseFloat(e.target.value)
		let newState = { ...state, smallBValue: newSmallB }
		setState(newState)
		onStateChanged(newState)
	}

	const phiInputSettings = { min: 0, max: 2, step: 0.01 }
	const smallABInputSettings = { min: 1, max: 20, step: 1 }

	return (
		<div className="side-panel">
			<button onClick={() => setState({ ...state, isPaneOpen: true })}>
				<BsGear id='gear' size={25} />
			</button>
			<ReactSlidingPane
				closeIcon={<IoIosClose style={{ width: 70, height: 70 }} />}
				className="my-slide-pane"
				overlayClassName="my-slide-pane__overlay"
				isOpen={state.isPaneOpen}
				width={400}
				onRequestClose={() => setState({ ...state, isPaneOpen: false })}
			>
				<text>
					x = Asin(at + &phi;) <br />
					y = Bsin(bt)
				</text>

				<Checkbox label="Animate &phi;"
					value={state.phiCheckbox}
					onChange={handlePhiCheckboxChange} id="cbx-51" />
				<Interface
					id='phi'
					symbol='&phi;'
					unitName='&pi;, Radians'
					onChange={handlePhiValueChange}
					inputSettings={phiInputSettings} />

				<Checkbox label="Change a manually"
					value={state.smallACheckbox}
					onChange={handleSmallACheckboxChange} id="cbx-52" />
				<Interface
					id='a'
					symbol='a'
					unitName=''
					onChange={handleSmallAValueChange}
					inputSettings={smallABInputSettings} />

				<Checkbox label="Change b manually"
					value={state.smallBCheckbox}
					onChange={handleSmallBCheckboxChange} id="cbx-53" />
				<Interface
					id='b'
					symbol='b'
					unitName=''
					onChange={handleSmallBValueChange}
					inputSettings={smallABInputSettings} />

			</ReactSlidingPane>
		</div>
	)
}

export default SidePanel