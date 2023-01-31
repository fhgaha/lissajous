import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import Circle from "./components/circle/Circle";
import Path from "./components/path/Path";
import WatchLissajousText from "./components/watchLissajousText/WatchLissajousText";
import { useInterval } from "./hooks/useInterval";
import gsap from "gsap";

const centerTargetSize = 50

function App() {
  const [pathIsActive, setPathIsActive] = useState(false)
  const [targetIsActive, setTargetIsActive] = useState(false)

  const app = useRef()
  const tl = useRef()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ onComplete: () => setTargetIsActive(true) })
        .to('#watch-lissajous-text',
          { scale: 1, opacity: 1, duration: 3, ease: 'cubic-bezier(0.5, 1, 0.89, 1)', delay: 0.8 })
        .to('#watch-lissajous-text', { opacity: 0, duration: 1 })
        .to('.target-in-center', { opacity: 1, duration: 0.6 })
    }, app)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.target-in-center', { opacity: 0, duration: 0.6 })
    }, app)

    return () => ctx.revert()
  }, [pathIsActive])

  function onMouseEnter() {
    setPathIsActive(true)
    setTargetIsActive(false)
  }

  return (
    <div
      ref={app}
      className="App">
      {/* <Circle /> */}
      <WatchLissajousText />
      <Path className={pathIsActive ? 'path active' : 'path'} rotate={pathIsActive.toString()} />

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
    </div>
  );
}

export default App;
