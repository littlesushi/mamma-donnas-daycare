import styles from './accounting.module.css'
import { useState } from 'react'
import { timestamp } from '../../../firebase/config';

function createRow(item, time){
    var amountEntry = typeof(item.Amount) == 'string' ? item.Amount : String(item.Amount)
    var isExpense = amountEntry.startsWith("-")
    
    return (
        <tr className = { styles.row}> 
            <td className = {styles.cell} >
                {(time.getMonth() + 1 )+ '/' + time.getDate() + '/' + time.getFullYear()}
            </td>
            <td className = {styles.cell} >
                {item.Description}
            </td>
            <td className= {styles.cell}>
                {isExpense?  'Expense' : 'Income'}
            </td>
            <td className = {styles.cell}>
                {item.Name}
            </td>
            <td className = { isExpense ? styles.cellExpense : styles.cell}>
                {isExpense  ? "-$" + amountEntry.substring(1):  '$' + amountEntry}
            </td>
        </tr>);
}
export default function TransactionList({transaction, search,searchMode, startDateQuery, endDateQuery}){
    var total = 0
    var [sortDate, setSortDate] = useState('1') // 1 = for Ascending Order, -1 for Descending Order
    var [sortDescription, setSortDescription] = useState('1')
    var [sortName, setSortName] = useState('1')
    var [sortAmount, setSortAmount] = useState('1')
    var dateQuery = false
    
    
    if(transaction != null){
        total = ( transaction.reduce((total,currentItem) => total = total + parseFloat(currentItem.Amount), 0)).toFixed(2);
    }
   
    if(!transaction ){
        return (null)
    }
    function sortTable(compare,key){
        transaction.sort((a,b) =>{ 
            if(a[key]<b[key]){ 
                return compare * 1
            }
            if(a[key]> b[key]){
                return compare * -1
            }
            return 0
        })
    }
    
     return (
         <div> 
              <h2 style = {{fontSize: 45}}>
         Total = ${total}
     </h2>
     <table className = {styles.table} > 
    
     <tr>
     <th className={styles.header} >Date <button onClick = {() => {sortTable(sortDate,'Date')  ; setSortDate(sortDate*-1)} }>  {sortDate == 1 ? "∧": "V"} </button></th>
     <th className={styles.header} >Description <button onClick = {() => {sortTable(sortDescription,'Description')  ; setSortDescription(sortDescription*-1)} }>  {sortDescription == 1 ? "∧": "V"} </button></th>
     <th className={styles.header}> Category</th>
     <th className={styles.header}> Name<button onClick = {() => {sortTable(sortName,'Name')  ; setSortName(sortName*-1)} }>  {sortName == 1 ? "∧": "V"} </button></th>
     <th className={styles.header}> Amount<button onClick = {() => {sortTable(sortAmount,'Amount')  ; setSortAmount(sortAmount*-1)} }>  {sortAmount == 1 ? "∧": "V"} </button></th>
     </tr>
     
    
    {transaction != null ? transaction.map((entry)=>{
           dateQuery = (!(isNaN(startDateQuery)) && !(startDateQuery == '')) &&   (!(isNaN(endDateQuery)) && !(endDateQuery == ''))
           var timeStamp = new Date(entry.Date.seconds * 1000 )

          
           if(entry[searchMode].match(search)  && !(dateQuery)){
                return(createRow(entry,timeStamp))
           }
           
           if(entry[searchMode].match(search)  && (dateQuery)){
               if( startDateQuery<= timeStamp && timeStamp<= endDateQuery){
                return(createRow(entry,timeStamp))
               }
            }
    }): false}

    </table>
    </div>)

}