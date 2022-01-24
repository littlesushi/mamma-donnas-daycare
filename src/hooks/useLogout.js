// libraries
import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    // isCancelled used to flag if the calling function unmounts
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign the user out
        try {
            await projectAuth.signOut()

            // dispatch logout action
            dispatch({ type: 'LOGOUT' })

            // update states
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
            

        }catch(err) {
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

    return { logout, error, isPending }
}