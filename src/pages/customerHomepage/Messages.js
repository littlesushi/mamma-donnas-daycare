// This is a component that will only appear inside customer home

// styles
import "./Messages.css";

// libraries
import { useEffect, useState } from "react";
import { projectFirestore }    from "../../firebase/config";
import { useAuthContext }      from '../../hooks/useAuthContext'
import { useCollection }       from "../../hooks/useCollection";
import { useFirestore }        from "../../hooks/useFirestore"

// context
import SendMessage from './sendDonnaMessage'

export default function Messages() {

	const [announcements, setAnnouncements] = useState([]);
    const [error, setError]                 = useState(null);
    const [subject, setSubject ]            = useState('')
    const [ to, setTo ]                     = useState('')
    const [ sendFlag, setSendFlag ]         = useState(false)

    const { authIsReady, user }        = useAuthContext() 
    const { documents, error3 }        = useCollection('messages');
    const { deleteDocument, response } = useFirestore('messages')

    // messages from Donna
    const fromDonna = documents ? documents.filter((p) => {
        
        if(p.to === user.uid) {
            
            return true
        }
    }) : null

    // messages sent to Donna
    const toDonna = documents ? documents.filter((p) => {
        if(p.from === user.uid) {
            
            return true
        }
    }) : null

	useEffect(() => {
        
        //Request snapshot of annoucements
		const unsub = projectFirestore.collection("Announcements").orderBy('timeStamp', 'desc').onSnapshot(
			(snapshot) => {
				if (!snapshot.empty) {
                    let results = [];
					snapshot.docs.forEach((doc) => {
						results.push({ ...doc.data() });
					});
                    //console.log("results size: " +results.length)
					setAnnouncements(results);
                    setError(null);
				}
                else{
                    setError("No new announcements");
                }
			}, (err) => {setError(err.message)});
            
        //Stop unsubscribe from snapshot updates when navigating away from this page
        return () => unsub()
	}, []);

    const handleSubmit = async (id) => {
        deleteDocument(id)
    }
   
    const handleClick = () => {
        setSendFlag(true)
    }
   
	return (
        <div>
        {sendFlag && <SendMessage />}
               {!sendFlag && <div className="announcements-container">
                    <h2>Announcements</h2>
                    
                    {!error && announcements && announcements.length > 0 && (announcements.map((annoucement) => (
                        <div className="announcement-container">
                            <h3>
                                {annoucement.title}
                            </h3>
                            <p>{annoucement.date}</p>
                            <p style={{marginTop: '0.5rem', marginBottom: '0.5rem'}}>{annoucement.body}</p>
                        </div>
                    )))}

                    {error && (
                        <h3>No new announcements</h3>
                    )}
                    <h2>Messages from Donna:</h2>
                    {fromDonna && fromDonna.map(documents => (
                        <div key={documents.id} className="announcement-container">
                            
                            <span><h3>Subject:</h3> {documents.title}</span>
                            
                            <div><h3>Body:</h3> {documents.body}</div> 
                            <div>
                                <button className='btn' onClick={() =>{handleSubmit(documents.id)}}>Delete</button>
                            </div>  
                        </div>
                    ))}  
                    { toDonna && <h2>Messages to Donna:</h2>}
                    <div>
                        <button className='btn' onClick={() =>{handleClick()}}>Send Donna A Message</button>
                    </div>
                    {toDonna && toDonna.map(documents => (
                        <div key={documents.id} className="announcement-container">
                            
                            <div><h3>Subject:</h3> {documents.title}</div>
                            
                            <div><h3>Body:</h3> {documents.body}</div>   
                            <div>
                                <button className='btn' onClick={() =>{handleSubmit(documents.id)}}>Delete</button>
                            </div>
                        </div>
                    ))}  
                </div>}
        </div>
    );
}
