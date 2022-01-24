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
    const checkInOut = async (e) => {
        e.preventDefault()

        if(inOut === false) {
            setInOut(true)
            setStatus('Checked In')
        } else if(inOut == true) {
            setInOut(false)
            setStatus('Checked Out')
        }
        console.log("The status of user id is: " + uid)

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
            <button className='btn' onClick={checkInOut}>Check In/Out</button>
        </div>
    )
}
