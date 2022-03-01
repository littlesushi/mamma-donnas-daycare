// This is a component that will only appear inside customer home

// libraries
import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { projectFirestore } from "../../firebase/config";


export default function StudentCheckInOut({ uid }) {
    // state
    const [inOut, setInOut]   = useState(false)
    const [status, setStatus] = useState('')
    const [error, setError]   = useState('')
    const [inBool, setInBool]   = useState(false)
    const [outBool, setOutBool]   = useState(false)

    const { addDocument, response } = useFirestore('AttendanceLog')
    
    // function to record child's status
    const checkInOut = async (e) => {
        e.preventDefault()

        if(inOut === false) {
            setInOut(true)
            setStatus('Checked In')
            setInBool(true)
            setOutBool(false)
            // This code will keep the guardianinfo collection up to date with who is checked in
            const pullGuardianInfo = projectFirestore.collection("guardianinfo").onSnapshot( // pull a snapshot
                (snapshot) => {
                if (snapshot.empty) {
                    setError("No documents found");
                    
                } else {
                    let results = [];
                    snapshot.docs.forEach((doc) => {
                    results.push({ id: doc.id, ...doc.data() });
                    });
        
                    // search through to find the doc id I need then capture the id of the appropriate doc
                    results.map((result) => {
                        if(result.uid == uid) {
                            projectFirestore.collection('guardianinfo').doc(result.id).update({
                                in: inBool,
                                out: outBool
                            })
                        }
                    })
                    setError(null);
                }
                },
                (error) => {
                setError(error.message);
                }
            );
        } else if(inOut == true) {
            setInOut(false)
            setStatus('Checked Out')
            setInBool(false)
            setOutBool(true)

            // This code will keep the guardianinfo collection up to date with who is checked in
            const pullGuardianInfo = projectFirestore.collection("guardianinfo").onSnapshot( // pull a snapshot
                (snapshot) => {
                if (snapshot.empty) {
                    setError("No documents found");
                    
                } else {
                    let results2 = [];
                    snapshot.docs.forEach((doc) => {
                    results2.push({ id: doc.id, ...doc.data() });
                    });
        
                    //search through to find the doc id I need then capture the id of the appropriate doc
                    results2.map((result2) => {
                        if(result2.uid == uid) {
                            projectFirestore.collection('guardianinfo').doc(result2.id).update({
                                in: inBool,
                                out: outBool
                            })
                        }
                    })
                    setError(null);
                }
                },
                (error) => {
                setError(error.message);
                }
            );
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

// // This is a component that will only appear inside customer home

// // libraries
// import { useState, useEffect } from 'react'
// import { useFirestore } from '../../hooks/useFirestore'
// import { useCollection } from '../../hooks/useCollection'
// import { projectFirestore } from "../../firebase/config";



// export default function StudentCheckInOut({ uid }) {

//     // state
//     const [inOut, setInOut]   = useState(false)
//     const [status, setStatus] = useState('')
//     const [error, setError]   = useState('')
//     const [docId, setDocId]   = useState('') // used to hold the doc id of the document to update status

//     const { addDocument, response }     = useFirestore('AttendanceLog')
//     const { updateDocument, response2 } = useFirestore('guardianinfo') //////////
    
    
//     // function to record child's status
//     const checkIn = async (e) => {
//         e.preventDefault()

//         if(inOut === false) {
//             setInOut(true)
//             setStatus('Checked In')
//             //document.getElementById("checkinbut").disabled = true;
//             //document.getElementById("checkoutbut").disabled = false;
//         }
//         //console.log("The status of user id is: " + uid)
//         var today = new Date();
//         var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
//         document.getElementById("demo").innerHTML = time;
//         //Send the data to the collection in the backend
//         addDocument({
//             uid,
//             status
//         })

//         // This code will keep the guardianinfo collection up to date with who is checked in
//         const pullGuardianInfo = projectFirestore.collection("guardianinfo").onSnapshot( // pull a snapshot
//             (snapshot) => {
//               if (snapshot.empty) {
//                 setError("No documents found");
                
//               } else {
//                 let results = [];
//                 snapshot.docs.forEach((doc) => {
//                   results.push({ id: doc.id, ...doc.data() });
//                 });
      
//                 // search through to find the doc id I need then capture the id of the appropriate doc
//                 results.map((result) => {
//                     if(result.uid == uid) {
//                         projectFirestore.collection('guardianinfo').doc(result.id).update({
//                             status: 'Checked In'

//                         })
//                     }
//                 })
//                 setError(null);
//               }
//             },
//             (error) => {
//               setError(error.message);
//             }
//           );
//     }

//     const checkOut = async (e) => {
//         e.preventDefault()

//         if(inOut === true) {
//             setInOut(false)
//             setStatus('Checked Out')
//             //document.getElementById("checkinbut").disabled = false;
//             //document.getElementById("checkoutbut").disabled = true;


//         }
//         console.log("The status of user id is: " + uid)
//         var today = new Date();
//         var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
//         document.getElementById("demo").innerHTML = time;
//         //Send the data to the collection in the backend
//         addDocument({
//             uid,
//             status
//         })

//         // This code will keep the guardianinfo collection up to date with who is checked in
//         const pullGuardianInfo = projectFirestore.collection("guardianinfo").onSnapshot( // pull a snapshot
//             (snapshot) => {
//               if (snapshot.empty) {
//                 setError("No documents found");
                
//               } else {
//                 let results = [];
//                 snapshot.docs.forEach((doc) => {
//                   results.push({ id: doc.id, ...doc.data() });
//                 });
      
//                 // search through to find the doc id I need then capture the id of the appropriate doc
//                 results.map((result) => {
//                     if(result.uid == uid) {
//                         projectFirestore.collection('guardianinfo').doc(result.id).update({
//                             status: 'Checked Out'
                            
//                         })
//                     }
//                 })
//                 setError(null);
//               }
//             },
//             (error) => {
//               setError(error.message);
//             }
//           );
        
//     }

//     // fires when this component is first called and when the response state changes
//     // this will be used to clear the text inputs after a successful add to the database operation
//     useEffect(() => {
//         if(response.success) {

//             console.log(response)
//         } 
//     }, [response.success])

//     return (
//         <div>
//             <h2>Check Your child In and Out</h2>
//             { !inOut && <p>Your child is currently checked out</p>}
            
//             { inOut && <p>Your child is currently checked in</p>}
//             <p id = 'demo'> </p>
//             <button  id ='checkinbut' className='btn' onClick={checkIn}>Check In</button>
//             <button id ='checkoutbut' className='btn' onClick={checkOut}>Check Out</button>

         
//         </div>
        

        
        
//     )
// }
