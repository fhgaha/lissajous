import React, { useLayoutEffect, useState } from 'react'
import './slidePane.css'
import './sidePanel.css'
import { BsGear, BsGithub } from 'react-icons/bs'
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
	const [numberPosition, setNumberPosition] = useState({
		phiValue: { value: 0, offset: 0 }
		, smallAValue: { value: 0, offset: 0 }
		, smallBValue: { value: 0, offset: 0 }
	})

	useLayoutEffect(() => {
		if (!startAnimation) return

		const buttonApearingDelay = 5

		const ctx = gsap.context(() => {
			gsap.to('.side-panel', { transform: 'translateX(0)', duration: 1, delay: buttonApearingDelay })
		})

		return () => ctx.revert()
	}, [startAnimation])

	function handleAfterOpen(e) {
		let newState = { ...state, isPaneOpen: true }
		setState(newState)
		onStateChanged(newState)
	}

	function handleAfterClose(e) {
		let newState = { ...state, isPaneOpen: false }
		setState(newState)
		onStateChanged(newState)
	}

	function handleCheckboxChange(e, propertyName) {
		let newState = { ...state, [propertyName]: !state[propertyName] }
		setState(newState)
		onStateChanged(newState)
	}

	function handleValueChange(e, propertyName, pos) {
		let newValue = e.target.value == '' ? 0 : parseFloat(e.target.value)
		let newState = { ...state, [propertyName]: newValue }
		setState(newState)
		setNumberPosition({ ...numberPosition, [propertyName]: pos })
		onStateChanged(newState)
	}

	const phiInputSettings = { min: 0, max: 2, step: 0.01 }
	const smallABInputSettings = { min: 1, max: 20, step: 1 }

	return (
		<div className="side-panel">
			<button id='gear-button' onClick={() => setState({ ...state, isPaneOpen: true })}>
				<BsGear id='gear' size={25} />
			</button>
			<ReactSlidingPane
				closeIcon={<IoIosClose style={{ width: 70, height: 70 }} />}
				className="my-slide-pane"
				overlayClassName="my-slide-pane__overlay"
				title={
					<a className='github-link' href="https://github.com/fhgaha/lissajous" target="_blank">
						<BsGithub />
					</a>
				}
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

				<div>
					<Checkbox label="Animate &phi;"
						value={state.phiCheckbox}
						onChange={(e) => handleCheckboxChange(e, 'phiCheckbox')} id="cbx-51" />
					<Interface
						id='phi'
						symbol='&phi;'
						value={state.phiValue}
						numberPosition={numberPosition.phiValue}
						onChange={(e, pos) => handleValueChange(e, 'phiValue', pos)}
						inputSettings={phiInputSettings} />
				</div>

				<div>
					<Checkbox label="Change a manually"
						value={state.smallACheckbox}
						onChange={(e) => handleCheckboxChange(e, 'smallACheckbox')} id="cbx-52" />
					<Interface
						id='a'
						isDisabled={!state.smallACheckbox}
						symbol='a'
						value={state.smallAValue}
						numberPosition={numberPosition.smallAValue}
						onChange={(e, pos) => handleValueChange(e, 'smallAValue', pos)}
						inputSettings={smallABInputSettings} />
				</div>

				<div>
					<Checkbox label="Change b manually"
						value={state.smallBCheckbox}
						onChange={(e) => handleCheckboxChange(e, 'smallBCheckbox')} id="cbx-53" />
					<Interface
						id='b'
						isDisabled={!state.smallBCheckbox}
						symbol='b'
						value={state.smallBValue}
						numberPosition={numberPosition.smallBValue}
						onChange={(e, pos) => handleValueChange(e, 'smallBValue', pos)}
						inputSettings={smallABInputSettings} />
				</div>

			</ReactSlidingPane>
		</div>
	)
}

export default SidePanel