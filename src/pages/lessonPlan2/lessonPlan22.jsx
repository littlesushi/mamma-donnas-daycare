// libraries 
import { Link } from "react-router-dom"                //Used for return link button 
import { useState, useEffect } from 'react'
import { useCollection } from "../../hooks/useCollection";
import { projectFirestore } from '../../firebase/config'
import React from "react"
// styles
import './lessonPlan22.css'

export default function LessonPlanPage() {
    const {documents, error} = useCollection('CurrentLessonPlan')
    const [URL, setURL] = useState('')
    const [Title, setTitle] = useState('')
    useEffect(() => {
        const unsub = projectFirestore
          .collection("CurrentLessonPlan")
          .doc("LessonPlan")
          .onSnapshot((doc) => {
            console.log(doc.data())
            if (doc.exists) {
                const data = doc.data()
                setURL(data.LessonPlanURL) 
                console.log(URL)
            }
          });
    
        return () => unsub();
    }, ["LessonPlan"]);
    return ( 
        <div>
            <h2>Momma Donna's Daycare</h2>     
            <div>
            <img src= {URL} width="85%"/>
            </div>
            <center>
            <button className="btn"> <Link to="../Home">Return</Link> </button>    
            </center>     
        </div>
    )
}