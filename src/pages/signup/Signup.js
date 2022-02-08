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
    const [passcode, setPasscode] = useState('')
    const [passcodeError, setPasscodeError] = useState('')
    const [checkPasscode, setCheckPasscode] = useState('mamma donna')
    const { signup, isPending, error } = useSignup()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(passcode == 'mamma donna') 
        {
            signup(email, password)
        }
        else{
            setPasscodeError('Please ask Donna for the sign up passcode.')
        }
        
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
                <span>New Password:</span>
                <input
                    type='password'
                    onChange = {(e) => setPassword(e.target.value)}
                    value = { password } 
                />
            </label>

            <label>
                <span>Donna Provided Passcode:</span>
                <input
                    type='password'
                    onChange = {(e) => setPasscode(e.target.value)}
                    value = { passcode } 
                />
            </label>

            {passcodeError && <div className="error">{passcodeError}</div>}

            {!isPending && 
                <button className="btn" >
                    Go To Step 2 
                </button>}
            {isPending && <button className="btn" disabled>loading</button>}
            {error && <div className="error">{error}</div>} 
        </form>    
    )
}

