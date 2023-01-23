import { useEffect } from "react";
import "./App.css";
import Circle from "./components/circle/Circle";
import Sine from "./components/sine/Sine";
import Line from "./components/line/Line";

function App() {

  return (
    <div
      className="App"
    // onMouseMove={drawCircle} 
    //  onLoad={linedraw(100, 100, 400, 400)}
    >
      {/* <Circle /> */}
      {/* <Sine /> */}
      <Line className='line glowy'/>
    </div>
  );
}

export default App;

function linedraw(ax,ay,bx,by)
{
    if(ay>by)
    {
        bx=ax+bx;  
        ax=bx-ax;
        bx=bx-ax;
        by=ay+by;  
        ay=by-ay;  
        by=by-ay;
    }
    var calc=Math.atan((ay-by)/(bx-ax));
    calc=calc*180/Math.PI;
    var length=Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));
    document.body.innerHTML += "<div id='lineOld' style='height:" + length + "px;width:1px;background-color:red;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc  + "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>"
}