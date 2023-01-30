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

  // useLayoutEffect(() => {
    // let ctx = gsap.context(() => {
      // gsap
      // .timeline()
      // .to('#watch-lissajous-text', {
      //   animation: `
      //   3s forwards cubic-bezier(0.5, 1, 0.89, 1) scale-in,
      //   1.5s 0.6s forwards cubic-bezier(0.11, 0, 0.5, 0) fade-in,
      //   3s 4s forwards cubic-bezier(0.5, 1, 0.89, 1) scale-out,
      //   0.8s 2.5s forwards cubic-bezier(0.11, 0, 0.5, 0) fade-out
      // ` })
      // //   .to('.target-in-center', {
      //     animation: `
      //     0.5s 4s forwards ease-in target-appear
      // `})
    // }, app)

    // return () => ctx.revert()
  // }, [])

  return (
    <div 
    // ref={app} 
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
