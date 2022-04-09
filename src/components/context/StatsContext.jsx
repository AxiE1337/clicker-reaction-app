import { createContext, useState } from 'react'

let localStorageStats = localStorage.getItem('stats')
localStorageStats = JSON.parse(localStorageStats) || 0

export const StatsContext = createContext()

export const StatsProvider = ({ children }) => {
  const [bestReactionTime, setBestReactionTime] = useState(
    localStorageStats.bestReactionTime || 0
  )
  const [bestClickTime, setBestClickTime] = useState(
    localStorageStats.bestClickTime || 0
  )

  const updateReactionStats = (newValue) => {
    if (newValue < bestReactionTime) {
      setBestReactionTime(newValue)
      let obj = { bestReactionTime: newValue, bestClickTime: bestClickTime }
      localStorage.setItem('stats', JSON.stringify(obj))
    } else if (bestReactionTime === 0) {
      setBestReactionTime(newValue)
      let obj = { bestReactionTime: newValue, bestClickTime: bestClickTime }
      localStorage.setItem('stats', JSON.stringify(obj))
    }
  }
  const updateBestClickTime = (newValue) => {
    if (newValue > bestClickTime) {
      setBestClickTime(newValue)
      let obj = { bestReactionTime: bestReactionTime, bestClickTime: newValue }
      localStorage.setItem('stats', JSON.stringify(obj))
    }
  }
  const resetStats = () => {
    setBestClickTime(0)
    setBestReactionTime(0)
    localStorage.removeItem('stats')
  }
  return (
    <StatsContext.Provider
      value={{
        bestReactionTime,
        bestClickTime,
        updateReactionStats,
        updateBestClickTime,
        resetStats,
      }}
    >
      {children}
    </StatsContext.Provider>
  )
}
