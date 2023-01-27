import { useEffect } from "react";
import "./App.css";
import Circle from "./components/circle/Circle";
import Path from "./components/path/Path";
import WatchLissajouxText from "./components/watchLissajouxText/WatchLissajouxText";

function App() {

  return (
    <div
      className="App"
    // onMouseMove={drawCircle} 
    //  onLoad={linedraw(100, 100, 400, 400)}
    >
      {/* <Circle /> */}
      <WatchLissajouxText/>
      <Path/>
      
    </div>
  );
}

export default App;
