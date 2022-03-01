// libraries
import { useAuthContext } from '../../hooks/useAuthContext'
import { projectFirestore } from "../../firebase/config";

// styles
// import './CustomerHomepage.module.css'


export default function BillingPage() {
    const { authIsReady, user } = useAuthContext() 
    var days = 0;

    projectFirestore.collection("AttendanceLog").onSnapshot(snapshot => {
        console.log(`Received doc snapshot: ${snapshot}`);
        days++;
        // snapshot.forEach(doc => {
        //     console.log(doc.id, '=>', doc.data());
        // });
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
        
    return (
        <div>
            <h2>Your Dues:</h2>
            <h1>{days}</h1>
            <div classname="subtext">Due Dec 31 2021</div>
            
            <button className="btn">
                Pay Now
            </button>

            <div>Unpaid Days</div>
            <div>Paid Days</div>
        </div>
    )
}