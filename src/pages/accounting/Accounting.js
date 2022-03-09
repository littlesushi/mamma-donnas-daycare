import styles from "./accounting.module.css";
import TransactionList from "./transactionList";
import { useCollection } from "../../hooks/useCollection";
import { useState } from "react";

export default function Accounting(){

    const [query, setQuery] = useState('')

    const { documents, error } = useCollection('Transactions');
    
    return(
        <div>
            <h1>
                Accounting
            </h1>
           <input onChange={(e) => setQuery(e.target.value)} style = {{maxWidth: 500, left: 100}} placeholder = "Search By Name">
               
           </input>
           <TransactionList transaction = {documents} search = {query}> </TransactionList>
           
        </div>
    )
}