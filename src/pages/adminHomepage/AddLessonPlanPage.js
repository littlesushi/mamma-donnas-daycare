// libraries 
import { Link } from "react-router-dom"                //Used for return link button 
import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'

// styles
import styles from'./AddLessonPlanPage.module.css';

export default function AddLessonPlanPage() {

    // This function will do some data validation so only
    // image file types are allowed and to keep the file
    // size small, we are going to use the 'size' and 'type' property
    const [lessonplan, setlessonplan]           = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const handleFilechange = (e) => {   

        setlessonplan(null)
        let selected = e.target.files[0] // returns an array of files (select only first)


        if (!selected) {
            setThumbnailError('Please select a file')
            return
        }
        // .includes checks if a string contains a substring
        if (!selected.type.includes('image') ) {
            setThumbnailError('Selected file must be an image')
            return
        }
        // check size
        if (selected.size > 100000) {
            setThumbnailError('Image file size must be less than 100kb')
            return
        }

        // checks completed
        setThumbnailError(null)
        setlessonplan(selected)
        console.log('thumbnail updated')
    }

    return ( 
        <form className={styles['lessonplan-form']}>
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
    //{thumbnailError && <div className="error">{thumbnailError}</div>}
}