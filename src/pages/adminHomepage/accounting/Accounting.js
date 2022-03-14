import styles from "./accounting.module.css";
import TransactionList from "./transactionList";
import {useCollection} from "../../../hooks/useCollection"
import { useState } from "react";
import './Accounting.css'
export default function Accounting(){

    const [query, setQuery] = useState('')

    const [queryMode, setQueryMode] = useState('Name')
    const { documents, error } = useCollection('Transactions');
    return(
        <div>
            <h1>
                Accounting
            </h1>
           <input onChange={(e) => setQuery(e.target.value)} style = {{maxWidth: 500, left: 100}} placeholder = {"Search By " + queryMode}/>
           <div className="Accounting">
               <nav>
            <p>Filter by:</p>
            <button onClick={() => setQueryMode('Name')} className={queryMode === 'Name' ? 'active' : ''} >
                Name
            </button>
            <button onClick={() => setQueryMode('Description')} className={queryMode === 'Description' ? 'active' : ''}>
                Description
            </button>
            <button onClick={() => setQueryMode('Amount')} className={queryMode === 'Amount' ? 'active' : ''}>
                Amount
            </button>
            </nav>
           </div>
           <TransactionList transaction = {documents} search = {query} searchMode = {queryMode}/> 
           
        </div>
    )
}