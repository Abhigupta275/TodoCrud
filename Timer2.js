import React, { useEffect, useState } from 'react'

function App() {

  const [minutes, setMinutes] = useState(0);
  const [seconds,setSeconds] = useState(0)
  const [timerOn, setTimerOn] = useState(false)

  useEffect(()=>{
    let timer;
    if(timerOn){
    timer = setInterval(()=>{
      setSeconds(seconds +1);
        if(seconds === 59){
          setMinutes(minutes +1);
          setSeconds(0)
        }
    },1000)
  }
    return () => clearInterval(timer);
  })

  const start =  () =>{
    setTimerOn(true)
  }
  const stop =()=>{
    setTimerOn(false)
  }
  const reset =()=>{
    setMinutes(0);
    setSeconds(0);
    timerOn(false)
  }
  return (
    <>
      <h1>Timer</h1>
      <h2>{minutes<10?'0' +minutes : minutes}:{seconds<10?'0' +seconds : seconds}</h2>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </>
  )
}

export default App
