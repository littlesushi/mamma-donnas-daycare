import styles from './accounting.module.css'
import { useState } from 'react'

export default function TransactionList({transaction, search,searchMode}){
    var total = 0
    var [sortDate, setSortDate] = useState('1') // 1 = for Ascending Order, -1 for Descending Order
    var [sortDescription, setSortDescription] = useState('1')
    var [sortName, setSortName] = useState('1')
    var [sortAmount, setSortAmount] = useState('1')

    if(transaction != null){
        total = ( transaction.reduce((total,currentItem) => total = total + parseFloat(currentItem.Amount), 0)).toFixed(2);
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
     
    
    {transaction != null ? transaction.map((item)=>{
           
           if(item[searchMode].match(search)){
                var timeStamp = new Date(item.Date.seconds * 1000 )
                var isExpense = item.Amount.startsWith("-")
            return (
            <tr className = { styles.row}> 
                <td className = {styles.cell} >
                    {timeStamp.getMonth() + '/' + timeStamp.getDate() + '/' + timeStamp.getFullYear()}
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
                    {isExpense  ? "-$" + item.Amount.substring(1):  '$' + item.Amount}
                </td>
    
            </tr>)
           }

    }): false}
    </table>
    </div>)

}