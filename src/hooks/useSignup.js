// libraries
import { useState, useEffect } from 'react'
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'


export const useSignup = () => {
    // isCancelled used to flag if the calling function unmounts
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const { dispatch } = useAuthContext()

    // async is used so we can use await to finish the signup
    const signup = async ( email, password, displayName, thumbnail, passcode) => {
        if(passcode === 'mamma donna' || passcode == 'admin'){

            setError(null)
            setIsPending(true)
    
            try {
                // signup user
                const res = await projectAuth.createUserWithEmailAndPassword(email, password)
                
    
                if (!res) {
                    throw new Error('Could not complete signup')
                }
    
                // upload user thumbnail
                const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
                const img = await projectStorage.ref(uploadPath).put(thumbnail)
                const imgUrl = await img.ref.getDownloadURL()
    
                // add display name to user
                await res.user.updateProfile({ displayName, photoURL: imgUrl })
    
                // create a user document (to save objects such as avatar in firestore)
                // document id will be the same as the user id so can associate them
                // with the correct user
                const user = {
                    online: true,
                    displayName,
                    photoURL: imgUrl
                };
    
                if(passcode === 'mamma donna'){
                    user.role = 'user';
                }
                else if (passcode === 'admin'){
                    user.role = 'admin';
                }
                
                await projectFirestore.collection('users').doc(res.user.uid).set(user);
    
                // dispatch login action, add to global state
                dispatch({ type: 'LOGIN', payload: user})
    
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
        else{
            setError("Please ask Donna for the sign up passcode.");
        }      
    }


    // clean up function if the caller unmounts this fires
    // The flag then prevents state from attempting to update
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, signup }
}