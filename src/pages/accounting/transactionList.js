import { useCollection  } from '../../hooks/useCollection'

import styles from './accounting.module.css'


export default function TransactionList({transaction}){
    var total = 0
    if(transaction != null){
        total =  transaction.reduce((total,currentItem) => total = total + parseFloat(currentItem.Amount), 0);
        console.log(total)
    }
    
     return (<ul className={styles.transactions}> 
     <h2>
         Total = ${total}
     </h2>
     <li>
     <p className={styles.name}>Name</p>
     <p className= {styles.amount}> Amount</p>
     </li>
     
    
    {transaction != null ? transaction.map((item)=>(
             <li key ={item["User UIDD"]}>
                 <p className={styles.name}>
                    {item.Name}
                 </p>
                 <p className= {styles.amount}>
                    ${item.Amount}
                 </p>
            </li>
         )): false}
    </ul>)
}