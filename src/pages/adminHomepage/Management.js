import { useCollection } from '../../hooks/useCollection';
import React from 'react';
import { Link } from "react-router-dom"  
import { useFirestore } from "../../hooks/useFirestore";
import { projectStorage, projectFirestore } from '../../firebase/config'

// components
import Avatar from '../../components/Avatar'

// styles
import './Display.css'


export default function DisplayAll() {
    const { documents, error } = useCollection('guardianinfo');
    const {addDocument, response} = useFirestore('ChildInfoStorage')
    const onChange = (e) => {
        console.log("e.data()")
        const file = e.target.files[0]
        const uploadPath = `childinfo/${file.name}`
        const cInfo = projectStorage.ref(uploadPath).put(file)
        const cInfoURL = cInfo.ref.getDownloadURL()
        console.log("e.data()")
        addDocument({
            Title : uploadPath,
            LessonPlanURL : cInfoURL,
        })
    }

    //  The filter is needed to slow things down and wait for documents to load
    const all = documents ? documents.filter((p) => {
        
        if(p.uid) {
            return true
        }
    }) : null



    return(
        <div >
            <h1>All Students!</h1>
            {all && all.map(student => (
                <div key={student.id} className="user-list-item">
                    <span>{student.childFirstName}</span>
                    <Avatar src={student.photoUrl} />
                    <input type="file" onChange={onChange} />
                </div>
            ))}
        </div>
    )
}