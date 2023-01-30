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
  const [tagetIsActive, setTagetIsActive] = useState(true)

  const app = useRef()
  const tl = useRef()

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      tl.current = gsap
      .timeline()
      .to('#watch-lissajous-text', {transform: 'scale(1)', opacity: 1, duration: 3, delay: 0.8})
      .to('#watch-lissajous-text', {opacity: 0, duration: 1})
      .to('.target-in-center', {opacity: 1, duration: 0.6})
    }, app)

    return () => ctx.revert()
  }, [])

  return (
    <div 
    ref={app} 
    className="App">
      {/* <Circle /> */}
      <WatchLissajousText />
      <Path className={pathIsActive ? 'path active' : 'path'} rotate={pathIsActive} />

      <div
        // className="target-in-center"
        className={tagetIsActive ? "target-in-center" : "target-in-center inactive"}
        style={{
          width: `${centerTargetSize}px`,
          height: `${centerTargetSize}px`,
          left: `calc(50% - ${centerTargetSize}px/2)`,
          top: `calc(50% - ${centerTargetSize}px/2)`,
        }}
        onMouseEnter={() => {
          setPathIsActive(true)
          setTagetIsActive(false)
        }}
      ></div>
    </div>
  );
}

export default App;
