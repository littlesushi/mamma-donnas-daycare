// libraries
import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    // isCancelled used to flag if the calling function unmounts
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError]             = useState(null)
    const [isPending, setIsPending]     = useState(false)
    const { dispatch }                  = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        // sign the user in
        try {
           const res = await projectAuth.signInWithEmailAndPassword(email, password);

           //Retrieve user document from firestore to use with authcontext.
           const user = await (await projectFirestore.collection('users').doc(res.user.uid).get()).data();

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: user })

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

    return { login, error, isPending }
}