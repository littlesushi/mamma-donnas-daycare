// Used to send messages to Donna from customers

// libraries
import { React, useState, useEffect } from "react";
import { timestamp }                  from "../../firebase/config"
import { useFirestore }               from "../../hooks/useFirestore"
import { useNavigate }                from 'react-router-dom'
import { useAuthContext }             from "../../hooks/useAuthContext";
import { useCollection }              from "../../hooks/useCollection";

export default function SendDonnaMessage(  ) { 
    const [title, setTitle]           = useState(null);
	const [body, setBody]             = useState(null);
 
    
    const { addDocument, response } = useFirestore('messages')
    const { documents, error }      = useCollection('users');
    const navigate                  = useNavigate()
    const { user, authIsReady }     = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const sendDoc = async (uid) => {
            const messageToAdd = {
                title: title,
                body: body,
                createdAt: new Date(),
                id: Math.random(),
                to: uid,
                from: user.uid
            }
    
            await addDocument(messageToAdd)  // add the message to the message collection
        }
        let flag = 1;
        // find all of the admins and send in the message
        documents ? documents.map((p) => {
            if(p.role === 'admin' && flag) {
                flag = 0;
                sendDoc(p.uid)
            }
        }) : null

        navigate(-1)
    }

    
    return (
        <div>
            <form >
                <input
                    placeholder="Subject"
                    type="text"
                    className="title-input"
                    onChange={(e) => setTitle(e.target.value)}
                    >
                        
                </input>

            </form>

            <textarea
					className="text-area"
					id="announcement-body-text"
					placeholder="Message Body"
					rows={12}
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>
            <div>
					<button className="btn" onClick={(e) => handleSubmit(e)}>
						Send Message
					</button>
				</div>
        </div>
    )
}