// hooks
import { useAuthContext }              from '../../hooks/useAuthContext'
import { projectFirestore, timestamp } from "../../firebase/config";
import { useFirestore }                from '../../hooks/useFirestore'
import { useCollection }               from '../../hooks/useCollection'

export default function StudentCheckInOut({  }) {
    const { user }                  = useAuthContext() 
    const { addDocument, response } = useFirestore('AttendanceLog')
    const { documents, error}       = useCollection('guardianinfo')

    const checkIn = (() => {

        const students = documents.map((student) => {
            if(user.uid == student.uid) {
                projectFirestore.collection('guardianinfo').doc(student.id).update({
                    status: 'in'
                })

                addDocument({
                    uid: user.uid,
                    status: 'in',
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
            <button className='btn' onClick={() => checkIn()}>Check In</button>
            {error && <span>{error}</span>}
        </div>
    )
}