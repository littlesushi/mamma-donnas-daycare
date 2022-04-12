// libraries
import { useCollection }  from "../../hooks/useCollection";
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore }   from "../../hooks/useFirestore"

// styles -reusing styles in the customerHomepage folder
import "./Display.css";

export default function DisplayEachMessage(uid) {
    const { documents, error }         = useCollection('messages');
    const { authIsReady, user }        = useAuthContext() 
    const { deleteDocument, response } = useFirestore('messages')

    const {id} = uid

    // messages sent to Donna
    const toDonna = documents ? documents.filter((p) => {
        if(p.from === id) {
            return true
        }
    }) : null

    // messages from admin
    const fromDonna = documents ? documents.filter((p) => {
        
        if(p.to === id) {
            return true
        }
    }) : null

    const handleSubmit = async (id) => {
        deleteDocument(id)
    }

    return (
        <div className="messages-container">
            {toDonna && toDonna.map(documents => (
                        <div key={documents.id} className="individual-container">
                            <h3>Message from customer</h3>
                            
                            <div><h3>Subject:</h3> {documents.title}</div>
                            
                            <h3>Body:</h3> {documents.body} 
                            <div>
                                <button className='btn' onClick={() =>{handleSubmit(documents.id)}}>Delete</button>
                            </div>
                        </div>
            ))}
            {fromDonna && fromDonna.map(documents => (
                        <div key={documents.id} className="individual-container">
                            <h3>Message from admin</h3>
                            
                            <div><h3>Subject:</h3> {documents.title}</div>
                            
                            <div><h3>Body:</h3> {documents.body}</div> 
                            <div>
                                <button className='btn' onClick={() =>{handleSubmit(documents.id)}}>Delete</button>
                            </div>

                        </div>
            ))} 
            
        </div>
    )
}