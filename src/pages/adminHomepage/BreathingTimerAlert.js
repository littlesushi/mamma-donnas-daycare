// libraries
import { useState, useEffect } from "react";

export default function BreathingTimerAler() {
    const [ timerFlag, setTimerFlag ]       = useState(true)
   
    useEffect(() => {
        if(timerFlag == true) {
            setTimeout( function ( ) {setTimerFlag(false), alert( "15 minute breathing check time." ); }, 900000 );
            
          }

    }, [timerFlag])

    const handleClick = () => {
        setTimerFlag(true)
    }

    return (
        <div>
            {!timerFlag && <button className='btn' onClick={() => handleClick()}>Reset Breathing Timer</button>}
        </div>
    )
}
