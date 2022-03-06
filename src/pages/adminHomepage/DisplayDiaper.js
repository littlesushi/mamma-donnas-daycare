// libraries
import { useCollection } from "../../hooks/useCollection";
import { timestamp }     from "../../firebase/config";
import { useFirestore }  from '../../hooks/useFirestore'

import { useNavigate } from 'react-router-dom'
import { useState }    from 'react'

// components
import Avatar from '../../components/Avatar'

// styles
import './Display.css'

export default function DisplayDiaper() {
    const [lastChange, setLastChange]  = useState('')
    const { documents, error }         = useCollection('guardianinfo');
    const { updateDocument, response } = useFirestore('guardianInfo')
    const { addDocument, response2 }   = useFirestore('DiaperLog')
    const navigate                     = useNavigate()

    // filter out the collection that does not have diapers
    const all = documents ? documents.filter((p) => {
        
        if((p.diaper == 'yes' | p.diaper == 'Yes' | p.breathingCheck == 'YES') && p.status == 'in') {
            return true
        }
    }) : null

    const handleSubmit = async (uid) => {
        let timeOfChange = timestamp.fromDate(new Date())
        const students = all.map((s) => {
            if(uid == s.uid) {
               addDocument({
                    uid: uid,
                    diaperChangedAt: timestamp.fromDate(new Date()),
                    childFirstName: s.childFirstName,
                    childLastName: s.childLastName,
                    guardianFirstName1: s.guardianFirstName1,
                    guardianLastName1: s.guardianLastName1,
                    guardianPhone1: s.guardianPhone1,
                    })
                // The update is not working for some reason
                updateDocument(s.id, {lastDiaperChange: timeOfChange})
            }
        })
        
    } 

    return(
        
            <div >
            <h1>Diapers!</h1>

            {all && all.map(student => (
                <div key={student.id} className="user-list-item">
                    <span>{student.childFirstName}</span>
                    <Avatar src={student.photoUrl} />
                    {/* <p>Last diaper change at: {all.lastDiaperChange}</p> */}
                    <div>
                        <button className='btn' onClick={() =>{handleSubmit(student.uid)}}>Diaper Change</button>
                    </div>
                    
                </div>
            ))}
            </div>

        
    )
}