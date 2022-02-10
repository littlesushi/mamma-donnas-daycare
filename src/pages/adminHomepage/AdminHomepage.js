// libraries
import { useState } from "react"
import { useAuthContext } from '../../hooks/useAuthContext'

// context
import ProjectFilter from './TaskFilter'

export default function AdminHomepage() {
    const { documents, error } = useCollection('users')
    const [currentFilter, setCurrentFilter] = useState('all')

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const students = documents ? documents.filter((document) => {
        switch(currentFilter) {
            case 'all':
                return true
            default:
                return true
        }
    }) : null

    // if return true, keep it, false toss it out
    // const projects = documents ? documents.filter((document) => {
    //     switch (currentFilter) {
    //         case 'all':
    //             return true
    //         case 'mine':
    //             let assignedToMe = false
    //             document.assignedUsersList.forEach((u) => {
    //                 if (user.uid === u.id) {
    //                     assignedToMe = true
    //                 }
    //             })
    //             return assignedToMe
    //         case 'development':
    //         case 'design':
    //         case 'sales':
    //         case 'marketing':
    //             console.log(document.category, currentFilter)
    //             return document.category === currentFilter
    //         default:
    //             return true
    //     }
    // }) : null

    return(
        <div>
            <h1>Hello Donna!</h1>
            < ProjectFilter />
        </div>
    )
    
}