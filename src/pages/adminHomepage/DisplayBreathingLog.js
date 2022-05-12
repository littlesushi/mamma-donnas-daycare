// libraries
import { useCollection }       from "../../hooks/useCollection";



export default function DisplayBreathingLog()  {
    const { documents, error } = useCollection('BreathingCheckLog');

    

     //  
     const all = documents ? documents.filter((p) => {
   
            return true
 
    }) : null


    return (
        <div>
            {all && all.map(log => (
                <div key={log.id} className="user-list-item">
                    <h3>Log Entry</h3>
                    <li>Child First Name: {log.childFirstName}</li>
                    <li>Child Last Name: {log.childLastName}</li>
                    <li>{log.createdAt.toDate().toDateString()}</li>
                    <li>{log.createdAt.toDate().toTimeString()}</li>
                </div>
            ))}
        </div>
       
    )
}