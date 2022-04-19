// libraries
import { useAuthContext } from '../../hooks/useAuthContext'
import { projectFirestore } from "../../firebase/config";
import { useFirestore } from '../../hooks/useFirestore'
import { useCollection } from "../../hooks/useCollection";
import FetchBilling from "./FetchBilling";
import React, { useState} from 'react'
import PayPal from '../../components/PayPal';
// import { collection, query, limit, where } from "firebase/firestore";
import { firestore } from "firebase";

// styles
// import './CustomerHomepage.module.css'


export default function BillingPage() {
    var dues = 0;
    const { authIsReady, user } = useAuthContext()
    const { documents, error } = useCollection("invoices");
    const {test, errors} =  useCollection('invoices', "'uid','=='," + "'" + user.uid + "'");
    const [checkout, setCheckOut] = useState(false);
    var results = []
    var total = 0
    if (documents) {
        total = 0
        documents.forEach(entry =>{
            if (entry.uid.match(user.uid)){
                results.push(entry)
                total = total + entry.amount
            }
        })
    }
    return (
        <div>
            <h2>Total Dues:</h2>
            <h1>${total}</h1>
            <div classname="subtext">Due Dec 31 2021</div>
            
            {checkout ? (
                <PayPal />
            ) : (
              <button className="btn"
                onClick={() => {
                    setCheckOut(true);
                }}
              >
                Pay    
            </button>
            )}
            <hr class="solid"/>
            <FetchBilling collection={results}/> 
        </div>
    )
}

