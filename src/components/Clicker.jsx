import React, { useState, useContext } from 'react'
import './styles/Clicker.css'
import { StatsContext } from './context/StatsContext'
import { motion } from 'framer-motion'
import { Button, Typography, LinearProgress } from '@mui/material'

export default function Clicker() {
  const [clicks, setClicks] = useState(0)
  const [clicksPerSecond, setClicksPerSecond] = useState(0)
  const [seconds, setSeconds] = useState(1)
  const [countDown, setCountDown] = useState(seconds * 1000)
  const [onePercent, setOnePercent] = useState(countDown / 100)
  const [isActive, setIsActive] = useState(false)
  const [restart, setRestart] = useState(false)
  const { bestClickTime, updateBestClickTime } = useContext(StatsContext)

  const startFunction = () => {
    setIsActive(true)
    if (!isActive) {
      setClicks(1)
      const countDown = setInterval(() => {
        setCountDown((prev) => prev - 100)
      }, 100)
      setTimeout(() => {
        setRestart(true)
        setCountDown(0)
        return clearInterval(countDown)
      }, seconds * 1000)
    }
    if (isActive) {
      setClicksPerSecond(parseFloat((clicks + 1) / seconds).toFixed(2))
      setClicks((prev) => prev + 1)
    }
  }

  const restartFunction = () => {
    setIsActive(false)
    setRestart(false)
    setCountDown(seconds * 1000)
    setClicksPerSecond(0)
    setClicks(0)
    updateBestClickTime(clicksPerSecond)
  }

  const setTimeFunction = (sec) => {
    setSeconds(sec)
    setCountDown(sec * 1000)
    setOnePercent((sec * 1000) / 100)
  }

  const setTimeButtons = [1, 2, 3, 4, 5].map((id) => (
    <Button
      variant='outlined'
      disabled={isActive}
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
            <h3>{countDown} ms</h3>
            <LinearProgress
              variant='determinate'
              value={countDown / onePercent}
            />
          </div>
          <div className='clicksPerSec'>
            <h3>{clicksPerSecond} Clicks/s</h3>
          </div>
          <div className='amount'>
            <h3>{clicks} clicks</h3>
          </div>
        </div>

        {restart && (
          <button className='restartBtn' onClick={restartFunction}>
            Click to restart
          </button>
        )}

        <Button
          disabled={restart}
          variant='text'
          className='clicker'
          onClick={startFunction}
        >
          {!isActive && <p className='start-text'>Click here to start</p>}
        </Button>
        {<div className='select'>{setTimeButtons}</div>}
        <Typography variant='h4'>Best Clicks/s {bestClickTime}</Typography>
      </div>
    </motion.div>
  )
}
