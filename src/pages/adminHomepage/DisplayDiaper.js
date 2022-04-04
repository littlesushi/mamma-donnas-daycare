// libraries
import { useCollection } from "../../hooks/useCollection";
import { timestamp }     from "../../firebase/config";
import { useFirestore }  from '../../hooks/useFirestore'
import { useState }      from 'react'

// components
import Avatar from '../../components/Avatar'

// styles
import './Display.css'

export default function DisplayDiaper() {
    const { documents, error }         = useCollection('guardianinfo');
    const { updateDocument, response } = useFirestore('guardianinfo')
    const { addDocument, response2 }   = useFirestore('DiaperLog')

    // filter out the collection that does not have diapers
    const all = documents ? documents.filter((p) => {
        if((p.diaper == 'yes' | p.diaper == 'Yes' | p.diaper == 'YES') && p.status == 'in') {
            return true
        }
    }) : null

    const handleSubmit = async (uid) => {
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
                updateDocument(s.id, {diaperChangedAt: timestamp.fromDate(new Date())})
                alert("Diaper change has been logged for: " + s.childFirstName)
            }
        }) 
    } 

    return(
            <div >
            <h1>Diaper Change</h1>
            {all && all.map(student => (
                <div key={student.id} className="user-list-item">
                    <span>{student.childFirstName}</span>
                    <Avatar src={student.photoUrl} />
                    <div>
                        <button className='btn' onClick={() =>{handleSubmit(student.uid)}}>Diaper Change</button>
                    </div>
                    
                </div>
            ))}
            </div>
    )
}