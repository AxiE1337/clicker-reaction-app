import React,{useRef, useState, useEffect} from 'react'

function Clicker() {

    const [clicks, setClicks] = useState(1)
    let [countDown, setCountDown] = useState(1000)
    let [clicksPerSec, setClicksPerSec] = useState(0)
    let timer = useRef()
    let [clickBox, setClickBox] = useState(true)
    let [text, setText] = useState(true)
    let [times, setTimes] = useState(true)

    useEffect(() => {
        setClicksPerSec(clicksPerSec = (clicks - 1) / 1)
    }, [countDown])

    function clicksFunc () {
        setText(text = false)
        if (times) {
            timerFunc()
            setTimes(!times)
        }
        setClicks(clicks + 1)
        setTimeout(() => {
            setText(text = true)
            setClickBox(!clickBox)
        }, 1000)   
    }  

    function restart () {
        setCountDown(1000)
        setClicksPerSec(0)
        setTimes(true)
        setClickBox(clickBox = true)
        setClicks(1)
    }

    function timerFunc () {
        timer.current = countDown
        let myTimer = setInterval(() => {
            timer.current -= 10
            if (timer.current < 0) {
                clearInterval(myTimer)
            } else {
                setCountDown(countDown = timer.current)
            }
        },10)
    }

    return (
        <div className='clicker-container'>

            <div className='stats'>
                <div className='timer'><h3>{countDown}ms</h3></div>
                <div className='clicksPerSec'><h3>{clicksPerSec} Clicks/sec</h3></div>
                <div className='amount'><h3>{clicks-1} clicks</h3></div>
            </div>

            {!clickBox? <button className='restartBtn' onClick={restart}>Click to restart</button>: null}
            {clickBox? <div onClick={clicksFunc} className='clicker'>
                {text? <p className='start-text'>Click here to start</p>: ''}</div>: 
                <div style={{pointerEvents: 'none'}} className='clicker'></div>}
        </div>
    )
}

export default Clicker
