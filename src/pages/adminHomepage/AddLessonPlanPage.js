// libraries 
import { Link } from "react-router-dom"                //Used for return link button 
import { useState } from 'react'
import { projectStorage } from '../../firebase/config'

// styles
import styles from'./AddLessonPlanPage.module.css';

export default function AddLessonPlanPage() {
    const setlessonplan           = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Are you working")
        
    }
    const handleFilechange = (e) => {   
        const lessonplan = e.target.files[0]
        console.log("Are you working handlefilechange")
        const uploadPath = `lessonplans/${lessonplan.name}`
        const Lplan = projectStorage.ref(uploadPath).put(lessonplan)
    }

    return ( 
        <form onSubmit={handleSubmit} className={styles['lessonplan-form']}>
            <h2>Add Your Lesson Plan!</h2>

            <label>
                <span>Pick Your Lesson Plan To Add:</span>
                <input 
                    required
                    type="file"
                    onChange={ handleFilechange }
                />
            </label>
            
            <button className="btn"> <Link to="../Admin">Return</Link> </button>         
            </form> 
    )
}
