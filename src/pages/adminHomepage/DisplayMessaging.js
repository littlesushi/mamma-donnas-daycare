// libraries
import { useCollection } from "../../hooks/useCollection";

// components
import Avatar from '../../components/Avatar'

// styles
import './Display.css'

export default function DisplayMessaging() {
    const { documents, error } = useCollection('guardianinfo');

    //  The filter is needed to slow things down and wait for documents to load
    const all = documents ? documents.filter((p) => {
        
        if(p.uid) {
            return true
        }
    }) : null

    const handleSubmit = (id) =>{
        //Added handleSubmit() method here as line 33 called this method without this method being declared.
    }

    return(
        <div >
            <h1>Send Messages!</h1>
            {all && all.map(student => (
                <div key={student.id} className="user-list-item">
                    <span>{student.childFirstName}</span>
                    <Avatar src={student.photoUrl} />
                    <div>
                        <button className='btn' onClick={() =>{handleSubmit(student.uid)}}>Send a Message</button>
                    </div>
                </div>
            ))}
        </div>
    )
}