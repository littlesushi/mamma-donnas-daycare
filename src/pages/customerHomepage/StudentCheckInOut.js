// This is a component that will only appear inside customer home

// libraries
// import { useState, useEffect }         from 'react'
// import { useFirestore }                from '../../hooks/useFirestore'
// import { useCollection }               from '../../hooks/useCollection'
// import { projectFirestore, timestamp } from "../../firebase/config"

// hooks
// import { useAuthContext } from '../../hooks/useAuthContext'

// components
import CheckIn  from "./CheckIn"
import CheckOut from "./CheckOut"


export default function StudentCheckInOut() {
    // const { user }                  = useAuthContext() 
    // const { documents, error}       = useCollection('guardianinfo')
   
    // const handle = async () => {
    //     const students = await documents.map((student) => {
    //         if(user.uid == student.uid) {
    //             setChildName(student.childFirstName)
    //             if(student.status == "in") {
    //                 setInOut(true)
    //             }
    //             else {
    //                 setInOut(false)
    //             }
    //         }
    //     })
    // }

    return (
        <div>
            {/* <h2>Check Your child In and Out</h2> */}
            {/* { !inOut && <p>{childName} is currently checked out</p>}
            { inOut && <p>{childName} is currently checked in</p>} */}
            < CheckIn  />
            < CheckOut />
        </div>
    )
}