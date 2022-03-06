// libraries
import { useCollection } from "../../hooks/useCollection";
import { useState } from "react";

// components
import Avatar from '../../components/Avatar'

export default function DisplayBreathing() {
    const { documents, error } = useCollection('guardianinfo');
    
    //  The filter is used to filter by age
    const all = documents ? documents.filter((p) => {
        
        if( (p.breathingCheck == 'yes' | p.breathingCheck == 'Yes' | p.breathingCheck == 'YES') && p.status == 'in')  {
            return true
        }
    }) : null

    return(
        <div className="user-list">
            <h1>Breathing Checks!</h1>

            {all && all.map(student => (
                <div key={student.id} className="user-list-item">
                    <span>{student.childFirstName}</span>
                    <Avatar src={student.photoUrl} />
                </div>
            ))}
        </div>
    )
}