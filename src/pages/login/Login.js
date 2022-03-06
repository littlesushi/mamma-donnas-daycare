// libraries
import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'


// styles
import styles from './Login.module.css'

// Notes
// -hypens are a - sign in class names, so brackets and quotes
// -The input type password covers the input with * as typed in
// -onchange, put inline function so only fires on changes
//  e is properties related to an object, in this case onChange
//  e is able to grab the input
//  value={email}, if the value is changed outside the form, this
//  will keep the value in the variable up to date
// - To submit data from a form, add onSubmit to the form tag
//   e.preventDefault is to prevent the default action of reloading
//   the page 

export default function Login() {
    const [email, setEmail]           = useState('')
    const [password, setPassword]     = useState('')
    // for login use, accept the state we need
    const { login, error, isPending } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        // call login from the hook
        console.log(email, password)
        login(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className={styles['login-form']}> 
            <h2>Login</h2>
            <label>
                <span>email:</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>

            <label>
                <span>password:</span>
                    <input type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                /> 
            </label>
            {!isPending && <button className="btn">Login</button>}
            {isPending && <button className='btn' disabled>loading</button>}
            {/* display any erros to the screen */}
            {error && <p>{error}</p>} 
        </form>
    )
}
