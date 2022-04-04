import styles from "./accounting.module.css";
import TransactionList from "./transactionList";
import {useCollection} from "../../../hooks/useCollection"
import { useState } from "react";
import './Accounting.css'

function convertDateToEpoch(date){
    var splittedDate = date.split('-')
    var query =  new Date()
    query.setYear(splittedDate[0])
    query.setMonth(splittedDate[1]-1)
    query.setDate(splittedDate[2])
    return query
}
export default function Accounting(){

    const [query, setQuery] = useState('')
    const [queryMode, setQueryMode] = useState('Name')
    const { documents, error } = useCollection('Transactions')
    const [startDate, setStartDate]  = useState('')
    const [endDate, setEndDate]  = useState('')



    return(
        <div>
            <h1>
                Accounting
            </h1> 
    
           <div className="Accounting">
               <nav>
                    <p>Search by:</p>
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

           <input onChange={(e) => setQuery(e.target.value)} style = {{maxWidth: '30%', marginBottom: 20, fontSize: '1.5em'}} placeholder = {"Search By " + queryMode + '...'}/>

           <div style = {{justifyItems :"center"}}> 
                <label style={{margin: 10, fontSize: '1.5em'}}> Start Date </label>
                <input type = 'date'  style={{ fontSize: '1.5em', width : '30%'}} onChange ={(input) => { var data = convertDateToEpoch(input.target.value); data.setHours(0,0,0,0); setStartDate(data); }}  /> 
                <label style={{margin: 10, fontSize: '1.5em'}} > End Date: </label>
                <input type = 'date' style={{fontSize: '1.5em', width: '30%'}} onChange ={(input) => {var data = convertDateToEpoch(input.target.value); data.setHours(23,59,59,999); setEndDate(data);}}/>
                
           </div>
           <TransactionList transaction = {documents} search = {query} searchMode = {queryMode} startDateQuery = {startDate} endDateQuery = {endDate}/> 
        </div>
    )
}