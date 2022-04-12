// libraries 
import { Link } from "react-router-dom"                //Used for return link button 
import { useState, useEffect } from 'react'
import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection";
import { projectStorage, projectFirestore } from '../../firebase/config'
import React from "react"
// styles
import styles from'./AddLessonPlanPage.module.css';

export default function AddLessonPlanPage() {
    const [data, setData] = useState([]);
    const [currLessonPlan, setcurrLessonPlan] = useState('')
    const {addDocument, response} = useFirestore('LessonPlanStorage')
    const {updateDocument, response2} = useFirestore('CurrentLessonPlan')
    const {addDocument2, response3} = useFirestore('CurrentLessonPlan')
    const {documents, error} = useCollection('LessonPlanStorage')
    const {documents2, error2} = useCollection('CurrentLessonPlan')
    const {deleteDocument, response4} = useFirestore('CurrentLessonPlan')
    const [lessonPlanList, setLessonPlanList] = useState([])

    useEffect(() => {
        //Request snapshot of annoucements
        const unsub = projectFirestore
            .collection("LessonPlanStorage")
            .onSnapshot(
                (snapshot) => {
                    if (!snapshot.empty) {
                        let results = [];
                        snapshot.docs.forEach((doc) => {
                            results.push({ id: doc.id, ...doc.data() });
                            console.log(doc.data())
                        });
                        setLessonPlanList(results)
                    }
                }
            );
        //Stop unsubscribe from snapshot updates when navigating away from this page
        return () => unsub();
    }, []);

    const handleSubmit = (e) => {
        console.log("Are you working -_-")
        e.preventDefault()
        lessonPlanList.forEach((doc) =>{
           const subString = "lessonplans/" + currLessonPlan
           if(subString === doc.Title){

               projectFirestore.collection("CurrentLessonPlan").doc("LessonPlan").update({ Title : doc.Title, LessonPlanURL : doc.LessonPlanURL, createdAt : doc.createdAt });
           }
         
        });
    }

    const listItem = () => {
        projectStorage.ref().child('lessonplans/').listAll()
          .then(res => {
            res.items.forEach((item) => {
              setData(arr => [...arr, item.name])
            })
            })
          .catch(err => {
            alert(err.message)
          })
    }
    const handleFilechange = async (e) => {   
        console.log("e.data()")
        const lessonplan = e.target.files[0]
        const uploadPath = `lessonplans/${lessonplan.name}`
        const lPlan = await projectStorage.ref(uploadPath).put(lessonplan)
        const lPlanURL = await lPlan.ref.getDownloadURL()
        console.log("e.data()")
        addDocument({
            Title : uploadPath,
            LessonPlanURL : lPlanURL,
        })
    }

    return ( 
        <div>
        <form onSubmit={handleSubmit} className={styles['lessonplan-form']}>
            <h2>Add Your Lesson Plan!</h2>
            
            <label>
            <span>Pick Current Lesson Plan:</span>
                <button onClick={listItem}>
                    List Lesson Plans
                </button> 
                {
                data.map((val) => (
                <h2>{val}</h2>
                ))
                }
                <input
                    type='text'
                    onChange={(e) => setcurrLessonPlan(e.target.value)}
                    value = { currLessonPlan }
                />
            </label>
            <button className='btn'>Submit</button>
            </form> 

            <form onSubmit={handleFilechange} className={styles['lessonplan-form']}>

            <label>
                <span>Add Lesson Plan:</span>
                <input 
                    type="file"
                    placeholder="Add Lesson Plan?"
                    onChange={handleFilechange}
                />
            </label>
            
            <button className='btn'>Submit</button>

            </form> 
            
            <button className="btn"> <Link to="../Admin">Return</Link> </button>   
            </div>
    )
}
