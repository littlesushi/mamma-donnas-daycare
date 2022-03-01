import styles from "./accounting.module.css";
import TransactionList from "./transactionList";
import { useCollection } from "../../hooks/useCollection";

export default function Accounting(){

    const { documents, error } = useCollection('Transactions');
    return(
        <div>
            <h1>
                Accounting
            </h1>
            <TransactionList transaction={documents}/>
        </div>
    )
}