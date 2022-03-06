// libraries
import { useCollection } from "../../hooks/useCollection";

// components
import Avatar from '../../components/Avatar'

// styles
import './Display.css'

export default function DisplayOnSite() {
    const { documents, error } = useCollection('guardianinfo');

    //  The filter is needed to slow things down and wait for documents to load
    const all = documents ? documents.filter((p) => {
        
        if(p.status == "in") {
            return true
        }
    }) : null

    return(
        <div className="user-list">
            <h1>Students On Prem!</h1>
            {all && all.map(student => (
                <div key={student.id} className="user-list-item">
                    <span>{student.childFirstName}</span>
                    <Avatar src={student.photoUrl} />
                </div>
            ))}
        </div>
    )
}