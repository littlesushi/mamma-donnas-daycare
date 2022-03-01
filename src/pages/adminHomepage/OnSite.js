// libraries
import { useCollection } from "../../hooks/useCollection";

export default function OnSite() {
    const { documents, error } = useCollection('AttendanceLog');
    const { users, error2 } = useCollection('users');

    const present = documents ? documents.filter((p) => {
        
        if(p.status == "Checked In") {
            console.log("It's working!")
            return true
        }
    }) : null

    return(
        <div>
            <h1>On site Test!</h1>

            {present && present.map(student => (
                <div key={student.id}>
                    <span>{student.id}</span>
                    {/* <Avatar src={user.photoUrl} /> */}
                </div>
            ))}
        </div>
       

        
    )
}