// libraries
import { React, useState, useEffect } from "react";
import { timestamp }                  from "../../firebase/config"
import { useFirestore }               from "../../hooks/useFirestore"
import { useNavigate }                from 'react-router-dom'
import { useAuthContext }             from "../../hooks/useAuthContext";

export default function SendMessage( student ) { 
    const [title, setTitle] = useState(null);
	const [body, setBody]   = useState(null);
    
    const { addDocument, response } = useFirestore('messages')
    const navigate                  = useNavigate()
    const { user, authIsReady }     = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
   
        // destructure the object to reach the uid
        const { id } = student

        const messageToAdd = {
            title: title,
            body: body,
            createdAt: new Date(),
            id: Math.random(),
            to: id,
            from: user.uid
        }

        await addDocument(messageToAdd)  // add the message to the message collection

        navigate("/home")
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