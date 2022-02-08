// libraries
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirestore } from '../../hooks/useFirestore'
import { projectFirestore } from '../../firebase/config'

// styles
import styles from './GuardianInfo.module.css'

export default function GuardianInfo ({ uid }) {
    // child info state
    const [childFirstName, setChildFirstName] = useState('')
    const [childLastName, setChildLastName]   = useState('')
    const [childDob, setChildDob]             = useState('')

    // guardian info state
    const [guardianFirstName1, setGuardianFirstName1]   = useState('')
    const [guardianLastName1, setGuardianLastName1]     = useState('')
    const [guardianPhone1, setGuardianPhone1]           = useState('')
    const [guardianFirstName2, setGuardianFirstName2]   = useState('')
    const [guardianLastName2, setGuardianLastName2]     = useState('')
    const [guardianPhone2, setGuardianPhone2]           = useState('')

    // authorized to pick up state
    const [authPickupFirstName, setAuthPickupFirstName] = useState('')
    const [authPickupLastName, setAuthPickupLastName]   = useState('')
    const [authPickupPhone, setAuthPickupPhone]         = useState('')

    // Data validation state
    const [isValid, setIsValid] = useState(true)
    const [inputError, setInputError] = useState("")

    const navigate = useNavigate()
    const { addDocument, response } = useFirestore('guardianinfo')

    const validate = (e) => {
        // This length validation is working
        if(!(guardianPhone1.length == 10) ) {
            setInputError("Phone numbers must be 10 digits long and in the form 1231231234") 
            return false
        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('Are you working?')
 
        //validate(e)

        //Send the data to the collection in the backend
        if(validate(e)) {
            addDocument({
                uid,
                childFirstName,
                childLastName,
                childDob,
                guardianFirstName1,
                guardianLastName1,
                guardianPhone1,
                guardianFirstName2,
                guardianLastName2,
                guardianPhone2,
                authPickupFirstName,
                authPickupLastName,
                authPickupPhone
            })
            console.log('The user id is: ' + uid)
            // Send user back to home
            navigate('/')
        }
        
    }

    // fires when this component is first called and when the response state changes
    // this will be used to clear the text inputs after a successful add to the database operation
    useEffect(() => {
        if(response.success) {
            console.log(response)
        } 
    }, [response.success])

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles['GuardianInfo-form']}>
            <h2>Child Info (Required)</h2>
            <label>
                <span>Child's first Name:</span>
            </label>
            <input
                type='text'
                onChange={(e) => setChildFirstName(e.target.value)}
                value = { childFirstName }
                required
            />

            <label>
                <span>Child's Last Name:</span>  
            </label>
            <input
                type='text'
                onChange={(e) => setChildLastName(e.target.value)}
                value = { childLastName }
                required
            />

            <label>
                <span>Child's DOB:</span>
            </label>
            <input
                type='date'
                onChange={(e) => setChildDob(e.target.value)}
                value = { childDob }
                required
            />

            <h2>Guardian 1 Info (Required)</h2>
            <label>
                <span>Guardian 1 First Name:</span>    
            </label>
            <input
                type='text'
                onChange={(e) => setGuardianFirstName1(e.target.value)}
                value = { guardianFirstName1 }
                required
            />

            <label>
                <span>Guardian 1 Last Name:</span>
            </label>
            <input
                type='text'
                onChange={(e) => setGuardianLastName1(e.target.value)}
                value = { guardianLastName1 }
                required
            />

            <label>
                <span>Guardian 1 Cell Phone Number:</span>
            </label>
            <input
                type='number'
                onChange={(e) => setGuardianPhone1(e.target.value)}
                value = { guardianPhone1 }
                required
                 
            />
            
            {inputError && <div className="error">{inputError}</div>}
            
            <h2>Guardian 2 Info (Optional)</h2>
            <label>
                <span>Guardian 2 First Name:</span>
            </label>
            <input
                type='text'
                onChange={(e) => setGuardianFirstName2(e.target.value)}
                value = { guardianFirstName2 }
            />

            <label>
                <span>Guardian 2 last Name:</span>
            </label>
            <input
                type='text'
                onChange={(e) => setGuardianLastName2(e.target.value)}
                value = { guardianLastName2 }
            />

            <label>
                <span>Guardian 2 Cell Phone Number:</span>
            </label>
            <input
                type='number'
                onChange={(e) => setGuardianPhone2(e.target.value)}
                value = { guardianPhone2 }
            />

            <h2>Other Authorized to Pick Up Child (Optional)</h2>
            <label>
                <span>First Name:</span>
            </label>
            <input
                type='text'
                onChange={(e) => setAuthPickupFirstName(e.target.value)}
                value = { authPickupFirstName }
            />

            <label>
                <span>Last Name:</span>
            </label>
            <input
                type='text'
                onChange={(e) => setAuthPickupLastName(e.target.value)}
                value = { authPickupLastName }
            />

            <label>
                <span>Phone Number:</span>
            </label>
            <input
                type='number'
                onChange={(e) => setAuthPickupPhone(e.target.value)}
                value = { authPickupPhone }
            />
            <button className='btn'>Submit</button>
            </form>
        </div>
    )
}