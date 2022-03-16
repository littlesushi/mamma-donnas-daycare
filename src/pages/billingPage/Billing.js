// libraries
import { useAuthContext } from '../../hooks/useAuthContext'
import { projectFirestore } from "../../firebase/config";
import { useFirestore } from '../../hooks/useFirestore'
import { useCollection } from "../../hooks/useCollection";
import FetchBilling from "./FetchBilling";
// import { collection, query, limit, where } from "firebase/firestore";
import { firestore } from "firebase";

// styles
// import './CustomerHomepage.module.css'


export default function BillingPage() {
    var dues = 0;
    const { authIsReady, user } = useAuthContext()
    const { documents, error } = useCollection("AttendanceLog");
        
    return (
        <div>
            <h2>Total Dues:</h2>
            <h1>${dues}</h1>
            <div classname="subtext">Due Dec 31 2021</div>
            
            <button className="btn">
                Pay Now
            </button>
            <hr class="solid"/>

            <FetchBilling collection={documents} uid={user.uid}/>
        </div>
    )
}