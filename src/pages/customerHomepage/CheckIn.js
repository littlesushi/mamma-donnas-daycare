// hooks
import { useAuthContext }              from '../../hooks/useAuthContext'
import { projectFirestore, timestamp } from "../../firebase/config";
import { useFirestore }                from '../../hooks/useFirestore'
import { useCollection }               from '../../hooks/useCollection'
import { isDisabled } from '@testing-library/user-event/dist/utils';

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
                
             //Fixed
            }
            
        })



        alert("You are checked-in");
    })

    const all = documents ? documents.filter((p) => {
        
        if(p.status == "in") {
            document.getElementById('buttoncheckIn').disabled = true;
            document.getElementById('buttoncheckOut').disabled = false;
            return true;
            // alert('You are checked in ALREADY');
        }
    }) : null

    
    return (
        <div>
            <h2>Check Your child In and Out</h2>
            <button id = 'buttoncheckIn' className='btn' onClick={() => checkIn()}>Check In</button>
            
            {error && <span>{error}</span>}
        </div>
    )
}