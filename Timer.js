import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () =>{

 
  const [minutes,setMinutes] =useState(0)
  const [seconds,setSeconds] = useState(0)
  const [timerOn, setTimerOn] = useState(false)

  useEffect(() =>{
    let interval;
    if(timerOn){
      interval = setInterval(()=>{
        if(seconds === 59){
        setSeconds(0)
        setMinutes((prevMinutes) => prevMinutes + 1);
        }else{
          setSeconds((prevSeconds) => prevSeconds + 1);
        }
      },1000)
    }else{
      clearInterval(interval);
    }
    return () => clearInterval(interval)
  },[timerOn,seconds ]);

  const startTimer = () =>{
    setTimerOn(true)
  } 

  const stopTimer = () =>{
    setTimerOn(false)
  }
  
  const resetTimer = () =>{
    setMinutes(0);
    setSeconds(0)
    setTimerOn(false)
  }
  const formatedTime = `${minutes.toString().padStart(2,'0')} : ${seconds.toString().padStart(2,'0')}`;
  return(
    <>
      <h1>Timer</h1>
      <h2>{formatedTime}</h2>
      {
        !timerOn ?
         (<button onClick={startTimer}>Start</button>) :
         (<button  onClick={stopTimer}>Stop</button>)
        }
      <button onClick={resetTimer}>Reset</button>
    </>
  )
}
export default App
