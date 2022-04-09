import React, { useRef, useState, useEffect, useContext } from 'react'
import './styles/Clicker.css'
import { StatsContext } from './context/StatsContext'
import { motion } from 'framer-motion'
import { Button, Typography } from '@mui/material'

function Clicker() {
  const [clicks, setClicks] = useState(1)
  let [seconds, setSeconds] = useState(1)
  let [countDown, setCountDown] = useState(seconds * 1000)
  let [clicksPerSec, setClicksPerSec] = useState(0)
  let timer = useRef()
  let [clickBox, setClickBox] = useState(true)
  let [text, setText] = useState(true)
  let [times, setTimes] = useState(true)
  const { bestClickTime, updateBestClickTime } = useContext(StatsContext)

  useEffect(() => {
    setCountDown(seconds * 1000)
  }, [seconds])

  useEffect(() => {
    setClicksPerSec(parseFloat((clicks - 1) / seconds).toFixed(2))
    updateBestClickTime(parseFloat((clicks - 1) / seconds).toFixed(2))
  }, [clicks, seconds, updateBestClickTime])

  function clicksFunc() {
    setText((text = false))
    if (times) {
      timerFunc()
      setTimes(!times)
    }
    setClicks(clicks + 1)
    times &&
      setTimeout(() => {
        setText((text = true))
        setClickBox(!clickBox)
      }, seconds * 1000)
  }

  function restart() {
    setCountDown(seconds * 1000)
    setClicksPerSec(0)
    setTimes(true)
    setClickBox((clickBox = true))
    setClicks(1)
  }

  function timerFunc() {
    timer.current = seconds * 1000
    let myTimer = setInterval(() => {
      timer.current -= 10
      if (timer.current < 0) {
        clearInterval(myTimer)
      } else {
        setCountDown((countDown = timer.current))
      }
    }, 10)
  }

  const setTimeFunction = (sec) => {
    setSeconds((seconds = sec))
  }

  const setTimeButtons = [1, 2, 3, 4, 5].map((id) => (
    <Button
      variant='outlined'
      disabled={!times}
      key={id}
      onClick={() => setTimeFunction(id)}
    >
      {id + ' second'}
    </Button>
  ))

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
    >
      <div className='clicker-container'>
        <div className='stats'>
          <div className='timer'>
            <h3>{countDown}ms</h3>
          </div>
          <div className='clicksPerSec'>
            <h3>{clicksPerSec} Clicks/s</h3>
          </div>
          <div className='amount'>
            <h3>{clicks - 1} clicks</h3>
          </div>
        </div>

        {!clickBox ? (
          <button className='restartBtn' onClick={restart}>
            Click to restart
          </button>
        ) : null}
        {clickBox ? (
          <Button variant='text' onClick={clicksFunc} className='clicker'>
            {text ? <p className='start-text'>Click here to start</p> : ''}
          </Button>
        ) : (
          <div style={{ pointerEvents: 'none' }} className='clicker'></div>
        )}
        {<div className='select'>{setTimeButtons}</div>}
        <Typography variant='h4'>Best Clicks/s {bestClickTime}</Typography>
      </div>
    </motion.div>
  )
}

Clicker.defaultProps = {
  seconds: 1,
}

export default Clicker
