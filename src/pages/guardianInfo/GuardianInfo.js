// This page will accept the account info associate with each child and store that info
// in the backend collection called 'guardianinfo'

// libraries
import { useState, useEffect } from 'react'
import { useNavigate }         from 'react-router-dom'
import { useFirestore }        from '../../hooks/useFirestore'
import { projectFirestore }    from '../../firebase/config'
import { useAuthContext }      from '../../hooks/useAuthContext'

// styles
import styles from './GuardianInfo.module.css'

export default function GuardianInfo ({ uid }) {
    // child info state
    const [childFirstName, setChildFirstName] = useState('')
    const [childLastName, setChildLastName]   = useState('')
    const [diaper, setDiaper]                 = useState('')
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
    const [isValid, setIsValid]       = useState(true)
    const [inputError, setInputError] = useState("")

    // State to hold photoUrl for transfer over to guardianInfo collection
    const [photo, setPhoto]                     = useState('')
    const [userId, setUserId]                   = useState('')
    const [error, setError]                     = useState('')
    const [breathingCheck, setbreathingCheck]   = useState('')

    // hooks
    const navigate                      = useNavigate()
    const { addDocument, response }     = useFirestore('guardianinfo')
    const { updateDocument, response2 } = useFirestore('users')
    const { user }                      = useAuthContext() 
    

    const validate = (e) => {
        // validate the phone input is the correct length
        if(!(guardianPhone1.length == 10) ) {
            setInputError("Phone numbers must be 10 digits long and in the form 1231231234") 
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Add the user data to the guardianInfo collection
         const pullGuardianInfo = projectFirestore.collection("users").onSnapshot( // pull a snapshot
            (snapshot) => {
            if (snapshot.empty) {
                setError("No documents found");
                
            } else {
                    let results = [];
                    snapshot.docs.forEach((doc) => {
                    results.push({ id: doc.id, ...doc.data() });
                    });
        
                    //search through to find the doc id I need then capture the id of the appropriate doc
                    results.map((result) => {
                        if(user.uid === result.id) 
                        {
                            if(validate(e)) {
                                addDocument({
                                    uid: user.uid,
                                    status: '',
                                    diaper,
                                    breathingCheck,
                                    photoUrl: result.photoUrl,
                                    displayName: user.displayName,
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
                                    authPickupPhone,
                                })
                                navigate('/') //As soon as addDoc complete navigate away
                            }
                                 
                        }
                    })
                    setError(null);
                }
            },
            (error) => {
            setError(error.message);
            }
        );
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
                <span>Does your child use a diaper?  yes/no</span>  
            </label>
            <input
                type='text'
                onChange={(e) => setDiaper(e.target.value)}
                value = { diaper }
                required
            />

            <label>
                <span>Is your child under 6 months old?  yes/no</span>  
            </label>
            <input
                type='text'
                onChange={(e) => setbreathingCheck(e.target.value)}
                value = { breathingCheck }
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