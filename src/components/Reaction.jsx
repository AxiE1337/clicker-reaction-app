import React,{useState, useRef} from 'react'
import './styles/Reaction.css'

function Reaction() {

    const [btn, setBtn] = useState(true)
    const [box, setBox] = useState(false)
    const [lose, setLose] = useState(false)
    const [end, setEnd] = useState(true)
    const timer = useRef(0)
    const randNum = Math.floor(Math.random() * (100))*50
    const activeBox = [box?'reaction-box-active':'reaction-box']

    function reactionBox () {
        setBtn(false)
        setLose(false)
        setEnd(false)
        setBox(false)
        setTimeout(() => {
            const myTimer = setInterval(() => {
                timer.current += 10
                if (timer.current > 1500) {
                    if (end) {
                        timer.current = 0
                        setEnd(true)
                        setTimeout(() => {
                            setBtn(true)
                        }, 1000)
                    } else {
                        setTimeout(() => {
                            setBtn(true)
                        }, 1000)
                    }
                    clearInterval(myTimer)
                }
            }, 10)
            setBox(true)
        }, randNum)
    }

    function reaction () {
        if (!box) {
            setEnd(true)
            setLose(true)
            setTimeout(() => {
                setLose(false)
            }, 2000)
        } else {
            setEnd(true)
            setBox(false)
            setTimeout(() => {
                setBtn(true)
            }, 2000)
        }

    }

    return (
        <div className='reaction-component'>
            <div className='reaction'>
                {lose&&<h1>Wait for a green</h1>}
                {end && <h1>Reaction time {timer.current} ms</h1>}
                {!end && <div onClick={reaction} className={activeBox}></div>}
                {btn? <button onClick={reactionBox} className='start-btn'>Start</button>:''}
            </div>
        </div>
    )
}

export default Reaction
