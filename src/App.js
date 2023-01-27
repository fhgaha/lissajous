import { useEffect, useState } from "react";
import "./App.css";
import Circle from "./components/circle/Circle";
import Path from "./components/path/Path";
import WatchLissajouxText from "./components/watchLissajouxText/WatchLissajouxText";
import { useInterval } from "./hooks/useInterval";

function App() {

  const centerTargetSize = 50

  const [pathIsActive, setPathIsActive] = useState(false)
  const [tagetIsActive, setTagetIsActive] = useState(true)

  return (
    <div
      className="App"
    // onMouseMove={drawCircle} 
    //  onLoad={linedraw(100, 100, 400, 400)}
    >
      {/* <Circle /> */}
      <WatchLissajouxText />
      <Path className={pathIsActive ? 'path active' : 'path'} rotate={pathIsActive ? true : false} />

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
