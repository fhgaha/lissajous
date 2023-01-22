import { useLayoutEffect, useState } from "react";
import "./App.css";
import Circle from "./components/circle/Circle";

function App() {

  // async function drawCircle(e) {
  //   await new Promise(resolve => setTimeout(resolve, 200));
  //   let circle = document.getElementById('circle');
  //   circle.style.left = e.pageX + 'px';
  //   circle.style.top = e.pageY + 'px';
  // }

  return (
    <div
      className="App"
    // onMouseMove={drawCircle} 
    // onLoad={ }
    >
      <Circle/>

      <canvas
        id="canvas"
        width="320"
        height="120"
        style={{ border: '1px solid #999' }}
      ></canvas>
    </div>
  );

}

export default App;

