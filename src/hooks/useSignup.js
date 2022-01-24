// libraries
import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'


export const useSignup = () => {
    // isCancelled used to flag if the calling function unmounts
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const { dispatch } = useAuthContext()

    // async is used so we can use await to finish the signup
    const signup = async ( email, password ) => {
        setError(null)
        setIsPending(true)

        try {
            // signup user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            

            if (!res) {
                throw new Error('Could not complete signup')
            }

            // add display name to user
            //await res.user.updateProfile({ displayname })

            // dispatch login action, add to global state
            dispatch({ type: 'LOGIN', payload: res.user})

            // update states
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        }catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
            
        }
        
    }

    // clean up function if the caller unmounts this fires
    // The flag then prevents state from attempting to update
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, signup }
}