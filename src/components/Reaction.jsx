import React, { useState, useRef, useEffect, useContext } from 'react'
import './styles/Reaction.css'
import { motion } from 'framer-motion'
import { StatsContext } from './context/StatsContext'
import { Typography } from '@mui/material'

function Reaction() {
  const [btn, setBtn] = useState(true)
  const [box, setBox] = useState(false)
  const [lose, setLose] = useState(false)
  const [end, setEnd] = useState(true)
  const [myTimer, setMyTimer] = useState(null)
  const [randTime, setRandTime] = useState(null)
  const timer = useRef(0)
  const activeBox = [box ? 'reaction-box-active' : 'reaction-box']
  const { bestReactionTime, updateReactionStats } = useContext(StatsContext)

  function reactionBox() {
    const randNum = Math.floor(Math.random() * 80 + 20) * 50
    timer.current = 0
    setBtn(false)
    setLose(false)
    setEnd(false)
    setBox(false)
    setRandTime(
      setTimeout(() => {
        setMyTimer(
          setInterval(() => {
            setBox(true)
            timer.current += 10
            if (timer.current > 2000) {
              setEnd(true)
              setBtn(true)
            }
          }, 10)
        )
      }, randNum)
    )
  }

  function reaction() {
    clearInterval(myTimer)
    clearTimeout(randTime)
    if (!box) {
      timer.current = 0
      setEnd(true)
      setLose(true)
      setTimeout(() => {
        setLose(false)
        setBtn(true)
      }, 2500)
    } else {
      setBox(false)
      setEnd(true)
      updateReactionStats(timer.current)
      setTimeout(() => {
        setBtn(true)
      }, 2000)
    }
  }

  useEffect(() => {
    if (timer.current > 1990) {
      timer.current = 0
      clearInterval(myTimer)
    }
  }, [end, box, myTimer])

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
    >
      <motion.div whileTap={{}} className='reaction-component'>
        <div className='reaction'>
          {lose && <h1>Wait for a green square</h1>}
          {end && <h1>Reaction time {timer.current + ' ms'}</h1>}
          {!end && <div onClick={reaction} className={activeBox}></div>}
          {btn ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={reactionBox}
              className='start-btn'
            >
              Start
            </motion.button>
          ) : (
            ''
          )}
        </div>
        {end && (
          <Typography variant='h4'>Best time {bestReactionTime}ms</Typography>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Reaction
