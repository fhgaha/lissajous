import { useEffect } from "react";
import "./App.css";
import Circle from "./components/circle/Circle";
import Sine from "./components/sine/Sine";

function App() {

  return (
    <div
      className="App"
    // onMouseMove={drawCircle} 
    // onLoad={ }
    >
      <Circle />
      <Sine />
    </div>
  );
}

export default App;

