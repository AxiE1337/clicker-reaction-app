import React,{useRef, useState, useEffect} from 'react'

function Clicker() {

    const [clicks, setClicks] = useState(1)
    let [seconds ,setSeconds] = useState(1)
    let [countDown, setCountDown] = useState(seconds * 1000)
    let [clicksPerSec, setClicksPerSec] = useState(0)
    let timer = useRef()
    let [clickBox, setClickBox] = useState(true)
    let [text, setText] = useState(true)
    let [times, setTimes] = useState(true)

    useEffect(() => {
        setCountDown(seconds * 1000)
    }, [seconds])

    useEffect(() => {
        setClicksPerSec(clicksPerSec = parseFloat((clicks - 1) / seconds).toFixed(2))
    }, [countDown])
   
    function clicksFunc () {
        setText(text = false)
        if (times) {
            timerFunc()
            setTimes(!times)
        }
        setClicks(clicks + 1)
        times && setTimeout(() => {
            setText(text = true)
            setClickBox(!clickBox)
        }, seconds * 1000)  
    }  

    function restart () {
        setCountDown(seconds * 1000)
        setClicksPerSec(0)
        setTimes(true)
        setClickBox(clickBox = true)
        setClicks(1)
    }

    function timerFunc () {
        timer.current = (seconds * 1000)
        let myTimer = setInterval(() => {
            timer.current -= 10
            if (timer.current < 0) {
                clearInterval(myTimer)
            } else {
                setCountDown(countDown = timer.current)
            }
        },10)
    }

    function sec1 () {
        setSeconds(seconds = 1)
    }

    function sec2 () {
        setSeconds(seconds = 2)
    }

    function sec3 () {
        setSeconds(seconds = 3)
    }

    function sec4 () {
        setSeconds(seconds = 4)
    }

    function sec5 () {
        setSeconds(seconds = 5)
    }

    return (
        <div className='clicker-container'>

            <div className='stats'>
                <div className='timer'><h3>{countDown}ms</h3></div>
                <div className='clicksPerSec'><h3>{clicksPerSec} Clicks/s</h3></div>
                <div className='amount'><h3>{clicks-1} clicks</h3></div>
            </div>

            {!clickBox? <button className='restartBtn' onClick={restart}>Click to restart</button>: null}
            {clickBox? <div onClick={clicksFunc} className='clicker'>
                {text? <p className='start-text'>Click here to start</p>: ''}</div>: 
                <div style={{pointerEvents: 'none'}} className='clicker'></div>}
            {times?<div className='select'>
                <button onClick={sec1} className='select-btns'>1 second</button>
                <button onClick={sec2} className='select-btns'>2 seconds</button>
                <button onClick={sec3} className='select-btns'>3 seconds</button>
                <button onClick={sec4} className='select-btns'>4 seconds</button>
                <button onClick={sec5} className='select-btns'>5 seconds</button>
            </div>: null}
        </div>
    )
}

Clicker.defaultProps = {
    seconds: 1,
}

export default Clicker
