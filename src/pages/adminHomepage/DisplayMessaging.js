// libraries
import { useCollection } from "../../hooks/useCollection";
import { useState }      from "react";

// components
import Avatar from '../../components/Avatar'
import Display from './displayEachMessage'

// styles
import './Display.css'

// context
import SendMessage from './SendMessage'

export default function DisplayMessaging() {
    const [ sendMessage, SetSendMessage ] = useState(false)
    const [ msgid, setmsgid ]             = useState(null)

    const { documents, error } = useCollection('guardianinfo');
    
    //  The filter is needed to slow things down and wait for documents to load
    const all = documents ? documents.filter((p) => {
        
        if(p.uid) {
            return true
        }
    }) : null

    const handleSubmit = async (student) => {
        // Flag to navigate to sendMessage
        SetSendMessage(true)
        setmsgid(student.uid) 
    }
    
    return(
        <div >
            <h1>Send Messages!</h1>
            {sendMessage && <SendMessage id={msgid}/>}
            {!sendMessage && all && all.map(student => (
                
                
                    <div key={student.id} className="user-list-item">
                        <Display id={student.uid}/>
                        <span>{student.childFirstName}</span>
                        <Avatar src={student.photoUrl} />
                        <div>
                            <button className='btn' onClick={() =>{handleSubmit(student)}}>Send a Message</button>
                        </div>
                    </div>
            
            ))} 
                    
        </div>
    )
}