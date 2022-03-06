// hooks
import { useAuthContext }              from '../../hooks/useAuthContext'
import { projectFirestore, timestamp } from "../../firebase/config";
import { useFirestore }                from '../../hooks/useFirestore'
import { useCollection }               from '../../hooks/useCollection'

export default function CheckOut( ) {
    const { user }                  = useAuthContext() 
    const { addDocument, response } = useFirestore('AttendanceLog')
    const { documents, error}       = useCollection('guardianinfo')
    
    const checkOut = (() => {

        const students = documents.map((student) => {
            if(user.uid == student.uid) {
                projectFirestore.collection('guardianinfo').doc(student.id).update({
                    status: 'out'
                })

                addDocument({
                    uid: user.uid,
                    status: 'out',
                    checkedIn: timestamp.fromDate(new Date()),
                    childFirstName: student.childFirstName,
                    childLastName: student.childLastName,
                    guardianFirstName1: student.guardianFirstName1,
                    guardianLastName1: student.guardianLastName1,
                    guardianPhone1: student.guardianPhone1,
                    })
            }
            
        })
    })
  
    return (
        <div>
            <button className='btn' onClick={() => checkOut()}>Check Out</button>
            {error && <span>{error}</span>}
        </div>
    )
}