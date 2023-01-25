import { useEffect } from "react";
import "./App.css";
import Circle from "./components/circle/Circle";
import Sine from "./components/sine/Sine";
import Line from "./components/line/Line";
import Path from "./components/path/Path";

function App() {

  return (
    <div
      className="App"
    // onMouseMove={drawCircle} 
    //  onLoad={linedraw(100, 100, 400, 400)}
    >
      {/* <Circle /> */}
      {/* <Sine /> */}
      {/* <Line className='line glowy' from={{x: 50, y:100}} to={{x:400, y:500}}/> */}
      <span className="title">Watch the Lissajous Patterns</span>
      {/* <Path/> */}
    </div>
  );
}

export default App;
