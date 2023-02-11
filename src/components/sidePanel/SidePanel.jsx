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

	function handleAfterOpen(e) {
		let newState = {...state, isPaneOpen: true}
		setState(newState)
		onStateChanged(newState)
	}

	function handleAfterClose(e) {
		let newState = {...state, isPaneOpen: false}
		setState(newState)
		onStateChanged(newState)
	}

	function handleCheckboxChange(e, propertyName) {
		let newState = { ...state, [propertyName]: !state[propertyName] }
		setState(newState)
		onStateChanged(newState)
	}

	function handleValueChange(e, propertyName) {
		let newValue = e.target.value == '' ? 0 : parseFloat(e.target.value)
		let newState = { ...state, [propertyName]: newValue }
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
				onAfterOpen={handleAfterOpen}
				onAfterClose={handleAfterClose}
				width={400}
				onRequestClose={() => setState({ ...state, isPaneOpen: false })}
			>
				<text>
					x = Asin(at + &phi;) <br />
					y = Bsin(bt)
				</text>

				<Checkbox label="Animate &phi;"
					value={state.phiCheckbox}
					onChange={(e) => handleCheckboxChange(e, 'phiCheckbox')} id="cbx-51" />
				<Interface
					id='phi'
					symbol='&phi;'
					defaultValue={0}
					value={state.phiValue}
					onChange={(e) => handleValueChange(e, 'phiValue')}
					inputSettings={phiInputSettings} />

				<Checkbox label="Change a manually"
					value={state.smallACheckbox}
					onChange={(e) => handleCheckboxChange(e, 'smallACheckbox')} id="cbx-52" />
				<Interface
					id='a'
					symbol='a'
					defaultValue={1}
					value={state.smallAValue}
					onChange={(e) => handleValueChange(e, 'smallAValue')}
					inputSettings={smallABInputSettings} />

				<Checkbox label="Change b manually"
					value={state.smallBCheckbox}
					onChange={(e) => handleCheckboxChange(e, 'smallBCheckbox')} id="cbx-53" />
				<Interface
					id='b'
					symbol='b'
					defaultValue={1}
					value={state.smallBValue}
					onChange={(e) => handleValueChange(e, 'smallBValue')}
					inputSettings={smallABInputSettings} />

			</ReactSlidingPane>
		</div>
	)
}

export default SidePanel