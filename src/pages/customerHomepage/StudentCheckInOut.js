// This is a component that will only appear inside customer home

// libraries
import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'



export default function StudentCheckInOut({ uid }) {

    // state
    const [inOut, setInOut]   = useState(false)
    const [status, setStatus] = useState('')

    const { addDocument, response } = useFirestore('AttendanceLog')
    
    // function to record child's status
    const checkIn = async (e) => {
        e.preventDefault()

        if(inOut === false) {
            setInOut(true)
            setStatus('Checked In')
            document.getElementById("checkinbut").disabled = true;
            document.getElementById("checkoutbut").disabled = false;
        }
        console.log("The status of user id is: " + uid)
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
        document.getElementById("demo").innerHTML = time;
        //Send the data to the collection in the backend
        addDocument({
            uid,
            status
        })
    }

    const checkOut = async (e) => {
        e.preventDefault()

        if(inOut === true) {
            setInOut(false)
            setStatus('Checked Out')
            document.getElementById("checkinbut").disabled = false;
            document.getElementById("checkoutbut").disabled = true;
        }
        console.log("The status of user id is: " + uid)
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
        document.getElementById("demo").innerHTML = time;
        //Send the data to the collection in the backend
        addDocument({
            uid,
            status
        })
    }

    // fires when this component is first called and when the response state changes
    // this will be used to clear the text inputs after a successful add to the database operation
    useEffect(() => {
        if(response.success) {

            console.log(response)
        } 
    }, [response.success])

    return (
        <div>
            <h2>Check Your child In and Out</h2>
            { !inOut && <p>Your child is currently checked out</p>}
            
            { inOut && <p>Your child is currently checked in</p>}
            <p id = 'demo'> </p>
            <button  id ='checkinbut' className='btn' onClick={checkIn}>Check In</button>
            <button id ='checkoutbut' className='btn' onClick={checkOut}>Check Out</button>

         
        </div>
        

        
        
    )
}
