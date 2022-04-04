// libraries
import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { useNavigate } from 'react-router-dom'

// styles
import styles from './Signup.module.css'

export default function Signup() {
    //const [displayname, setDisplayName] = useState('')
    const [email, setEmail]                   = useState('')
    const [password, setPassword]             = useState('')
    const [passcode, setPasscode]             = useState('')
    const [displayName, setDisplayName]       = useState('')
    const [thumbnail, setThumbnail]           = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const [passcodeError, setPasscodeError]   = useState('')
    const [checkPasscode, setCheckPasscode]   = useState('mamma donna')

    const { signup, isPending, error } = useSignup()
    const navigate                     = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName, thumbnail, passcode);
    }

    // This function will do some data validation so only
    // image file types are allowed and to keep the file
    // size small, we are going to use the 'size' and 'type' property
    const handleFilechange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0] // returns an array of files (select only first)
        

        if (!selected) {
            setThumbnailError('Please select a file')
            return
        }
        // Includes checks if a string contains a substring
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
        setThumbnail(selected)
        console.log('thumbnail updated')
    }

    return (
        <form onSubmit={handleSubmit} className={styles['signup-form']}>
            <h2>Sign up!</h2>

            <label>
                <span>Display Name:</span>
                <input 
                    required
                    type="text"
                    onChange={(e) => {
                        setDisplayName(e.target.value)
                    }}
                    value={ displayName }
                />
            </label>

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
                <span>Profile Thumbnail:</span>
                <input 
                    required
                    type="file"
                    onChange={ handleFilechange }
                />
            {thumbnailError && <div className="error">{thumbnailError}</div>}
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
                    Continue 
                </button>}
            {isPending && <button className="btn" disabled>loading</button>}
            {error && <div className="error">{error}</div>} 
        </form>    
    )
}

