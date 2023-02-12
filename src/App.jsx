import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import Circle from "./components/circle/Circle";
import Path from "./components/path/Path";
import WatchLissajousText from "./components/watchLissajousText/WatchLissajousText";
import { useInterval } from "./hooks/useInterval";
import gsap from "gsap";
import Target from "./components/target/Target";
import { BsGear, BsGithub } from "react-icons/bs";
import SidePanel from "./components/sidePanel/SidePanel";
import Checkbox from "./components/checkbox/Checkbox";

function App() {
  const [pathIsActive, setPathIsActive] = useState(false)
  const [targetIsActive, setTargetIsActive] = useState(false)
  const [showAdjustButton, setShowAdjustButton] = useState(false)

  const [sidePanelState, setSidePanelState] = useState({
    isPaneOpen: null
    , phiCheckbox: true
    , phiValue: 0
    , smallACheckbox: false
    , smallAValue: 1
    , smallBCheckbox: false
    , smallBValue: 1
  })

  const app = useRef()
  const tl = useRef()
  const wltDuration = 0.1 //3

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ onComplete: () => { setTargetIsActive(true) } })
        .to('#watch-lissajous-text',
          { scale: 1, opacity: 1, duration: wltDuration, ease: 'cubic-bezier(0.5, 1, 0.89, 1)', delay: 0.8 })
        .to('#watch-lissajous-text', { opacity: 0, duration: 1 })
        .to('.target-in-center', { opacity: 1, duration: 0.6 })
    }, app)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    if (!pathIsActive) return

    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ onComplete: () => setShowAdjustButton(true) })
        .to('.target-in-center', { opacity: 0, duration: 0.3 })
    }, app)

    return () => ctx.revert()
  }, [pathIsActive])

  function onMouseEnter() {
    setPathIsActive(true)
    setTargetIsActive(false)
  }

  function handleSidePanelStateChange(state) {
    setSidePanelState(state)
  }

  return (
    <div ref={app} className="App">
      {/* <Circle /> */}
      <WatchLissajousText />
      <Path pathIsActive={pathIsActive} sidePanelState={sidePanelState} />
      <Target targetIsActive={targetIsActive.toString()} onMouseEnter={onMouseEnter} />
      <SidePanel
        startAnimation={showAdjustButton}
        onStateChanged={handleSidePanelStateChange}
      />

      {/* <a href="https://github.com/fhgaha/lissajous" target="_blank"><BsGithub /></a> */}
      {/* <Checkbox/> */}
    </div>
  );
}

export default App;
