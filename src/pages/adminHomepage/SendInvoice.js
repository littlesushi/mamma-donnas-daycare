// libraries
import { React, useState } from "react";
import { useFirestore }               from "../../hooks/useFirestore"

import { useCollection } from "../../hooks/useCollection";

import Avatar from '../../components/Avatar'

export default function DisplayInvoice() {

    const [amount, setAmount] = useState(null);

    const { documents, error } = useCollection('guardianinfo');
    const { addDocument, response } = useFirestore('invoices')
    
    //  The filter is needed to slow things down and wait for documents to load
    const all = documents ? documents.filter((p) => {
        
        if(p.uid) {
            return true
        }
    }) : null

    const handleSubmit = async (amount, student) => {
        const addInvoice = {
            amount: parseInt(amount),
            uid: student.uid
        }

        await addDocument(addInvoice)
    }
    
    return(
        <div >
            <h1>Send Invoice</h1>
            {all && all.map(student => (
                
                    <div key={student.id} className="user-list-item">
                        <span>{student.childFirstName}</span>
                        <Avatar src={student.photoUrl} />
                        <div>
                            <form>
                                <input
                                    placeholder="Amount"
                                    type="number"
                                    className="title-input"
                                    onChange={e => setAmount(e.target.value)}
                                />
                            </form>
                            <button className='btn' onClick={() =>{handleSubmit(amount, student)}}>Send Bill</button>
                        </div>
                    </div>
            
            ))} 
                    
        </div>
    )
}