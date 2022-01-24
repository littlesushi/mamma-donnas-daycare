// libraries
import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { useNavigate } from 'react-router-dom'

// styles
import styles from './Signup.module.css'

export default function Signup() {
    //const [displayname, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, isPending, error } = useSignup()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password)
        //navigate('/guardianInfo')
    }

    return (
        <form onSubmit={handleSubmit} className={styles['signup-form']}>
            <h2>Sign up!</h2>

            <label>
                <span>Email:</span>
                <input
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value = { email }
                />
            </label>

            <label>
                <span>Donna Provided Password:</span>
                <input
                    type='password'
                    onChange = {(e) => setPassword(e.target.value)}
                    value = { password } 
                />
            </label>
            {!isPending && 
                <button className="btn" >
                    Go To Step 2 
                </button>}
            {isPending && <button className="btn" disabled>loading</button>}
            { error && <p>{error}</p>}
        </form>    
    )
}

